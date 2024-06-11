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
import { HelperService } from '../../services/helper.service';

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
  imports: [CommonModule, SharedModule, MatButtonModule, BannerComponent, MatCheckboxModule, MatLabel, RouterModule, MatFormFieldModule, MatInputModule, MatOption, MatSelect, MatIconModule, CdkTextareaAutosize, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
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
  previousData:any;
  amenityCategories!: any;
  utilities!: any;
  amenities!: any;
  propertyAddForm: any = this.fb.group({
    Title: ['', Validators.required],
    Description: ['', Validators.required],
    Category: ['', Validators.required],
    PropertyType: ['', Validators.required],
    NoOfBed: [''],
    NoOfBath: [''],
    Area: [''],
    Price: [''],
    Location: [''],
    City: [''],
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
    FloorPlans: this.fb.array([]),
    OpenHouses: this.fb.array([]),
    PropertyContact: this.fb.group({
      UserRole: [''],
      FullName: [''],
      Email: [''],
      Contact: ['']
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
  formGroup!: FormGroup;
  floorPlansArray!: FormArray;
  constructor(private activatedRoute: ActivatedRoute, public helper:HelperService, private location: Location, private http: HttpService, private fb: FormBuilder,) {
    this.activatedRoute.queryParams.subscribe((response: any) => {
      this.previousData = JSON.parse(response?.data)
      if (!response?.data) {
        this.location.back()
      }
    })
    this.startDate = new Date();
  }

  ngOnInit(): void {
    this.getAmeneties()
    this.formGroup = new FormGroup({
      floorPlansArray: new FormArray([
        new FormGroup({
          floorPlanName: new FormControl(null, Validators.required),
          floorBed: new FormControl(null, Validators.required),
          floorbath: new FormControl(null, Validators.required),
          floorSqft: new FormControl(null, Validators.required),
          floorCurrencyType: new FormControl(null, Validators.required),
          floorSalesPrice: new FormControl(null, Validators.required),
          floorDesc: new FormControl(null, Validators.required),
          img: new FormControl(null, Validators.required),
        }),
      ]),
    });
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
        console.log(this.previousData);
        
        this.propertyAddForm.controls['PropertyType'].setValue(this.helper.returnType(this.previousData?.propertyType))
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
    console.log(this.propertyAddForm.value);

  }
  onSubmit() {
    console.log(this.propertyAddForm.value);
  }
  get getFloorPlansFormArray(): FormArray {
    return this.formGroup.get('floorPlansArray') as FormArray;
  }

  addNew() {
    this.floorPlansArray = this.formGroup.get('floorPlansArray') as FormArray;
    this.floorPlansArray.push(
      new FormGroup({
        floorPlanName: new FormControl(null, Validators.required),
        floorBed: new FormControl(null, Validators.required),
        floorbath: new FormControl(null, Validators.required),
        floorSqft: new FormControl(null, Validators.required),
        floorCurrencyType: new FormControl(null, Validators.required),
        floorSalesPrice: new FormControl(null, Validators.required),
        floorDesc: new FormControl(null, Validators.required),
        img: new FormControl(null, Validators.required),
      })
    );
  }

  getimg(index: number) {
    this.floorPlansArray = this.formGroup.get('floorPlansArray') as FormArray;
    let controls = this.floorPlansArray.at(index);
    return controls.get('img')?.value;
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
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
        if (index != undefined) {
          this.floorPlansArray = this.formGroup.get(
            'floorPlansArray'
          ) as FormArray;
          let controls = this.floorPlansArray.at(index);
          controls.patchValue({
            img: this.imageSrc,
          });
        }
      };
      reader.readAsDataURL(file);
    }
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
  onCategoryChange(id: any) {
    this.amenities = this.amenityCategories.find((category:any)=> category?.id == id)
  }
}
