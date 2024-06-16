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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { BannerComponent } from '../../SharedComponents/banner/banner.component';
import { HttpService } from '../../Services/http.service';
import { Subject, distinctUntilChanged, finalize, takeUntil } from 'rxjs';
import { CharacterLimitDirective } from '../../TsExtras/character-limit.directive';
import { SharedModule } from '../../TsExtras/shared.module';
import { HelperService, types } from '../../Services/helper.service';
import { MapComponent } from '../../SharedComponents/map/map.component';
import { ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  standalone: true,
  imports: [CommonModule, SharedModule, MapComponent, MatButtonModule, BannerComponent,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule, MatLabel, NgSelectModule, RouterModule, MatOption, MatSelect, MatIconModule, CdkTextareaAutosize, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
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
  private destroy$ = new Subject<void>();
  propertyAddForm: any = this.fb.group({
    Title: ['', Validators.required],
    Description: ['', Validators.required],
    Category: ['', Validators.required],
    AmentiyCategory: ['', Validators.required],
    PropertyType: ['', Validators.required],
    NoOfBed: [''],
    LeaseMonth: [''],
    NoOfBath: [''],
    Area: [''],
    Price: [''],
    Deposit: [''],
    Location: [''],
    Country: [''],
    Landmark: [''],
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
    Terms: ['', Validators.required],
    IsFurnished: [true],
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
        FloorPlanImage: this.fb.array([]),
        FloorPlanUnits: this.fb.array([
          this.fb.group({
            Price: ['', Validators.required],
            AvailabilityDate: ['', Validators.required],
          })
        ]),
      })
    ]),
    OpenHouses: this.fb.array([
      this.fb.group({
        StartDateTime: [''],
        EndDateTime: ['']
      })
    ]),
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
  sections: any;
  section: string = 'property-information'
  constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, private toastr: ToastrService, public helper: HelperService, private location: Location, private http: HttpService, private fb: FormBuilder,) {
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
          Street: this.previousData?.address?.street
        })
        if (this.previousData?.active === 'sell') {
          this.propertyAddForm.removeControl('RentSpecial');
        }
        else {
          this.propertyAddForm.removeControl('OpenHouses');
        }
        this.propertyAddForm.patchValue({
          Category: this.previousData?.active == 'rent' ? 2 : 1
        })
      }
    })
  }

  ngOnInit(): void {
    this.getAmeneties()
    this.propertyAddForm.controls['AmentiyCategory'].valueChanges.subscribe((value: any) => {
      this.onCategoryChange(value)
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
        this.propertyAddForm.patchValue({
          AmentiyCategory: response?.modelList?.[0]?.amenityCategoryName
        })
        this.onCategoryChange(response?.modelList?.[0]?.amenityCategoryName)
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
    this.propertyAddForm.removeControl('AmentiyCategory');
    this.propertyAddForm.controls['Country'].setValue(this.propertyAddForm.controls['Country'].value  + '/' + this.propertyAddForm.controls['State'].value )
    const formData = new FormData();
    const appendFormData = (data: any, rootName: string = '') => {
      if (data instanceof FileList) {
        for (let i = 0; i < data.length; i++) {
          formData.append(rootName, data[i]);
        }
      } else if (data instanceof Array) {
        for (let i = 0; i < data.length; i++) {
          // Check if the array item is a File object
          if (data[i] instanceof File) {
            formData.append(rootName, data[i]);
          } else {
            appendFormData(data[i], `${rootName}[${i}]`);
          }
        }
      } else if (data instanceof Object && !(data instanceof File)) {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            appendFormData(data[key], rootName ? `${rootName}.${key}` : key);
          }
        }
      } else {
        formData.append(rootName, data);
      }
    };
    appendFormData(this.propertyAddForm.value);
    this.http.loaderPost('Property/create', formData, true)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((response) => {
        if (this.previousData?.active == 'rent') {
          this.router.navigateByUrl('/rent')
        }
        else {
          this.router.navigateByUrl('/buy')
        }
      })
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
      FloorPlanImage: this.fb.array([]),
      FloorPlanUnits: this.fb.array([
        this.fb.group({
          Price: ['', Validators.required],
          AvailabilityDate: ['', Validators.required],
        })
      ]),
    });
    (this.propertyAddForm.get('FloorPlans') as FormArray).push(floorPlan);
  }
  addFloorPlanUnit(floorPlanIndex: number) {
    const floorPlanUnits = this.propertyAddForm.get('FloorPlans').at(floorPlanIndex).get('FloorPlanUnits') as FormArray;
    floorPlanUnits.push(
      this.fb.group({
        Price: ['', Validators.required],
        AvailabilityDate: ['', Validators.required]
      })
    );
  }
  addOpenHouse() {
    const openHouse = this.fb.group({
      StartDateTime: [''],
      EndDateTime: ['']
    });
    (this.propertyAddForm.get('OpenHouses') as FormArray).push(openHouse);
  }
  scrollToSection(sectionId: string) {
    this.section = sectionId
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  onCategoryChange(category: any) {
    this.amenities = this.amenityCategories.find((amenity: any) => amenity?.amenityCategoryName == category);
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

        this.propertyImageFiles.push(this.fb.control(file));
      });
    }
  }
  getImageSrc(file: File) {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }
  removePropertyImage(index: number): void {
    this.propertyImageFiles.removeAt(index);
  }
  onFloorPlanImageSelected(event: Event, floorPlanIndex: number): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      const currentFileCount = this.propertyAddForm.get('FloorPlans').at(floorPlanIndex).get('FloorPlanImage').value.length;
      const filesToAdd = Array.from(fileInput.files).slice(0, 1 - currentFileCount);

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
        this.propertyAddForm.get('FloorPlans').at(floorPlanIndex).get('FloorPlanImage').push(this.fb.control(file));
      });
    }
  }

  removeFloorPlanImage(floorPlanIndex: number, imageIndex: number): void {
    this.propertyAddForm.get('FloorPlans').at(floorPlanIndex).get('FloorPlanImage').removeAt(imageIndex);
  }
  setFormValue(event: any, control: string) {
    if (control == 'Location') {
      this.propertyAddForm.patchValue({
        Location: event?.address,
        City: event?.city,
        State: event?.state,
        Country: event?.country,
        ZipCode: event?.zipCode,
        Street: event?.street
      })
    } else {
      if (control == 'Latitude') {
        this.propertyAddForm.controls[control].setValue(event?.lat);
      } else {
        this.propertyAddForm.controls[control].setValue(event?.lng);
      }
    }
  }
}
