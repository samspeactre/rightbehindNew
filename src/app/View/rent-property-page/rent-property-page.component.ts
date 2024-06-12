import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelect } from '@angular/material/select';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { BannerComponent } from '../../SharedComponents/banner/banner.component';
import { HttpService } from '../../Services/http.service';
import { finalize } from 'rxjs';
import { CharacterLimitDirective } from '../../TsExtras/character-limit.directive';
import { SharedModule } from '../../TsExtras/shared.module';
import { HelperService, types } from '../../Services/helper.service';
import { MapComponent } from '../../SharedComponents/map/map.component';
import { ToastrService } from 'ngx-toastr';

interface ImageFile {
  name: string;
  size: number;
  url: string;
  file?: File;
}

interface Category {
  name: string;
  amenities: string[];
}

interface Amenity {
  name: string;
  selected: boolean;
}

interface FormSection {
  planName: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  currencyType: string;
  salePrice: number;
  description: string;
  imageSrc: string | ArrayBuffer | null;
}

@Component({
  standalone: true,
  imports: [CommonModule, SharedModule, MapComponent, MatButtonModule, BannerComponent, MatCheckboxModule, MatLabel, RouterModule, MatFormFieldModule, MatInputModule, MatOption, MatSelect, MatIconModule, CdkTextareaAutosize, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
  selector: 'app-rent-property-page',
  templateUrl: './rent-property-page.component.html',
  styleUrls: ['./rent-property-page.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        '*',
        style({
          opacity: 1,
          height: '*',
        })
      ),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class RentPropertyPageComponent implements OnInit {
  previousData: any;
  amenityCategories!: any;
  utilities!: any;
  amenities!: any;
  types = types;
  propertyAddForm: any = this.fb.group({
    Title: ['', Validators.required],
    Description: ['', Validators.required],
    Category: ['', Validators.required],
    PropertyType: ['', Validators.required],
    NoOfBed: [''],
    LeaseMonth: [''],
    NoOfBath: [''],
    Area: [''],
    Price: [''],
    Location: [''],
    Country: [''],
    State: [''],
    City: [''],
    ZipCode: [''],
    Unit: [''],
    Plot: [''],
    Street: [''],
    Building: [''],
    VideoUrl: [''],
    Latitude: [''],
    Longitude: [''],
    PetPolicy: [''],
    Parking: [''],
    ParkingFees: [''],
    Laundry: [''],
    IsFurnished: [false],
    PropertyImageFiles: this.fb.array([]),
    Amenities: this.fb.array([]),
    Utilities: this.fb.array([]),
    FloorPlans: this.fb.array([
      this.fb.group({
        PlanName: ['', Validators.required],
        NoOfBed: ['', Validators.required],
        NoOfBath: ['', Validators.required],
        Area: ['', Validators.required],
        StartPrice: ['', Validators.required],
        EndPrice: ['', Validators.required],
        Description: ['', Validators.required],
        FloorPlanImage: ['', Validators.required],
        FloorPlanUnits: this.fb.array([
          this.fb.group({
            Price: ['', Validators.required],
            AvailabilityDate: ['', Validators.required],
          })
        ]),
      })
    ]),
    OpenHouses: this.fb.array([]),
    PropertyContact: this.fb.group({
      UserRole: [''],
      FullName: [''],
      Email: [''],
      Contact: [''],
      IsEmailPrefered: ['']
    }),
    RentSpecial: this.fb.group({
      Title: [''],
      Description: [''],
      Tag: [''],
      StartDate: [''],
      EndDate: ['']
    }),
    HomeFact: this.fb.group({
      NoOfBeds: [''],
      NoOfBaths: [''],
      FinishedSqrFt: [''],
      SqrFt: [''],
      RemodelYear: [''],
      BasementSqrFt: [''],
      LotSize: [''],
      ConstructedYear: [''],
      HaoDues: [''],
      GarageSqrFt: ['']
    })
  });
  readonly MAX_FILES = 10;
  readonly MAX_SIZE_MB = 8;
  readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  imageSrc: string | ArrayBuffer | null = null;
  sections: any;
  section: string = 'property-information'
  startDate: Date;
  endDate: Date = new Date();
  selected = 'none';
  selectedFiles: ImageFile[] = [];
  additionalSelectedFiles: ImageFile[] = [];
  thirdSelectedFiles: ImageFile[] = [];
  thirdFileInput: HTMLInputElement | undefined;
  constructor(private activatedRoute: ActivatedRoute, private toastr: ToastrService, public helper: HelperService, private location: Location, private http: HttpService, private fb: FormBuilder,) {
    this.activatedRoute.queryParams.subscribe((response: any) => {
      if (!response?.data) {
        this.location.back()
      } else {
        this.previousData = JSON.parse(response?.data);
        this.propertyAddForm.patchValue({
          PropertyContact: {
            FullName: this.previousData?.firstName + ' ' + this.previousData?.lastName,
            Email: this.previousData?.email
          },
          PropertyType: this.previousData?.propertyType,
          Location: this.previousData?.address?.address,
          Latitude: this.previousData?.latLng?.lat,
          Longitude: this.previousData?.latLng?.lng,
          City: this.previousData?.address?.city,
          State: this.previousData?.address?.state,
          Country: this.previousData?.address?.country,
          ZipCode: this.previousData?.address?.zipCode,
          Street: this.previousData?.address?.street,
        })
        if (this.previousData?.active === 'sell') {
          this.propertyAddForm.removeControl('RentSpecial');
        }
      }
    })
    this.startDate = new Date();
  }

  ngOnInit(): void {
    this.getAmeneties()
    
  }
  getAmeneties() {
    this.http.loaderGet('Property/amenities', true, true, false, false)
      .pipe(
        finalize(() => {
          this.getUtilities()
        })
      )
      .subscribe((response: any) => {
        this.amenityCategories = response?.modelList;
      })
  }
  getUtilities() {
    this.http.loaderGet('Property/utilities', true, true)
      .subscribe((response: any) => {
        this.utilities = response?.modelList
      })
  }
  checkboxSelect(event: any, value: number, type: string) {
    const formArray = this.propertyAddForm.controls[type] as FormArray;
    if (event.target.checked) {
      if (!formArray.value.includes(value)) {
        formArray.push(new FormControl(value));
      }
    } else {
      const index = formArray.value.indexOf(value);
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }
  onSubmit() {
    console.log(this.propertyAddForm.value);
  }
  get getFloorPlansFormArray(): FormArray {
    return this.propertyAddForm.get('floorPlansArray') as FormArray;
  }

  addFloorPlan(): void {
    const floorPlan = this.fb.group({
      PlanName: ['', Validators.required],
      NoOfBed: ['', Validators.required],
      NoOfBath: ['', Validators.required],
      Area: ['', Validators.required],
      StartPrice: ['', Validators.required],
      EndPrice: ['', Validators.required],
      Description: ['', Validators.required],
      FloorPlanImage: ['', Validators.required],
      FloorPlanUnits: this.fb.array([
        this.fb.group({
          Price: ['', Validators.required],
          AvailabilityDate: ['', Validators.required],
        })
      ]),
    });
    (this.propertyAddForm.get('FloorPlans') as FormArray).push(floorPlan);
  }

  getimg(index: number) {
    // this.floorPlansArray = this.formGroup.get('floorPlansArray') as FormArray;
    // let controls = this.floorPlansArray.at(index);
    // return controls.get('img')?.value;
  }

  // Remove the selected image
  removeImage(index: number) {
    const floorPlanGroup = this.getFloorPlansFormArray.at(index) as FormGroup;
    floorPlanGroup.get('img')?.setValue(null); // Clear the value of the image control
  }

  // Trigger primary file input
  triggerFileInput(index: number): void {
    let id = 'fileInput' + index.toString();
    const fileInput = document.getElementById(id) as HTMLElement;
    fileInput.click();
  }

  // Handle primary file selection
  onFileSelected(event: Event, index?: number): void {
    // const input = event.target as HTMLInputElement;
    // if (input.files && input.files.length > 0) {
    //   const file = input.files[0];
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.imageSrc = reader.result;
    //     if (index != undefined) {
    //       this.floorPlansArray = this.formGroup.get(
    //         'floorPlansArray'
    //       ) as FormArray;
    //       let controls = this.floorPlansArray.at(index);
    //       controls.patchValue({
    //         img: this.imageSrc,
    //       });
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // }
  }

  // Handle additional file selection
  onAdditionalFileSelected(event: any) {
    this.handleFileSelection(event, this.additionalSelectedFiles);
  }

  // Handle third file selection
  onThirdFileSelected(event: any) {
    this.handleFileSelection(event, this.thirdSelectedFiles);
  }

  // General file selection handler
  handleFileSelection(event: any, targetArray: ImageFile[]) {
    const files: FileList = event.target.files;

    if (files.length + targetArray.length > 10) {
      alert('You can only upload a maximum of 10 images');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 8 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum allowed size is 8 MB.`);
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        targetArray.push({
          name: file.name,
          size: file.size,
          url: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  removeAdditionalFile(index: number) {
    this.additionalSelectedFiles.splice(index, 1);
  }

  scrollToSection(sectionId: string) {
    this.section = sectionId
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  onCategoryChange(category: any) {
    this.amenities = category?.value?.amenities
  }
  get propertyImageFiles(): FormArray {
    return this.propertyAddForm.get('PropertyImageFiles') as FormArray;
  }
  onPropertyImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      const currentFileCount = this.propertyImageFiles.length;
      const filesToAdd = Array.from(fileInput.files).slice(0, this.MAX_FILES - currentFileCount);

      if (fileInput.files.length > filesToAdd.length) {
        this.toastr.warning('No more than 10 images allowed.');
      }

      filesToAdd.forEach(file => {
        if (!this.ALLOWED_TYPES.includes(file.type)) {
          this.toastr.error('Only jpg, jpeg, png, and webp files are allowed.');
          return;
        }

        if (file.size > this.MAX_SIZE_MB * 1024 * 1024) {
          this.toastr.error(`File ${file.name} is larger than 8MB and was not added.`);
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          this.propertyImageFiles.push(this.fb.control(reader.result));
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removePropertyImage(index: number): void {
    this.propertyImageFiles.removeAt(index);
  }
}
