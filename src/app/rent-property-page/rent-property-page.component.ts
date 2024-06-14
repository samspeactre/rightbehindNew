import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-rent-property-page',
  templateUrl: './rent-property-page.component.html',
  styleUrls: ['./rent-property-page.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        height: '0px',
        overflow: 'hidden'
      })),
      state('*', style({
        opacity: 1,
        height: '*'
      })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ])
  ]
})
export class RentPropertyPageComponent implements OnInit {

  imageSrc: string | ArrayBuffer | null = null;
  sections: any;
  private readonly MAX_AMENITIES = 24; // Maximum number of amenities to display

  startDate: Date;
  endDate: Date = new Date(); // Initialize with today's date

  selected = 'none';
  selectedFiles: ImageFile[] = [];
  additionalSelectedFiles: ImageFile[] = [];
  thirdSelectedFiles: ImageFile[] = [];
  thirdFileInput: HTMLInputElement | undefined;
  formGroup!: FormGroup;
  floorPlansArray!: FormArray;
  constructor() {
    // Initialize start date to today
    this.startDate = new Date();
  }

  ngOnInit(): void {
    // Limit amenities for each category
    this.categories = this.categories.map(category => ({
      ...category,
      amenities: category.amenities.slice(0, this.MAX_AMENITIES)
    }));
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
        })
      ])
    })
  }

  get getFloorPlansFormArray(): FormArray {
    return this.formGroup.get("floorPlansArray") as FormArray
  }

  addNew() {
    this.floorPlansArray = this.formGroup.get("floorPlansArray") as FormArray
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
    )
  }

  getimg(index: number) {
    this.floorPlansArray = this.formGroup.get("floorPlansArray") as FormArray
    let controls = this.floorPlansArray.at(index)
    return controls.get("img")?.value
  }

  
  // Remove the selected image
  removeImage(index: number) {
    const floorPlanGroup = this.getFloorPlansFormArray.at(index) as FormGroup;
    floorPlanGroup.get('img')?.setValue(null); // Clear the value of the image control
  }

  // Trigger primary file input
  triggerFileInput(index: number): void {
    let id = "fileInput" + index.toString()
    const fileInput = document.getElementById(id) as HTMLElement;
    fileInput.click();
  }

  // Handle primary file selection
  onFileSelected(event: Event,index?: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
        if(index!= undefined) {
          this.floorPlansArray = this.formGroup.get("floorPlansArray") as FormArray
          let controls = this.floorPlansArray.at(index)
          controls.patchValue({
           img: this.imageSrc
  
          })
          console.log(this.floorPlansArray)
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
    console.log("Third file input selected");
    console.log("Event: ", event);
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
          url: e.target.result
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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  categories: Category[] = [
    { name: 'Features', amenities: ['Cable Ready', 'Storage Space', 'Heating', ' Security System', 'Ceiling Fans', ' Double Vanities', ' High Speed Internet Access', ' Satellite TV', 'Sprinkler System', ' Tub/Shower', 'Surround Sound', 'Wi-Fi', 'Framed Mirrors', 'Handrails', 'Intercom', ' Trash Compactor', ' Vacuum System', ' Wheelchair Accessible (Rooms)'] },
    { name: 'Kitchens', amenities: ['Disposal', 'Microwave', 'Eat-in Kitchen', 'Kitchen', 'Granite Countertops', ' Ice Maker', 'Refrigerator', 'Oven', 'Stainless Steel Appliances', 'Range', 'Breakfast Nook', 'Coffee System', 'Freezer', 'Instant Hot Water', 'Island Kitchen', 'Pantry', 'Warming Drawer', 'Quartz Countertops'] },
    { name: 'Outdoor Spaces', amenities: ['Balcony', 'Yard', 'Grill', 'Deck', 'Dock', 'Garden', 'Greenhouse', 'Lawn', 'Patio', 'Porch'] },
    { name: 'Living Spaces', amenities: ['Bay Window', 'Tile Floors', ' Crown Molding', 'Hardwood Floors', 'Vaulted Ceiling', 'Sunroom', 'Views', 'Walk-In Closets', 'Carpet', 'Attic', 'Basement', 'Built-In Bookshelves'] },
    { name: 'Property', amenities: ['Furnished', ' Wheelchair Accessible', ' Elevator', ' No Smoking', 'AC', 'Storage', 'Loft', 'Fitness Center', 'Fireplace', ' Gated Entry', ' Dishwasher', 'Swimming Pool'] },
  ];

  defaultAmenities: string[] = ['Air Conditioning', 'Lawn', 'Swimming Pool', 'Barbeque', 'Microwave', 'Wide-Open Spaces', 'Billiards Table', 'Valet Trash', 'TV Cable', 'Dryer', 'Outdoor Shower', 'Washer', 'Gym', 'Parks', 'Clubhouse', 'Sporting Facilities', 'Refrigerator', 'WIFI', 'Laundry', 'Sauna', 'Window Coverings', 'Rooftop Gardens', 'Spa'].slice(0, this.MAX_AMENITIES); // Limit default amenities

  selectedCategory: Category | null = null;
  filteredAmenities: string[] = this.defaultAmenities;

  amenities: Amenity[] = [];

  onCategoryChange(category: Category) {
    this.selectedCategory = category;
    this.filteredAmenities = category.amenities.slice(0, this.MAX_AMENITIES);
  }

  // Split amenities into chunks of 8 for displaying in columns
  splitAmenitiesIntoColumns(amenities: string[]): string[][] {
    const columns: string[][] = [];
    for (let i = 0; i < amenities.length; i += 8) {
      columns.push(amenities.slice(i, i + 8));
    }
    return columns;
  }

  utilities: string[] = ['Gas', 'Water', 'Electricity', 'Heat', 'Trash Removal', 'Sewer', 'Air Conditioning', 'Cable'];
}
