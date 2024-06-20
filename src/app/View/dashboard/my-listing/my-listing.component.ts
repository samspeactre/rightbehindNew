import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PropertyCardComponent } from '../../../SharedComponents/property-card/property-card.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  imports: [MatIconModule, MatButtonModule, PropertyCardComponent, MatSelectModule, MatFormFieldModule, NgbNavModule],
  selector: 'app-my-listing',
  templateUrl: './my-listing.component.html',
  styleUrl: './my-listing.component.scss'
})
export class MyListingComponent {
  active:number=1
  properties:any = [
    {
      "id": 44,
      "category": 2,
      "propertyType": 1,
      "price": 22,
      "referenceId": null,
      "purpose": null,
      "location": "100 NW 12th Ave, Miami, FL 33128, USA",
      "city": "Miami",
      "community": null,
      "ownership": null,
      "unit": null,
      "plot": "Animi quisquam non ",
      "street": "Northwest 12th Avenue",
      "externalReference": null,
      "frequency": null,
      "completionStatus": null,
      "assignTo": null,
      "notes": null,
      "annualCommission": null,
      "noOfBed": 27,
      "noOfBath": 62,
      "parking": "Officia beatae sed f",
      "parkingFees": 42,
      "laundry": "Washer/Dryer Hookup",
      "petPolicy": "Both",
      "yearBuild": null,
      "developer": null,
      "area": 28,
      "deposit": 84,
      "cheques": null,
      "title": "checking rent onelast time",
      "description": "Minim dolorum eligen",
      "isFurnished": true,
      "country": "United States/Florida",
      "landmark": "Ab deleniti qui ut e",
      "leaseMonth": 35,
      "zipCode": "33128",
      "lsm": null,
      "permitExpiry": null,
      "permit": null,
      "license": null,
      "videoUrl": "Fuga Fugiat tenetur",
      "building": "Aspernatur voluptate",
      "latitude": 25.77457844750128,
      "longitude": -80.21518954296874,
      "status": null,
      "isLive": true,
      "createdAt": "2024-06-15T03:27:02.363",
      "rentSpecialTag": "Free Move-in",
      "propertyImages": [
        {
          "imageUrl": "/Assets/PropertyImages/img-0c40ba5d-2e35-4a61-8820-b89ebaeabb0f.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-1f144445-66f3-4505-a399-0f7fd21ad913.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-57e05083-6920-4945-8a55-567ada592568.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-ef583873-251d-49c8-9bf6-18c0488551c0.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-5402b98a-6dcb-4698-adcb-032372a97bae.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-c9ac903c-daa0-4fc5-acf5-a7515a8437f5.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-7e187d76-63f7-4907-8596-c3500f10bdc9.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-8418534b-e804-4674-aabb-d186374f9c55.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-26aedbb3-967b-4d2c-a6cd-f928d2f141c3.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-104a0f7b-be29-426f-8c59-7f116f89e218.png"
        }
      ],
      "propertyAmenities": [
        {
          "id": 293,
          "propertyId": 44,
          "amenityId": 1,
          "amenity": {
            "id": 1,
            "amenityName": "Cable Ready"
          }
        },
        {
          "id": 294,
          "propertyId": 44,
          "amenityId": 2,
          "amenity": {
            "id": 2,
            "amenityName": "Storage Space"
          }
        },
        {
          "id": 295,
          "propertyId": 44,
          "amenityId": 3,
          "amenity": {
            "id": 3,
            "amenityName": "Heating"
          }
        },
        {
          "id": 296,
          "propertyId": 44,
          "amenityId": 4,
          "amenity": {
            "id": 4,
            "amenityName": "Security System"
          }
        },
        {
          "id": 297,
          "propertyId": 44,
          "amenityId": 5,
          "amenity": {
            "id": 5,
            "amenityName": "Ceiling Fans"
          }
        },
        {
          "id": 298,
          "propertyId": 44,
          "amenityId": 6,
          "amenity": {
            "id": 6,
            "amenityName": "Double Vanities"
          }
        },
        {
          "id": 299,
          "propertyId": 44,
          "amenityId": 7,
          "amenity": {
            "id": 7,
            "amenityName": "High Speed Internet Access"
          }
        },
        {
          "id": 300,
          "propertyId": 44,
          "amenityId": 8,
          "amenity": {
            "id": 8,
            "amenityName": "Satellite TV"
          }
        },
        {
          "id": 301,
          "propertyId": 44,
          "amenityId": 9,
          "amenity": {
            "id": 9,
            "amenityName": "Sprinkler System"
          }
        },
        {
          "id": 302,
          "propertyId": 44,
          "amenityId": 18,
          "amenity": {
            "id": 18,
            "amenityName": "Wheelchair Accessible (Rooms)"
          }
        }
      ],
      "propertyUtilities": [
        {
          "id": 137,
          "propertyId": 44,
          "utilityId": 1,
          "utility": {
            "id": 1,
            "utilityName": "Gas"
          }
        },
        {
          "id": 138,
          "propertyId": 44,
          "utilityId": 3,
          "utility": {
            "id": 3,
            "utilityName": "Electricity"
          }
        },
        {
          "id": 139,
          "propertyId": 44,
          "utilityId": 4,
          "utility": {
            "id": 4,
            "utilityName": "Heat"
          }
        },
        {
          "id": 140,
          "propertyId": 44,
          "utilityId": 6,
          "utility": {
            "id": 6,
            "utilityName": "Sewer"
          }
        },
        {
          "id": 141,
          "propertyId": 44,
          "utilityId": 7,
          "utility": {
            "id": 7,
            "utilityName": "Cable"
          }
        }
      ],
      "floorPlans": [],
      "homeFacts": [],
      "rentSpecials": [
        {
          "id": 28,
          "propertyId": 44,
          "title": "Ut id dolorem quis ",
          "description": "Nesciunt earum maio",
          "tag": "Free Move-in",
          "startDate": "2022-07-25T00:00:00",
          "endDate": "1976-12-14T00:00:00"
        }
      ],
      "openHouses": [],
      "propertyContacts": []
    },
    {
      "id": 43,
      "category": 2,
      "propertyType": 1,
      "price": 100,
      "referenceId": null,
      "purpose": null,
      "location": "abc",
      "city": "khi",
      "community": null,
      "ownership": null,
      "unit": "2 units",
      "plot": "plot no 123",
      "street": "street no 123",
      "externalReference": null,
      "frequency": null,
      "completionStatus": null,
      "assignTo": null,
      "notes": null,
      "annualCommission": null,
      "noOfBed": 1,
      "noOfBath": 1,
      "parking": "Garage-Attached",
      "parkingFees": 20,
      "laundry": "Laundry Facilities",
      "petPolicy": "cat",
      "yearBuild": null,
      "developer": null,
      "area": 120,
      "deposit": 50,
      "cheques": null,
      "title": "staging",
      "description": "staging",
      "isFurnished": true,
      "country": "US",
      "landmark": "Times Square",
      "leaseMonth": 12,
      "zipCode": "10108",
      "lsm": null,
      "permitExpiry": null,
      "permit": null,
      "license": null,
      "videoUrl": "abc",
      "building": "jafers",
      "latitude": 123,
      "longitude": 321,
      "status": null,
      "isLive": true,
      "createdAt": "2024-06-15T00:51:47.02",
      "rentSpecialTag": "50%-OFF",
      "propertyImages": [
        {
          "imageUrl": "/Assets/PropertyImages/img-75ae882d-991c-4fdf-bf58-6e3aaf118656.jpg"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-b23d7e12-578a-4ed2-94e7-84411a69b183.jpg"
        }
      ],
      "propertyAmenities": [
        {
          "id": 291,
          "propertyId": 43,
          "amenityId": 1,
          "amenity": {
            "id": 1,
            "amenityName": "Cable Ready"
          }
        },
        {
          "id": 292,
          "propertyId": 43,
          "amenityId": 2,
          "amenity": {
            "id": 2,
            "amenityName": "Storage Space"
          }
        }
      ],
      "propertyUtilities": [
        {
          "id": 135,
          "propertyId": 43,
          "utilityId": 1,
          "utility": {
            "id": 1,
            "utilityName": "Gas"
          }
        },
        {
          "id": 136,
          "propertyId": 43,
          "utilityId": 2,
          "utility": {
            "id": 2,
            "utilityName": "Water"
          }
        }
      ],
      "floorPlans": [],
      "homeFacts": [],
      "rentSpecials": [
        {
          "id": 27,
          "propertyId": 43,
          "title": "test rent title",
          "description": "test rent desc",
          "tag": "50%-OFF",
          "startDate": "2024-05-30T13:10:04.073",
          "endDate": "2024-05-30T13:10:04.073"
        }
      ],
      "openHouses": [],
      "propertyContacts": []
    },
    {
      "id": 42,
      "category": 2,
      "propertyType": 1,
      "price": 100,
      "referenceId": null,
      "purpose": null,
      "location": "abc",
      "city": "khi",
      "community": null,
      "ownership": null,
      "unit": "2 units",
      "plot": "plot no 123",
      "street": "street no 123",
      "externalReference": null,
      "frequency": null,
      "completionStatus": null,
      "assignTo": null,
      "notes": null,
      "annualCommission": null,
      "noOfBed": 1,
      "noOfBath": 1,
      "parking": "Garage-Attached",
      "parkingFees": 20,
      "laundry": "Laundry Facilities",
      "petPolicy": "cat",
      "yearBuild": null,
      "developer": null,
      "area": 120,
      "deposit": 50,
      "cheques": null,
      "title": "staging",
      "description": "staging",
      "isFurnished": true,
      "country": "US",
      "landmark": "Times Square",
      "leaseMonth": 12,
      "zipCode": "10108",
      "lsm": null,
      "permitExpiry": null,
      "permit": null,
      "license": null,
      "videoUrl": "abc",
      "building": "jafers",
      "latitude": 123,
      "longitude": 321,
      "status": null,
      "isLive": true,
      "createdAt": "2024-06-15T00:36:44.74",
      "rentSpecialTag": "50%-OFF",
      "propertyImages": [
        {
          "imageUrl": "/Assets/PropertyImages/img-fb428577-e829-401b-a56d-62ac82b812c8.jpg"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-0f03c444-02f1-4b5e-8265-afc352296a7d.jpg"
        }
      ],
      "propertyAmenities": [
        {
          "id": 289,
          "propertyId": 42,
          "amenityId": 1,
          "amenity": {
            "id": 1,
            "amenityName": "Cable Ready"
          }
        },
        {
          "id": 290,
          "propertyId": 42,
          "amenityId": 2,
          "amenity": {
            "id": 2,
            "amenityName": "Storage Space"
          }
        }
      ],
      "propertyUtilities": [
        {
          "id": 133,
          "propertyId": 42,
          "utilityId": 1,
          "utility": {
            "id": 1,
            "utilityName": "Gas"
          }
        },
        {
          "id": 134,
          "propertyId": 42,
          "utilityId": 2,
          "utility": {
            "id": 2,
            "utilityName": "Water"
          }
        }
      ],
      "floorPlans": [],
      "homeFacts": [],
      "rentSpecials": [
        {
          "id": 26,
          "propertyId": 42,
          "title": "test rent title",
          "description": "test rent desc",
          "tag": "50%-OFF",
          "startDate": "2024-05-30T13:10:04.073",
          "endDate": "2024-05-30T13:10:04.073"
        }
      ],
      "openHouses": [],
      "propertyContacts": []
    },
    {
      "id": 41,
      "category": 2,
      "propertyType": 1,
      "price": 100,
      "referenceId": null,
      "purpose": null,
      "location": "abc",
      "city": "khi",
      "community": null,
      "ownership": null,
      "unit": "2 units",
      "plot": "plot no 123",
      "street": "street no 123",
      "externalReference": null,
      "frequency": null,
      "completionStatus": null,
      "assignTo": null,
      "notes": null,
      "annualCommission": null,
      "noOfBed": 1,
      "noOfBath": 1,
      "parking": "Garage-Attached",
      "parkingFees": 20,
      "laundry": "Laundry Facilities",
      "petPolicy": "cat",
      "yearBuild": null,
      "developer": null,
      "area": 120,
      "deposit": 50,
      "cheques": null,
      "title": "staging",
      "description": "staging",
      "isFurnished": true,
      "country": "US",
      "landmark": "Times Square",
      "leaseMonth": 12,
      "zipCode": "10108",
      "lsm": null,
      "permitExpiry": null,
      "permit": null,
      "license": null,
      "videoUrl": "abc",
      "building": "jafers",
      "latitude": 123,
      "longitude": 321,
      "status": null,
      "isLive": true,
      "createdAt": "2024-06-15T00:30:23.62",
      "rentSpecialTag": "50%-OFF",
      "propertyImages": [
        {
          "imageUrl": "/Assets/PropertyImages/img-93a8c86e-fc43-4c24-beab-bed9fa6326f7.jpg"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-16a9aa1b-e379-4767-ab6b-0c6ec05694ad.jpg"
        }
      ],
      "propertyAmenities": [
        {
          "id": 287,
          "propertyId": 41,
          "amenityId": 1,
          "amenity": {
            "id": 1,
            "amenityName": "Cable Ready"
          }
        },
        {
          "id": 288,
          "propertyId": 41,
          "amenityId": 2,
          "amenity": {
            "id": 2,
            "amenityName": "Storage Space"
          }
        }
      ],
      "propertyUtilities": [
        {
          "id": 131,
          "propertyId": 41,
          "utilityId": 1,
          "utility": {
            "id": 1,
            "utilityName": "Gas"
          }
        },
        {
          "id": 132,
          "propertyId": 41,
          "utilityId": 2,
          "utility": {
            "id": 2,
            "utilityName": "Water"
          }
        }
      ],
      "floorPlans": [],
      "homeFacts": [],
      "rentSpecials": [
        {
          "id": 25,
          "propertyId": 41,
          "title": "test rent title",
          "description": "test rent desc",
          "tag": "50%-OFF",
          "startDate": "2024-05-30T13:10:04.073",
          "endDate": "2024-05-30T13:10:04.073"
        }
      ],
      "openHouses": [],
      "propertyContacts": []
    },
    {
      "id": 39,
      "category": 2,
      "propertyType": 1,
      "price": 17,
      "referenceId": null,
      "purpose": null,
      "location": "V5R9+9M Miami, OK, USA",
      "city": "Miami",
      "community": null,
      "ownership": null,
      "unit": null,
      "plot": "Sit autem atque alia",
      "street": null,
      "externalReference": null,
      "frequency": null,
      "completionStatus": null,
      "assignTo": null,
      "notes": null,
      "annualCommission": null,
      "noOfBed": 61,
      "noOfBath": 4,
      "parking": "Qui ex ea aut impedi",
      "parkingFees": 83,
      "laundry": "Washer/Dryer Hookup",
      "petPolicy": "Dog",
      "yearBuild": null,
      "developer": null,
      "area": 2,
      "deposit": 85,
      "cheques": null,
      "title": "rent check",
      "description": "Iure enim cumque vel",
      "isFurnished": true,
      "country": "United States Oklahoma",
      "landmark": "Qui tempore reprehe",
      "leaseMonth": 7,
      "zipCode": "74354",
      "lsm": null,
      "permitExpiry": null,
      "permit": null,
      "license": null,
      "videoUrl": "Voluptas vero laboru",
      "building": "Et fugiat rerum eius",
      "latitude": 36.89099131855463,
      "longitude": -94.83076350546875,
      "status": null,
      "isLive": true,
      "createdAt": "2024-06-14T18:58:17.94",
      "rentSpecialTag": null,
      "propertyImages": [
        {
          "imageUrl": "/Assets/PropertyImages/img-17385124-c7cb-4ec8-a662-7dd0f090969f.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-db229355-e901-4ac7-b478-39cf2fa59397.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-12c36746-de87-42e0-8eff-d119ef51b88b.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-a5c36507-ac02-47f5-95af-0817f84b4b30.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-98050aa7-44fc-473a-91a8-eca6f128bf6f.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-e120f131-84b5-4ea6-a8d2-e97cb3e12771.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-ff10d4ff-56a6-46ff-b929-ba89efbb515d.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-08e0de8b-336a-4a23-92d2-a9fd95100f76.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-288ea874-5396-402e-8e85-a5f5cf948f05.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-eafd7e77-c3d4-4e47-87d5-c9b427b6d614.png"
        }
      ],
      "propertyAmenities": [
        {
          "id": 268,
          "propertyId": 39,
          "amenityId": 1,
          "amenity": {
            "id": 1,
            "amenityName": "Cable Ready"
          }
        },
        {
          "id": 269,
          "propertyId": 39,
          "amenityId": 3,
          "amenity": {
            "id": 3,
            "amenityName": "Heating"
          }
        },
        {
          "id": 270,
          "propertyId": 39,
          "amenityId": 4,
          "amenity": {
            "id": 4,
            "amenityName": "Security System"
          }
        },
        {
          "id": 271,
          "propertyId": 39,
          "amenityId": 9,
          "amenity": {
            "id": 9,
            "amenityName": "Sprinkler System"
          }
        },
        {
          "id": 272,
          "propertyId": 39,
          "amenityId": 10,
          "amenity": {
            "id": 10,
            "amenityName": "Tub/Shower"
          }
        },
        {
          "id": 273,
          "propertyId": 39,
          "amenityId": 11,
          "amenity": {
            "id": 11,
            "amenityName": "Surround Sound"
          }
        },
        {
          "id": 274,
          "propertyId": 39,
          "amenityId": 12,
          "amenity": {
            "id": 12,
            "amenityName": "Wi-Fi"
          }
        },
        {
          "id": 275,
          "propertyId": 39,
          "amenityId": 16,
          "amenity": {
            "id": 16,
            "amenityName": "Trash Compactor"
          }
        },
        {
          "id": 276,
          "propertyId": 39,
          "amenityId": 18,
          "amenity": {
            "id": 18,
            "amenityName": "Wheelchair Accessible (Rooms)"
          }
        }
      ],
      "propertyUtilities": [
        {
          "id": 124,
          "propertyId": 39,
          "utilityId": 4,
          "utility": {
            "id": 4,
            "utilityName": "Heat"
          }
        },
        {
          "id": 125,
          "propertyId": 39,
          "utilityId": 5,
          "utility": {
            "id": 5,
            "utilityName": "Trash Removal"
          }
        },
        {
          "id": 126,
          "propertyId": 39,
          "utilityId": 7,
          "utility": {
            "id": 7,
            "utilityName": "Cable"
          }
        }
      ],
      "floorPlans": [],
      "homeFacts": [],
      "rentSpecials": [
        {
          "id": 24,
          "propertyId": 39,
          "title": "Dolorem laudantium ",
          "description": "Ex eiusmod mollitia ",
          "tag": null,
          "startDate": "1987-05-12T00:00:00",
          "endDate": "2001-04-01T00:00:00"
        }
      ],
      "openHouses": [],
      "propertyContacts": []
    },
    {
      "id": 37,
      "category": 2,
      "propertyType": 1,
      "price": 35,
      "referenceId": null,
      "purpose": null,
      "location": "Miami International Airport (MIA), 2100 NW 42nd Ave, Miami, FL 33142, USA",
      "city": "Totam sed quo dignis",
      "community": null,
      "ownership": null,
      "unit": null,
      "plot": "Esse eum quos ratio",
      "street": "Dolor in est dolorem",
      "externalReference": null,
      "frequency": null,
      "completionStatus": null,
      "assignTo": null,
      "notes": null,
      "annualCommission": null,
      "noOfBed": 25,
      "noOfBath": 79,
      "parking": "Et eveniet consequa",
      "parkingFees": 28,
      "laundry": null,
      "petPolicy": null,
      "yearBuild": null,
      "developer": null,
      "area": 100,
      "deposit": 7,
      "cheques": null,
      "title": "Eaque qui atque veli",
      "description": "Aliquip cum facere i",
      "isFurnished": true,
      "country": "Inventore exercitati",
      "landmark": "Qui fugit incidunt",
      "leaseMonth": 36,
      "zipCode": "57",
      "lsm": null,
      "permitExpiry": null,
      "permit": null,
      "license": null,
      "videoUrl": "Itaque libero sunt d",
      "building": "Voluptate dolores ea",
      "latitude": 25.7923496,
      "longitude": -80.28230590000001,
      "status": null,
      "isLive": true,
      "createdAt": "2024-06-14T13:32:24.533",
      "rentSpecialTag": "Laudantium",
      "propertyImages": [],
      "propertyAmenities": [
        {
          "id": 251,
          "propertyId": 37,
          "amenityId": 3,
          "amenity": {
            "id": 3,
            "amenityName": "Heating"
          }
        },
        {
          "id": 252,
          "propertyId": 37,
          "amenityId": 6,
          "amenity": {
            "id": 6,
            "amenityName": "Double Vanities"
          }
        },
        {
          "id": 253,
          "propertyId": 37,
          "amenityId": 10,
          "amenity": {
            "id": 10,
            "amenityName": "Tub/Shower"
          }
        },
        {
          "id": 254,
          "propertyId": 37,
          "amenityId": 2,
          "amenity": {
            "id": 2,
            "amenityName": "Storage Space"
          }
        },
        {
          "id": 255,
          "propertyId": 37,
          "amenityId": 4,
          "amenity": {
            "id": 4,
            "amenityName": "Security System"
          }
        },
        {
          "id": 256,
          "propertyId": 37,
          "amenityId": 8,
          "amenity": {
            "id": 8,
            "amenityName": "Satellite TV"
          }
        },
        {
          "id": 257,
          "propertyId": 37,
          "amenityId": 12,
          "amenity": {
            "id": 12,
            "amenityName": "Wi-Fi"
          }
        },
        {
          "id": 258,
          "propertyId": 37,
          "amenityId": 17,
          "amenity": {
            "id": 17,
            "amenityName": "Vacuum System"
          }
        }
      ],
      "propertyUtilities": [
        {
          "id": 116,
          "propertyId": 37,
          "utilityId": 3,
          "utility": {
            "id": 3,
            "utilityName": "Electricity"
          }
        },
        {
          "id": 117,
          "propertyId": 37,
          "utilityId": 5,
          "utility": {
            "id": 5,
            "utilityName": "Trash Removal"
          }
        },
        {
          "id": 118,
          "propertyId": 37,
          "utilityId": 6,
          "utility": {
            "id": 6,
            "utilityName": "Sewer"
          }
        },
        {
          "id": 119,
          "propertyId": 37,
          "utilityId": 7,
          "utility": {
            "id": 7,
            "utilityName": "Cable"
          }
        },
        {
          "id": 120,
          "propertyId": 37,
          "utilityId": 2,
          "utility": {
            "id": 2,
            "utilityName": "Water"
          }
        }
      ],
      "floorPlans": [],
      "homeFacts": [],
      "rentSpecials": [
        {
          "id": 23,
          "propertyId": 37,
          "title": "Commodi cillum volup",
          "description": "Molestiae repellendu",
          "tag": "Laudantium",
          "startDate": "2007-12-15T00:00:00",
          "endDate": "1989-03-02T00:00:00"
        }
      ],
      "openHouses": [],
      "propertyContacts": []
    },
    {
      "id": 35,
      "category": 2,
      "propertyType": 1,
      "price": 39,
      "referenceId": null,
      "purpose": null,
      "location": "1170 SE 12th Terrace, Miami, FL 33132, USA",
      "city": "Odit fugiat asperna",
      "community": null,
      "ownership": null,
      "unit": null,
      "plot": "Eaque cumque enim na",
      "street": "Optio ullamco ea ex",
      "externalReference": null,
      "frequency": null,
      "completionStatus": null,
      "assignTo": null,
      "notes": null,
      "annualCommission": null,
      "noOfBed": 3,
      "noOfBath": 60,
      "parking": "Sint ab quasi obcaec",
      "parkingFees": 4,
      "laundry": null,
      "petPolicy": null,
      "yearBuild": null,
      "developer": null,
      "area": 30,
      "deposit": 80,
      "cheques": null,
      "title": "Pariatur Similique ",
      "description": "Aut quia sit magni r",
      "isFurnished": true,
      "country": "Aut aut duis iusto a",
      "landmark": "Non non cillum amet",
      "leaseMonth": 54,
      "zipCode": "23",
      "lsm": null,
      "permitExpiry": null,
      "permit": null,
      "license": null,
      "videoUrl": "Voluptates eu deseru",
      "building": "Corporis rerum et pe",
      "latitude": 25.7616798,
      "longitude": -80.1917902,
      "status": null,
      "isLive": true,
      "createdAt": "2024-06-14T13:11:27.717",
      "rentSpecialTag": "1 Month Free",
      "propertyImages": [],
      "propertyAmenities": [
        {
          "id": 230,
          "propertyId": 35,
          "amenityId": 1,
          "amenity": {
            "id": 1,
            "amenityName": "Cable Ready"
          }
        },
        {
          "id": 231,
          "propertyId": 35,
          "amenityId": 2,
          "amenity": {
            "id": 2,
            "amenityName": "Storage Space"
          }
        },
        {
          "id": 232,
          "propertyId": 35,
          "amenityId": 3,
          "amenity": {
            "id": 3,
            "amenityName": "Heating"
          }
        },
        {
          "id": 233,
          "propertyId": 35,
          "amenityId": 4,
          "amenity": {
            "id": 4,
            "amenityName": "Security System"
          }
        },
        {
          "id": 234,
          "propertyId": 35,
          "amenityId": 5,
          "amenity": {
            "id": 5,
            "amenityName": "Ceiling Fans"
          }
        },
        {
          "id": 235,
          "propertyId": 35,
          "amenityId": 6,
          "amenity": {
            "id": 6,
            "amenityName": "Double Vanities"
          }
        },
        {
          "id": 236,
          "propertyId": 35,
          "amenityId": 8,
          "amenity": {
            "id": 8,
            "amenityName": "Satellite TV"
          }
        },
        {
          "id": 237,
          "propertyId": 35,
          "amenityId": 11,
          "amenity": {
            "id": 11,
            "amenityName": "Surround Sound"
          }
        },
        {
          "id": 238,
          "propertyId": 35,
          "amenityId": 12,
          "amenity": {
            "id": 12,
            "amenityName": "Wi-Fi"
          }
        },
        {
          "id": 239,
          "propertyId": 35,
          "amenityId": 16,
          "amenity": {
            "id": 16,
            "amenityName": "Trash Compactor"
          }
        }
      ],
      "propertyUtilities": [
        {
          "id": 106,
          "propertyId": 35,
          "utilityId": 2,
          "utility": {
            "id": 2,
            "utilityName": "Water"
          }
        },
        {
          "id": 107,
          "propertyId": 35,
          "utilityId": 3,
          "utility": {
            "id": 3,
            "utilityName": "Electricity"
          }
        },
        {
          "id": 108,
          "propertyId": 35,
          "utilityId": 4,
          "utility": {
            "id": 4,
            "utilityName": "Heat"
          }
        },
        {
          "id": 109,
          "propertyId": 35,
          "utilityId": 5,
          "utility": {
            "id": 5,
            "utilityName": "Trash Removal"
          }
        },
        {
          "id": 110,
          "propertyId": 35,
          "utilityId": 6,
          "utility": {
            "id": 6,
            "utilityName": "Sewer"
          }
        }
      ],
      "floorPlans": [],
      "homeFacts": [],
      "rentSpecials": [
        {
          "id": 22,
          "propertyId": 35,
          "title": "Quo quia do exercita",
          "description": "Libero eligendi blan",
          "tag": "1 Month Free",
          "startDate": "2009-07-06T00:00:00",
          "endDate": "1971-08-17T00:00:00"
        }
      ],
      "openHouses": [],
      "propertyContacts": []
    },
    {
      "id": 34,
      "category": 2,
      "propertyType": 1,
      "price": 54,
      "referenceId": null,
      "purpose": null,
      "location": "1170 SE 12th Terrace, Miami, FL 33132, USA",
      "city": "Voluptate expedita e",
      "community": null,
      "ownership": null,
      "unit": null,
      "plot": "Facere aut amet sin",
      "street": "Quasi sint iste impe",
      "externalReference": null,
      "frequency": null,
      "completionStatus": null,
      "assignTo": null,
      "notes": null,
      "annualCommission": null,
      "noOfBed": 4,
      "noOfBath": 48,
      "parking": "Aut eum ullam eiusmo",
      "parkingFees": 32,
      "laundry": null,
      "petPolicy": null,
      "yearBuild": null,
      "developer": null,
      "area": 3,
      "deposit": 1,
      "cheques": null,
      "title": "Minima Nam reprehend",
      "description": "Officia esse et eve",
      "isFurnished": true,
      "country": "Ea nihil ut quis ex ",
      "landmark": "Et perferendis eum a",
      "leaseMonth": 85,
      "zipCode": "53",
      "lsm": null,
      "permitExpiry": null,
      "permit": null,
      "license": null,
      "videoUrl": "Sit est porro ex h",
      "building": "In aliquip non eos ",
      "latitude": 25.7616798,
      "longitude": -80.1917902,
      "status": null,
      "isLive": true,
      "createdAt": "2024-06-14T13:10:37.09",
      "rentSpecialTag": "Eius et do",
      "propertyImages": [],
      "propertyAmenities": [
        {
          "id": 219,
          "propertyId": 34,
          "amenityId": 1,
          "amenity": {
            "id": 1,
            "amenityName": "Cable Ready"
          }
        },
        {
          "id": 220,
          "propertyId": 34,
          "amenityId": 2,
          "amenity": {
            "id": 2,
            "amenityName": "Storage Space"
          }
        },
        {
          "id": 221,
          "propertyId": 34,
          "amenityId": 3,
          "amenity": {
            "id": 3,
            "amenityName": "Heating"
          }
        },
        {
          "id": 222,
          "propertyId": 34,
          "amenityId": 6,
          "amenity": {
            "id": 6,
            "amenityName": "Double Vanities"
          }
        },
        {
          "id": 223,
          "propertyId": 34,
          "amenityId": 8,
          "amenity": {
            "id": 8,
            "amenityName": "Satellite TV"
          }
        },
        {
          "id": 224,
          "propertyId": 34,
          "amenityId": 9,
          "amenity": {
            "id": 9,
            "amenityName": "Sprinkler System"
          }
        },
        {
          "id": 225,
          "propertyId": 34,
          "amenityId": 11,
          "amenity": {
            "id": 11,
            "amenityName": "Surround Sound"
          }
        },
        {
          "id": 226,
          "propertyId": 34,
          "amenityId": 12,
          "amenity": {
            "id": 12,
            "amenityName": "Wi-Fi"
          }
        },
        {
          "id": 227,
          "propertyId": 34,
          "amenityId": 13,
          "amenity": {
            "id": 13,
            "amenityName": "Framed Mirrors"
          }
        },
        {
          "id": 228,
          "propertyId": 34,
          "amenityId": 14,
          "amenity": {
            "id": 14,
            "amenityName": "Handrails"
          }
        },
        {
          "id": 229,
          "propertyId": 34,
          "amenityId": 18,
          "amenity": {
            "id": 18,
            "amenityName": "Wheelchair Accessible (Rooms)"
          }
        }
      ],
      "propertyUtilities": [
        {
          "id": 103,
          "propertyId": 34,
          "utilityId": 6,
          "utility": {
            "id": 6,
            "utilityName": "Sewer"
          }
        },
        {
          "id": 104,
          "propertyId": 34,
          "utilityId": 7,
          "utility": {
            "id": 7,
            "utilityName": "Cable"
          }
        },
        {
          "id": 105,
          "propertyId": 34,
          "utilityId": 8,
          "utility": {
            "id": 8,
            "utilityName": "Air Conditioning"
          }
        }
      ],
      "floorPlans": [],
      "homeFacts": [],
      "rentSpecials": [
        {
          "id": 21,
          "propertyId": 34,
          "title": "Duis quo tenetur har",
          "description": "Molestias ut possimu",
          "tag": "Eius et do",
          "startDate": "1992-12-27T00:00:00",
          "endDate": "2012-07-04T00:00:00"
        }
      ],
      "openHouses": [],
      "propertyContacts": []
    },
    {
      "id": 33,
      "category": 2,
      "propertyType": 1,
      "price": 55,
      "referenceId": null,
      "purpose": null,
      "location": "1170 SE 12th Terrace, Miami, FL 33132, USA",
      "city": "Commodi distinctio ",
      "community": null,
      "ownership": null,
      "unit": null,
      "plot": "Aliquam tempor occae",
      "street": "Debitis voluptate ea",
      "externalReference": null,
      "frequency": null,
      "completionStatus": null,
      "assignTo": null,
      "notes": null,
      "annualCommission": null,
      "noOfBed": 41,
      "noOfBath": 5,
      "parking": "Quidem vero veniam ",
      "parkingFees": 65,
      "laundry": null,
      "petPolicy": null,
      "yearBuild": null,
      "developer": null,
      "area": 39,
      "deposit": 77,
      "cheques": null,
      "title": "Voluptas blanditiis ",
      "description": "Duis Nam commodi ex ",
      "isFurnished": true,
      "country": "Provident ea itaque",
      "landmark": "Ut atque est archite",
      "leaseMonth": 71,
      "zipCode": "26",
      "lsm": null,
      "permitExpiry": null,
      "permit": null,
      "license": null,
      "videoUrl": "Id tempora dolores e",
      "building": "Accusamus reiciendis",
      "latitude": 25.7616798,
      "longitude": -80.1917902,
      "status": null,
      "isLive": true,
      "createdAt": "2024-06-14T13:08:22.94",
      "rentSpecialTag": null,
      "propertyImages": [
        {
          "imageUrl": "/Assets/PropertyImages/img-68aaa4a4-a518-46c4-870c-aa0f09e6bc3b.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-57515812-f457-42ae-8ddc-5370f0195e4d.png"
        }
      ],
      "propertyAmenities": [
        {
          "id": 209,
          "propertyId": 33,
          "amenityId": 1,
          "amenity": {
            "id": 1,
            "amenityName": "Cable Ready"
          }
        },
        {
          "id": 210,
          "propertyId": 33,
          "amenityId": 2,
          "amenity": {
            "id": 2,
            "amenityName": "Storage Space"
          }
        },
        {
          "id": 211,
          "propertyId": 33,
          "amenityId": 4,
          "amenity": {
            "id": 4,
            "amenityName": "Security System"
          }
        },
        {
          "id": 212,
          "propertyId": 33,
          "amenityId": 5,
          "amenity": {
            "id": 5,
            "amenityName": "Ceiling Fans"
          }
        },
        {
          "id": 213,
          "propertyId": 33,
          "amenityId": 6,
          "amenity": {
            "id": 6,
            "amenityName": "Double Vanities"
          }
        },
        {
          "id": 214,
          "propertyId": 33,
          "amenityId": 7,
          "amenity": {
            "id": 7,
            "amenityName": "High Speed Internet Access"
          }
        },
        {
          "id": 215,
          "propertyId": 33,
          "amenityId": 9,
          "amenity": {
            "id": 9,
            "amenityName": "Sprinkler System"
          }
        },
        {
          "id": 216,
          "propertyId": 33,
          "amenityId": 13,
          "amenity": {
            "id": 13,
            "amenityName": "Framed Mirrors"
          }
        },
        {
          "id": 217,
          "propertyId": 33,
          "amenityId": 16,
          "amenity": {
            "id": 16,
            "amenityName": "Trash Compactor"
          }
        },
        {
          "id": 218,
          "propertyId": 33,
          "amenityId": 18,
          "amenity": {
            "id": 18,
            "amenityName": "Wheelchair Accessible (Rooms)"
          }
        }
      ],
      "propertyUtilities": [
        {
          "id": 99,
          "propertyId": 33,
          "utilityId": 4,
          "utility": {
            "id": 4,
            "utilityName": "Heat"
          }
        },
        {
          "id": 100,
          "propertyId": 33,
          "utilityId": 5,
          "utility": {
            "id": 5,
            "utilityName": "Trash Removal"
          }
        },
        {
          "id": 101,
          "propertyId": 33,
          "utilityId": 7,
          "utility": {
            "id": 7,
            "utilityName": "Cable"
          }
        },
        {
          "id": 102,
          "propertyId": 33,
          "utilityId": 8,
          "utility": {
            "id": 8,
            "utilityName": "Air Conditioning"
          }
        }
      ],
      "floorPlans": [],
      "homeFacts": [],
      "rentSpecials": [
        {
          "id": 20,
          "propertyId": 33,
          "title": "Et natus sit verita",
          "description": null,
          "tag": null,
          "startDate": "2005-05-03T00:00:00",
          "endDate": "1995-07-12T00:00:00"
        }
      ],
      "openHouses": [],
      "propertyContacts": []
    },
    {
      "id": 31,
      "category": 2,
      "propertyType": 1,
      "price": 97,
      "referenceId": null,
      "purpose": null,
      "location": "1500 Ocean Dr #100, Miami Beach, FL 33139, USA",
      "city": "Miami Beach",
      "community": null,
      "ownership": null,
      "unit": null,
      "plot": "Est error voluptate ",
      "street": "Eu magna laudantium",
      "externalReference": null,
      "frequency": null,
      "completionStatus": null,
      "assignTo": null,
      "notes": null,
      "annualCommission": null,
      "noOfBed": 78,
      "noOfBath": 42,
      "parking": "Ut facere doloribus ",
      "parkingFees": 18,
      "laundry": "Washer/Dryer Hookup",
      "petPolicy": "Dog",
      "yearBuild": null,
      "developer": null,
      "area": 66,
      "deposit": 85,
      "cheques": null,
      "title": "Ipsum qui qui beata",
      "description": "Dignissimos dolorem ",
      "isFurnished": false,
      "country": "United States",
      "landmark": "Cillum culpa velit ",
      "leaseMonth": 57,
      "zipCode": "88",
      "lsm": null,
      "permitExpiry": null,
      "permit": null,
      "license": null,
      "videoUrl": "Velit voluptatem i",
      "building": "Repellendus Est ull",
      "latitude": 25.787803,
      "longitude": -80.1292869,
      "status": null,
      "isLive": true,
      "createdAt": "2024-06-13T22:00:58.973",
      "rentSpecialTag": "Sint et es",
      "propertyImages": [
        {
          "imageUrl": "/Assets/PropertyImages/img-67498ff9-94da-4d3c-a54f-c5bc89e0a3c2.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-601773f3-0aa0-45ad-a682-9bcdb18da716.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-ffc8b8cf-043a-42a9-b1a1-2c2a9e0d094c.png"
        },
        {
          "imageUrl": "/Assets/PropertyImages/img-1b084c65-b22b-45e6-865b-514b424fa247.png"
        }
      ],
      "propertyAmenities": [
        {
          "id": 193,
          "propertyId": 31,
          "amenityId": 6,
          "amenity": {
            "id": 6,
            "amenityName": "Double Vanities"
          }
        },
        {
          "id": 194,
          "propertyId": 31,
          "amenityId": 15,
          "amenity": {
            "id": 15,
            "amenityName": "Intercom"
          }
        },
        {
          "id": 195,
          "propertyId": 31,
          "amenityId": 18,
          "amenity": {
            "id": 18,
            "amenityName": "Wheelchair Accessible (Rooms)"
          }
        },
        {
          "id": 196,
          "propertyId": 31,
          "amenityId": 7,
          "amenity": {
            "id": 7,
            "amenityName": "High Speed Internet Access"
          }
        },
        {
          "id": 197,
          "propertyId": 31,
          "amenityId": 8,
          "amenity": {
            "id": 8,
            "amenityName": "Satellite TV"
          }
        },
        {
          "id": 198,
          "propertyId": 31,
          "amenityId": 9,
          "amenity": {
            "id": 9,
            "amenityName": "Sprinkler System"
          }
        },
        {
          "id": 199,
          "propertyId": 31,
          "amenityId": 14,
          "amenity": {
            "id": 14,
            "amenityName": "Handrails"
          }
        },
        {
          "id": 200,
          "propertyId": 31,
          "amenityId": 17,
          "amenity": {
            "id": 17,
            "amenityName": "Vacuum System"
          }
        }
      ],
      "propertyUtilities": [
        {
          "id": 92,
          "propertyId": 31,
          "utilityId": 6,
          "utility": {
            "id": 6,
            "utilityName": "Sewer"
          }
        },
        {
          "id": 93,
          "propertyId": 31,
          "utilityId": 2,
          "utility": {
            "id": 2,
            "utilityName": "Water"
          }
        },
        {
          "id": 94,
          "propertyId": 31,
          "utilityId": 5,
          "utility": {
            "id": 5,
            "utilityName": "Trash Removal"
          }
        }
      ],
      "floorPlans": [],
      "homeFacts": [],
      "rentSpecials": [
        {
          "id": 19,
          "propertyId": 31,
          "title": "Doloribus irure labo",
          "description": null,
          "tag": "Sint et es",
          "startDate": "2009-06-11T00:00:00",
          "endDate": "1995-03-12T00:00:00"
        }
      ],
      "openHouses": [],
      "propertyContacts": []
    }
  ]
}
