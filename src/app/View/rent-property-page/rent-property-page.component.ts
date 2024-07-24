import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelect } from '@angular/material/select';

import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { finalize, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { HelperService, types } from '../../Services/helper.service';
import { HttpService } from '../../Services/http.service';
import { BannerComponent } from '../../SharedComponents/banner/banner.component';
import { MapComponent } from '../../SharedComponents/map/map.component';
import { PopupFeaturedComponent } from '../../SharedComponents/popupFeatured/popupFeatured.component';
import { SharedModule } from '../../TsExtras/shared.module';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MapComponent,
    MatButtonModule,
    BannerComponent,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatLabel,
    NgSelectModule,
    RouterModule,
    MatOption,
    MatSelect,
    MatIconModule,
    CdkTextareaAutosize,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  selector: 'app-rent-property-page',
  templateUrl: './rent-property-page.component.html',
  styleUrls: ['./rent-property-page.component.scss'],
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
    Latitude: [25.761681],
    Longitude: [-80.191788],
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
          }),
        ]),
      }),
    ]),
    OpenHouses: this.fb.array([
      this.fb.group({
        StartDateTime: [''],
        EndDateTime: [''],
      }),
    ]),
    PropertyContact: this.fb.group({
      UserRole: [''],
      FullName: [''],
      Email: [''],
      Contact: [''],
      IsEmailPrefered: [''],
    }),
    RentSpecial: this.fb.group({
      Title: [''],
      Description: [''],
      Tag: [''],
      StartDate: [''],
      EndDate: [''],
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
      GarageSqrFt: [''],
    }),
  });
  radioValues = ['1 Month Free', '50% Off', 'Free Move-in'];
  readonly MAX_FILES = 10;
  readonly MAX_SIZE_MB = 8;
  readonly ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
  ];
  sections: any;
  section: string = 'property-information';
  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private toastr: ToastrService,
    public helper: HelperService,
    private location: Location,
    private http: HttpService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.activatedRoute.queryParams.subscribe(async (response: any) => {
      if (!response?.data) {
        this.location.back();
      } else {
        this.previousData = JSON.parse(response?.data);
        await this.getAmeneties();
        if (this.previousData?.getData) {
          this.http
            .loaderGet(`Property/get/${this.previousData?.id}`, false)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              async (response) => {
                this.previousData = {
                  ...this.previousData,
                  floorPlans: response?.model?.floorPlans,
                  homeFacts: response?.model?.homeFacts,
                  AmentiyCategory:
                    response?.model?.propertyAmenities?.[0]?.amenity
                      ?.amenityCategory?.amenityCategoryName,
                  RentSpecial: response?.model?.rentSpecials,
                  PropertyContact: response?.model?.propertyContacts,
                  ...response?.model
                };
                response?.model?.propertyImages?.map((image: any) => {
                  this.propertyImageFiles.push(
                    this.fb.control(image?.imageUrl)
                  );
                });
                this.propertyAddForm.addControl(
                  'Id',
                  this.fb.control(response?.model?.id)
                );
                const propertyContactsGroup = this.propertyAddForm.get(
                  'PropertyContact'
                ) as FormGroup;
                propertyContactsGroup.addControl('Id', this.fb.control(null));
                const RentSpecialGroup = this.propertyAddForm.get(
                  'RentSpecial'
                ) as FormGroup;
                RentSpecialGroup.addControl('Id', this.fb.control(null));
                const homeFactGroupArray = this.propertyAddForm.get(
                  'HomeFact'
                ) as FormGroup;
                if (homeFactGroupArray) {
                  homeFactGroupArray.addControl('Id', this.fb.control(null));
                }
                const FloorPlansArray = this.propertyAddForm.get(
                  'FloorPlans'
                ) as FormArray;
                if (FloorPlansArray) {
                  FloorPlansArray.controls.forEach((group: any) => {
                    group.addControl('Id', this.fb.control(null));
                  });
                }
                await this.patchFormValues();
                response?.model?.propertyAmenities?.map((amenity: any) => {
                  this.checkboxSelect(
                    null,
                    amenity?.amenityId,
                    'Amenities',
                    true
                  );
                });
                response?.model?.propertyUtilities?.map((amenity: any) => {
                  this.checkboxSelect(
                    null,
                    amenity?.utilityId,
                    'Utilities',
                    true
                  );
                });
              },
              (err) => {
                this.location.back();
              }
            );
        }
        this.propertyAddForm.patchValue({
          PropertyContact: {
            FullName:
              this.previousData?.firstName + ' ' + this.previousData?.lastName,
            Email: this.previousData?.email,
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
          Unit: Number(this.previousData?.unit)
        });
        if (this.previousData?.active === 'sell') {
          this.propertyAddForm.removeControl('RentSpecial');
        } else {
          this.propertyAddForm.removeControl('OpenHouses');
        }
        this.propertyAddForm.patchValue({
          Category: this.previousData?.active == 'rent' ? 2 : 1,
        });
      }
    });
  }
  ngOnInit(): void {
    this.propertyAddForm.controls['AmentiyCategory'].valueChanges.subscribe(
      (value: any) => {
        this.onCategoryChange(value);
      }
    );
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getAmeneties() {
    this.http
      .loaderGet('Property/amenities', true, true, false, false)
      .pipe(
        finalize(() => {
          this.getUtilities();
        })
      )
      .subscribe((response: any) => {
        this.amenityCategories = response?.modelList;
        if (!this.previousData?.getData) {
          this.propertyAddForm.patchValue({
            AmentiyCategory: response?.modelList?.[0]?.amenityCategoryName,
          });
        }
        this.onCategoryChange(
          this.propertyAddForm.controls['AmentiyCategory']?.value
        );
      });
  }
  getUtilities() {
    this.http
      .loaderGet('Property/utilities', true, true)
      .subscribe((response: any) => {
        this.utilities = response?.modelList;
      });
  }
  checkboxSelect(
    event: any,
    value: number,
    type: string,
    fill: boolean = false
  ) {
    const formArray = this.propertyAddForm.controls[type] as FormArray;
    if (event?.target?.checked || fill) {
      if (!formArray.value.includes(value)) {
        formArray?.push(new FormControl(value));
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
    this.propertyAddForm.controls['Country'].setValue(
      this.propertyAddForm.controls['Country'].value +
      '/' +
      this.propertyAddForm.controls['State'].value
    );
    const formData = new FormData();
    const appendFormData = (data: any, rootName: string = '') => {
      if (data instanceof FileList) {
        for (let i = 0; i < data.length; i++) {
          formData.append(rootName, data[i]);
        }
      } else if (data instanceof Array) {
        for (let i = 0; i < data.length; i++) {
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
    if(this.previousData?.getData){
      formData.append('isActive',this.previousData?.isActive)
      formData.append('isLive',this.previousData?.isLive)
      formData.append('createdAt',this.previousData?.createdAt)
      formData.append('isDeleted',this.previousData?.isDeleted)
    }
    const url = this.previousData?.getData
      ? 'Property/update'
      : 'Property/create';
    this.http
      .loaderPost(url, formData, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.previousData = {
          ...this.previousData,
          id: response?.model?.id,
        };
        if (!this.previousData?.getData) {
          this.fireSwal();
        }
        // if (this.previousData?.active == 'rent') {
        //   this.router.navigateByUrl('/rent');
        // } else {
        //   this.router.navigateByUrl('/buy');
        // }
      });
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
        }),
      ]),
    });
    (this.propertyAddForm.get('FloorPlans') as FormArray).push(floorPlan);
  }
  addFloorPlanUnit(floorPlanIndex: number) {
    const floorPlanUnits = this.propertyAddForm
      .get('FloorPlans')
      .at(floorPlanIndex)
      .get('FloorPlanUnits') as FormArray;
    floorPlanUnits.push(
      this.fb.group({
        Price: ['', Validators.required],
        AvailabilityDate: ['', Validators.required],
      })
    );
  }
  addOpenHouse() {
    const openHouse = this.fb.group({
      StartDateTime: [''],
      EndDateTime: [''],
    });
    (this.propertyAddForm.get('OpenHouses') as FormArray).push(openHouse);
  }
  scrollToSection(sectionId: string) {
    this.section = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  onCategoryChange(category: any) {
    this.amenities = this.amenityCategories?.find(
      (amenity: any) => amenity?.amenityCategoryName == category
    );
  }
  get propertyImageFiles(): FormArray {
    return this.propertyAddForm.get('PropertyImageFiles') as FormArray;
  }
  onPropertyImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      const currentFileCount =
        this.propertyImageFiles.length ||
        this.propertyAddForm?.controls['PropertyImageFiles']?.value?.length;
      const filesToAdd = Array.from(fileInput.files).slice(
        0,
        this.MAX_FILES - currentFileCount
      );
      if (fileInput.files.length > filesToAdd.length) {
        this.toastr.warning('No more than 10 images allowed.');
      }

      filesToAdd.forEach((file) => {
        if (!this.ALLOWED_TYPES.includes(file.type)) {
          this.toastr.error('Only jpg, jpeg, png, and webp files are allowed.');
          return;
        }

        if (file.size > this.MAX_SIZE_MB * 1024 * 1024) {
          this.toastr.error(
            `File ${file.name} is larger than 8MB and was not added.`
          );
          return;
        }
        this.propertyImageFiles.push(this.fb.control(file));
      });
    }
  }
  getImageSrc(file: string | File): string | any {
    if (typeof file === 'string') {
      return file;
    } else {
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }
  removePropertyImage(index: number): void {
    this.propertyImageFiles.removeAt(index);
  }
  onFloorPlanImageSelected(event: Event, floorPlanIndex: number): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      const currentFileCount = this.propertyAddForm
        .get('FloorPlans')
        .at(floorPlanIndex)
        .get('FloorPlanImage').value.length;
      const filesToAdd = Array.from(fileInput.files).slice(
        0,
        1 - currentFileCount
      );

      if (fileInput.files.length > filesToAdd.length) {
        this.toastr.warning('No more than 10 images allowed.');
      }

      filesToAdd.forEach((file) => {
        if (!this.ALLOWED_TYPES.includes(file.type)) {
          this.toastr.error('Only jpg, jpeg, png, and webp files are allowed.');
          return;
        }

        if (file.size > this.MAX_SIZE_MB * 1024 * 1024) {
          this.toastr.error(
            `File ${file.name} is larger than 8MB and was not added.`
          );
          return;
        }
        this.propertyAddForm
          .get('FloorPlans')
          .at(floorPlanIndex)
          .get('FloorPlanImage')
          .push(this.fb.control(file));
      });
    }
  }

  removeFloorPlanImage(floorPlanIndex: number, imageIndex: number): void {
    this.propertyAddForm
      .get('FloorPlans')
      .at(floorPlanIndex)
      .get('FloorPlanImage')
      .removeAt(imageIndex);
  }
  setFormValue(event: any, control: string) {
    if (control == 'Location') {
      this.propertyAddForm.patchValue({
        Location: event?.address,
        City: event?.city,
        State: event?.state,
        Country: event?.country,
        ZipCode: event?.zipCode,
        Street: event?.street,
      });
    } else {
      if (control == 'Latitude') {
        this.propertyAddForm.controls[control].setValue(event?.lat);
      } else {
        this.propertyAddForm.controls[control].setValue(event?.lng);
      }
    }
  }
  async patchFormValues() {
    const previousDataLower = await this.lowercaseKeys(this.previousData);
    await Promise.all(
      Object.keys(previousDataLower).map(async (key) => {
        const formControlKey = this.findFormControlKey(
          this.propertyAddForm,
          key
        );
        if (formControlKey) {
          let value = previousDataLower[key];
          if (this.isDateString(value)) {
            value = this.formatDate(value);
          }
          this.propertyAddForm.patchValue({ [formControlKey]: value });
        }
      })
    );

    await this.patchNestedControls('HomeFact', previousDataLower.homefacts);
    await this.patchNestedControls(
      'RentSpecial',
      previousDataLower.rentspecial
    );
    await this.patchNestedControls(
      'PropertyContact',
      previousDataLower.propertycontact
    );
    await this.patchNestedArray('FloorPlans', previousDataLower.floorplans);
  }

  lowercaseKeys(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.lowercaseKeys(item));
    } else if (typeof obj === 'object' && obj !== null) {
      return Object.keys(obj).reduce((acc: any, key) => {
        acc[key.toLowerCase()] = this.lowercaseKeys(obj[key]);
        return acc;
      }, {});
    } else {
      return obj;
    }
  }

  findFormControlKey(formGroup: FormGroup, key: string): string | null {
    const formControlKeys = Object.keys(formGroup.controls);
    const lowerKey = key.toLowerCase();
    return (
      formControlKeys.find(
        (controlKey) => controlKey.toLowerCase() === lowerKey
      ) || null
    );
  }

  async patchNestedControls(formGroupName: string, values: any) {
    if (values && this.propertyAddForm.contains(formGroupName)) {
      const formGroup = this.propertyAddForm.get(formGroupName) as FormGroup;
      const valuesLower = this.lowercaseKeys(values);
      await Promise.all(
        Object.keys(valuesLower[0]).map(async (key) => {
          const formControlKey = this.findFormControlKey(formGroup, key);
          if (formControlKey) {
            let value = valuesLower[0][key];
            if (this.isDateString(value)) {
              value = this.formatDate(value);
            }

            formGroup.patchValue({ [formControlKey]: value });
          }
        })
      );
    }
  }

  async patchNestedArray(formArrayName: string, values: any[]) {
    if (values && this.propertyAddForm.contains(formArrayName)) {
      const formArray = this.propertyAddForm.get(formArrayName) as FormArray;
      formArray.clear();

      await Promise.all(
        values.map(async (value) => {
          const newGroup = this.createFormGroup(
            formArrayName,
            this.lowercaseKeys(value)
          );
          formArray.push(newGroup);
        })
      );
    }
  }

  createFormGroup(formArrayName: string, value: any): FormGroup {
    if (formArrayName === 'FloorPlans') {
      const floorPlanGroup = this.fb.group({
        PlanName: [value.planname, Validators.required],
        NoOfBed: [value.noofbed, Validators.required],
        NoOfBath: [value.noofbath, Validators.required],
        Area: [value.area, Validators.required],
        StartPrice: [value.startprice, Validators.required],
        EndPrice: [value.endprice, Validators.required],
        Description: [value.description, Validators.required],
        FloorPlanImage: this.fb.array([]),
        FloorPlanUnits: this.fb.array([]),
        Id: [value.id, Validators.required],
      });

      if (value.floorplanunits) {
        value.floorplanunits.forEach((unit: any) => {
          const unitGroup = this.fb.group({
            Price: [unit.price, Validators.required],
            AvailabilityDate: [
              this.formatDate(unit.availabilitydate),
              Validators.required,
            ],
          });
          (floorPlanGroup.get('FloorPlanUnits') as FormArray).push(unitGroup);
        });
      }
      if (value.planimage) {
        (floorPlanGroup.get('FloorPlanImage') as FormArray).push(
          this.fb.control(value.planimage)
        );
      }

      return floorPlanGroup;
    } else if (formArrayName === 'OpenHouses') {
      return this.fb.group({
        StartDateTime: [value.startdatetime],
        EndDateTime: [value.enddatetime],
      });
    }
    return this.fb.group({});
  }
  isDateString(value: any): boolean {
    return (
      typeof value === 'string' &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)
    );
  }

  formatDate(dateString: string): string {
    return dateString.split('T')[0];
  }

  showFeatured() {
    const dialogRef = this.dialog.open(PopupFeaturedComponent, {
      height: '490px',
      width: window.innerWidth > 1024 ? '600px' : '100%',
      data: { id: this.previousData?.id, show: 'Featured' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data) {
        this.router.navigateByUrl('/dashboard/my-listings');
      }
    });
  }
  fireSwal() {
    Swal.fire({
      text: 'Your Property has been uploaded successfully!',
      icon: 'success',
      confirmButtonText: 'Feature your property',
      showCancelButton: true,
      cancelButtonText: 'Skip',
      allowOutsideClick: false,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.showFeatured();
      } else {
        this.router.navigateByUrl('/dashboard/my-listings');
      }
    });
  }
}
