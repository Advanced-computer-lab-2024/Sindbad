# Sindbad API Refrences

For testing on postman, write the base link followed by the specified route
```bash
http://localhost:3000/addRouteHere
```

- [Activity Routes](#activity-routes)
- [Admin Routes](#admin-routes)
- [Category Routes](#category-routes)
- [Flight Routes](#flight-routes)
- [Hotel Routes](#hotel-routes)
- [Promo Code Routes](#promo-code-routes)
- [Tag Routes](#tag-routes)


## Activity Routes


### Create Activity

```bash
POST /activity/
```

#### Request

| Parameter        | Type     | Description                                                            |
|-------------------|----------|------------------------------------------------------------------------|
| name             | String   | **Required.** Name of the activity.                                    |
| dateTime         | DateTime | **Required.** Scheduled date and time for the activity.                |
| location         | Object   | **Required.** Location details as a JSON object.                      |
| price            | Number   | **Required.** Price for the activity.                                  |
| category         | String   | **Required.** Name of the category.                                    |
| tags             | Array    | **Required.** Array of tag names.                                      |
| discounts        | Array    | **Optional.** Array of discount objects.                               |
| isBookingOpen    | Boolean  | **Required.** Indicates if booking is open (true/false).               |
| headCount        | Number   | **Optional.** Maximum headcount for the activity.                      |
| description      | String   | **Optional.** Description of the activity.                             |
| cardImage        | File     | **Optional.** Card image file for the activity.                        |

#### Response

```json
{
  "message": "Activity created successfully",
  Created Activity Document
}
```

### Update Activity

```bash
PUT /activity/:id
```

#### Request

| Parameter        | Type     | Description                                                            |
|-------------------|----------|------------------------------------------------------------------------|
| id               | String   | **Required.** The ID of the activity.                                  |
| name             | String   | **Optional.** Updated activity name.                                   |
| dateTime         | DateTime | **Optional.** Updated date and time for the activity.                  |
| location         | Object   | **Optional.** Updated location details as a JSON object.               |
| price            | Number   | **Optional.** Updated price for the activity.                          |
| category         | String   | **Optional.** Updated category for the activity.                       |
| tags             | Array    | **Optional.** Updated array of tag names.                              |
| discounts        | Array    | **Optional.** Updated array of discount objects.                       |
| isBookingOpen    | Boolean  | **Optional.** Updated booking status (open or closed).                 |
| headCount        | Number   | **Optional.** Updated maximum headcount for the activity.              |
| description      | String   | **Optional.** Updated description of the activity.                     |
| cardImage        | File     | **Optional.** Updated card image for the activity.                     |

#### Response

```json
{
  Updated Activity Document
}
```
### Get Activity by ID
```bash
GET /activity/:id
```

#### Request

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The ID of the activity to be retrieved.|

#### Response

```json
{
  Activity Document (populated with Category Document, Tag Document)
}
```

### Set Activity as Inappropriate

```bash
PUT /activity/:id/inappropriate
```

#### Request

| Parameter        | Type    | Description                                   |
|-------------------|---------|-----------------------------------------------|
| id               | String  | **Required.** The ID of the activity.         |
| isInappropriate  | Boolean | **Required.** Indicates if the activity is flagged as inappropriate (true/false). This is passed in the request body. |

#### Response

```json
{
  "message": "Activity flagged successfully",
  Activity Document
}
```

### Get My Activities

```bash
GET /activity/my-activities/:creatorId
```

#### Request

| Parameter  | Type   | Description                                       |
|------------|--------|---------------------------------------------------|
| creatorId  | String | **Required.** The ID of the user whose activities are to be retrieved. |

#### Response
    
```json
{
    [
    Activity 1 Document,
    Activity 2 Document,
    ...
    ]
}
```

### Get All Activities

```bash
GET /activity/
```

#### Request

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| searchTerm| String | **Optional** term to search in activity names, tags, or categories to be passed in the query.  |
| budget    | Number | **Optional** for filtering activities by price to be passed in the query.  |
| date.start| Date   | **Optional** start date for filtering activities to be passed in the query.  |
| date.end  | Date   | **Optional** end date for filtering activities to be passed in the query.  |
| category  | String | **Optional** category for filtering activities to be passed in the query.  |
| minRating | Number | **Optional** minimum average rating for filtering activities to be passed in the query.  |
| sortBy    | String | **Optional** field to sort by ("price", "averageRating", or "dateTime") to be passed in the query.  |
| sortOrder | String | **Optional** sort order ("asc" or "desc") to be passed in the query. Default is "asc"  |
| page      | Number | **Optional** page number for pagination to be passed in the query. Default is 1.  |
| limit     | Number | **Optional** number of activities per page to be passed in the query. Default is 10.  |

#### Response
    
```json
{
    [
    Activity 1 Document,
    Activity 2 Document,
    ...
    ]
}
```

### Delete Activity

```bash
DELETE /activity/:id
```

#### Request

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The ID of the activity to delete.  |

#### Response

```json
    {
    Deleted Activity Document
    }
```

### Post a Rating to an Activity

```bash
POST activity/:id
```

#### Request

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The ID of the activity.  |
| userId    | Number | **Required.** The user's id passed in the request body.  |
| rating    | Number | **Required.** The rating passed in the request body.  |


#### Response

```json
{
  "message": "Rating added successfully",
  Activity Document (populated with Category Document, Tag Document),
}
```

### Post a comment to an Activity

```bash
POST /activity/:id/comment
```

#### Request

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The ID of the activity  |
| userId    | Number | **Required.** The user's id passed in the request body.  |
| comment    | Number | **Required.** The comment passed in the request body.  |

#### Response

```json
{
  "message": "Comment added successfully",
  Activity Document (populated with Category Document, Tag Document),
}
```

### Book an Activity

```bash
POST /activity/book
```

#### Request

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| activityId        | String | **Required.** The activity to be booked's Id passed in the request body.  |
| userId        | String | **Required.** The Id of the user booking the activity passed in the request body.  |

#### Response

```json
{
  "message": "Activity booked successfully",
  Activity Document,
  "priceCharged" : 30
}
```

### Cancel an Activity's Booking

```bash
POST /activity/cancel
```

#### Request

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| activityId        | String | **Required.** The activity to be canceled's Id passed in the request body.  |
| userId        | String | **Required.** The Id of the user cancelling the activity passed in the request body.  |

#### Response

```json
{
  "message": "Activity cancelled successfully",
}
```

## Admin Routes

### Get All Admins

#### Request
```bash
GET /admin/
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| email        | String | **Optional.** The admin to be fetched's email as a filter passed in the request query.  |
| username        | String | **Optional.** The admin to be fetched's username as a filter passed in the request query.  |

#### Response

```json
{
    [
    Admin 1 Document,
    Admin 2 Document,
    ...
    ]
}
```

### Create an Admin

#### Request

```bash
POST /admin/
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| email        | String | **Required.**   |
| username        | String | **Required.**   |
| passwordHash        | String | **Required.**  |

#### Response

```json
{
  "message": "Comment added successfully",
  Admin Document
}
```

### Get an Admin by Id

#### Request

```bash
GET /admin/:id
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The Admin to be fetched's id.  |

#### Response

```json
{
  Admin Document
}
```

### Delete an Admin

#### Request

```bash
DELETE /admin/:id
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The Admin to be deleted's id.  |


#### Response

```json
{
  "message": "Admin deleted successfully!",
}
```

### Get Accounts requesting to be deleted

#### Request

```bash
GET /admin/requested-account-deletion-users
```

#### Response

```json
{
    [
    Tourist 1 Document,
    Tourguide 1 Document,
    Advertiser 1 Document,
    Seller 1 Document,
    Tourist 2 Document,
    ...
    ]
}
```

## Advertiser Routes

## Authorization Routes

## Category Routes
### Create Category 

#### Request
```bash
POST /category/
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| name       | String | **Required.** Catergory's name to be passed in the body.|

### Retrieve Category by ID

#### Request
```bash
GET /category/:id
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| id         | String | **Required.** Id of the category to be retrieved.        |

#### Response

```json
{
  Category Document
}
```

### Retrieve All Categories

#### Request
```bash
GET /category/
```

#### Response

```json
{
    [
    Category 1 Document,
    Category 2 Document,
    ...
    ]
}
```

### Update Category by ID

#### Request
```bash
PUT /category/:id
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| id         | String | **Required.** Id of the category to be updated.      |
| name       | String | **Required.** Catergory's name to be passed in the body.|


#### Response

```json
{
  Updated Category Document
}
```

### Delete Category by ID

#### Request
```bash
DELETE /category/:id
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| id         | String | **Required.** Id of the category to be deleted.      |

#### Response

```json
{
  "message": "Category deleted successfully!",
}
```
## Checkout Routes
## Complaints Routes
## Flight Routes

### Find Flights

#### Request

```bash
GET /flight/findFlight
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| origin         | String | **Required.** origin Location. |
| destination    | String | **Required.** Destination Location. |
| date           | Date | **Required.** Date of the Flight. |
| adults         | Number | **Required.** Number of travelers. |

#### Response
```json
{
  "meta": {
    "count": 2
  },
  "data": [
    {
      "type": "flight-offer",
      "id": "1",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": false,
      "lastTicketingDate": "2023-11-01",
      "numberOfBookableSeats": 9,
      "itineraries": [
        {
          "duration": "PT9H10M",
          "segments": [
            {
              "departure": {
                "iataCode": "EWR",
                "at": "2023-11-01T21:50:00"
              },
              "arrival": {
                "iataCode": "LHR",
                "at": "2023-11-02T08:45:00"
              },
              "carrierCode": "6X",
              "number": "188",
              "aircraft": {
                "code": "777"
              },
              "operating": {
                "carrierCode": "6X"
              },
              "duration": "PT5H55M",
              "id": "3",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "LHR",
                "at": "2023-11-02T10:30:00"
              },
              "arrival": {
                "iataCode": "MAD",
                "at": "2023-11-02T13:00:00"
              },
              "carrierCode": "6X",
              "number": "9931",
              "aircraft": {
                "code": "320"
              },
              "operating": {
                "carrierCode": "6X"
              },
              "duration": "PT1H30M",
              "id": "4",
              "numberOfStops": 0,
              "blacklistedInEU": false
            }
          ]
        }
      ],
      "price": {
        "currency": "USD",
        "total": "342.20",
        "base": "294.00",
        "fees": [
          {
            "amount": "0.00",
            "type": "SUPPLIER"
          },
          {
            "amount": "0.00",
            "type": "TICKETING"
          }
        ],
        "grandTotal": "342.20"
      },
      "pricingOptions": {
        "fareType": [
          "PUBLISHED"
        ],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": [
        "6X"
      ],
      "travelerPricings": [
        {
          "travelerId": "1",
          "fareOption": "STANDARD",
          "travelerType": "ADULT",
          "price": {
            "currency": "USD",
            "total": "342.20",
            "base": "294.00"
          },
          "fareDetailsBySegment": [
            {
              "segmentId": "3",
              "cabin": "BUSINESS",
              "fareBasis": "J6XQSMIX",
              "class": "J",
              "includedCheckedBags": {
                "quantity": 8
              }
            },
            {
              "segmentId": "4",
              "cabin": "BUSINESS",
              "fareBasis": "J6XQSMIX",
              "class": "J",
              "includedCheckedBags": {
                "quantity": 8
              }
            }
          ]
        }
      ]
    },
    {
      "type": "flight-offer",
      "id": "2",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": false,
      "lastTicketingDate": "2023-11-01",
      "numberOfBookableSeats": 9,
      "itineraries": [
        {
          "duration": "PT11H",
          "segments": [
            {
              "departure": {
                "iataCode": "JFK",
                "at": "2023-11-01T20:00:00"
              },
              "arrival": {
                "iataCode": "LHR",
                "at": "2023-11-02T08:05:00"
              },
              "carrierCode": "6X",
              "number": "172",
              "aircraft": {
                "code": "744"
              },
              "operating": {
                "carrierCode": "6X"
              },
              "duration": "PT7H5M",
              "id": "1",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "LHR",
                "at": "2023-11-02T10:30:00"
              },
              "arrival": {
                "iataCode": "MAD",
                "at": "2023-11-02T13:00:00"
              },
              "carrierCode": "6X",
              "number": "9931",
              "aircraft": {
                "code": "320"
              },
              "operating": {
                "carrierCode": "6X"
              },
              "duration": "PT1H30M",
              "id": "2",
              "numberOfStops": 0,
              "blacklistedInEU": false
            }
          ]
        }
      ],
      "price": {
        "currency": "USD",
        "total": "342.20",
        "base": "294.00",
        "fees": [
          {
            "amount": "0.00",
            "type": "SUPPLIER"
          },
          {
            "amount": "0.00",
            "type": "TICKETING"
          }
        ],
        "grandTotal": "342.20"
      },
      "pricingOptions": {
        "fareType": [
          "PUBLISHED"
        ],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": [
        "6X"
      ],
      "travelerPricings": [
        {
          "travelerId": "1",
          "fareOption": "STANDARD",
          "travelerType": "ADULT",
          "price": {
            "currency": "USD",
            "total": "342.20",
            "base": "294.00"
          },
          "fareDetailsBySegment": [
            {
              "segmentId": "1",
              "cabin": "BUSINESS",
              "fareBasis": "J6XQSMIX",
              "class": "J",
              "includedCheckedBags": {
                "quantity": 8
              }
            },
            {
              "segmentId": "2",
              "cabin": "BUSINESS",
              "fareBasis": "J6XQSMIX",
              "class": "J",
              "includedCheckedBags": {
                "quantity": 8
              }
            }
          ]
        }
      ]
    }
  ],
  "dictionaries": {
    "locations": {
      "EWR": {
        "cityCode": "NYC",
        "countryCode": "US"
      },
      "MAD": {
        "cityCode": "MAD",
        "countryCode": "ES"
      },
      "LHR": {
        "cityCode": "LON",
        "countryCode": "GB"
      },
      "JFK": {
        "cityCode": "NYC",
        "countryCode": "US"
      }
    },
    "aircraft": {
      "320": "AIRBUS A320",
      "744": "BOEING 747-400",
      "777": "BOEING 777-200/300"
    },
    "currencies": {
      "USD": "US DOLLAR"
    },
    "carriers": {
      "6X": "AMADEUS SIX"
    }
  }
}
```

### Get Tourist's booked flights

#### Request
```bash
GET /flight/getFlight/:id
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| id         | String | **Required.** Id of the tourist. |


#### Response
```json
{
  [
    Flight 1 Document,
    Flight 2 Document,
    ...
  ]
}
```
### Confirm Flight's Price before booking

#### Request
```bash
PUT /flight/confirmFlight
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| flight     | JSON   | **Required.** The information about the flight that was returned as a JSON object in find flights. |

#### Response
```json
{
  "data": {
    "type": "flight-offers-pricing",
    "flightOffers": [
      {
        "type": "flight-offer",
        "id": "1",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "lastTicketingDate": "2020-03-01",
        "itineraries": [
          {
            "segments": [
              {
                "departure": {
                  "iataCode": "GIG",
                  "at": "2020-03-01T23:30:00"
                },
                "arrival": {
                  "iataCode": "CMN",
                  "terminal": "2",
                  "at": "2020-03-02T12:10:00"
                },
                "carrierCode": "AT",
                "number": "212",
                "aircraft": {
                  "code": "788"
                },
                "operating": {
                  "carrierCode": "AT"
                },
                "id": "3",
                "numberOfStops": 0,
                "duration": "PT8H40M"
              },
              {
                "departure": {
                  "iataCode": "CMN",
                  "terminal": "2",
                  "at": "2020-03-02T15:45:00"
                },
                "arrival": {
                  "iataCode": "MAD",
                  "at": "2020-03-02T17:40:00",
                  "terminal": "4S"
                },
                "carrierCode": "AT",
                "number": "970",
                "aircraft": {
                  "code": "73G"
                },
                "operating": {
                  "carrierCode": "AT"
                },
                "id": "4",
                "numberOfStops": 0,
                "duration": "PT1H55M"
              }
            ]
          },
          {
            "segments": [
              {
                "departure": {
                  "iataCode": "MAD",
                  "terminal": "4S",
                  "at": "2020-03-05T18:40:00"
                },
                "arrival": {
                  "iataCode": "CMN",
                  "at": "2020-03-05T20:30:00",
                  "terminal": "2"
                },
                "carrierCode": "AT",
                "number": "971",
                "aircraft": {
                  "code": "738"
                },
                "operating": {
                  "carrierCode": "AT"
                },
                "id": "47",
                "numberOfStops": 0,
                "duration": "PT1H50M"
              },
              {
                "departure": {
                  "iataCode": "CMN",
                  "at": "2020-03-06T16:40:00",
                  "terminal": "2"
                },
                "arrival": {
                  "iataCode": "GIG",
                  "at": "2020-03-06T22:00:00"
                },
                "carrierCode": "AT",
                "number": "213",
                "aircraft": {
                  "code": "788"
                },
                "operating": {
                  "carrierCode": "AT"
                },
                "id": "48",
                "numberOfStops": 0,
                "duration": "PT9H20M"
              }
            ]
          }
        ],
        "price": {
          "currency": "USD",
          "total": "2778.98",
          "base": "2568.00",
          "fees": [
            {
              "amount": "0.00",
              "type": "SUPPLIER"
            },
            {
              "amount": "0.00",
              "type": "TICKETING"
            },
            {
              "amount": "0.00",
              "type": "FORM_OF_PAYMENT"
            }
          ],
          "grandTotal": "2778.98",
          "billingCurrency": "USD"
        },
        "pricingOptions": {
          "fareType": [
            "PUBLISHED"
          ],
          "includedCheckedBagsOnly": true
        },
        "validatingAirlineCodes": [
          "AT"
        ],
        "travelerPricings": [
          {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
              "currency": "USD",
              "total": "1625.49",
              "base": "1520.00",
              "taxes": [
                {
                  "amount": "31.99",
                  "code": "BR"
                },
                {
                  "amount": "24.27",
                  "code": "JD"
                },
                {
                  "amount": "44.59",
                  "code": "MA"
                },
                {
                  "amount": "0.69",
                  "code": "OG"
                },
                {
                  "amount": "3.95",
                  "code": "QV"
                }
              ]
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "3",
                "cabin": "BUSINESS",
                "fareBasis": "DA0R0BRA",
                "class": "D",
                "includedCheckedBags": {
                  "quantity": 3
                }
              },
              {
                "segmentId": "4",
                "cabin": "BUSINESS",
                "fareBasis": "DA0R0BRA",
                "class": "D",
                "includedCheckedBags": {
                  "quantity": 3
                }
              },
              {
                "segmentId": "47",
                "cabin": "ECONOMY",
                "fareBasis": "XL0R0BRA",
                "class": "X",
                "includedCheckedBags": {
                  "quantity": 2
                }
              },
              {
                "segmentId": "48",
                "cabin": "ECONOMY",
                "fareBasis": "XL0R0BRA",
                "class": "X",
                "includedCheckedBags": {
                  "quantity": 2
                }
              }
            ]
          },
          {
            "travelerId": "2",
            "fareOption": "STANDARD",
            "travelerType": "CHILD",
            "price": {
              "currency": "USD",
              "total": "1153.49",
              "base": "1048.00",
              "taxes": [
                {
                  "amount": "31.99",
                  "code": "BR"
                },
                {
                  "amount": "24.27",
                  "code": "JD"
                },
                {
                  "amount": "44.59",
                  "code": "MA"
                },
                {
                  "amount": "0.69",
                  "code": "OG"
                },
                {
                  "amount": "3.95",
                  "code": "QV"
                }
              ]
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "3",
                "cabin": "BUSINESS",
                "fareBasis": "DA0R0BRACH",
                "class": "D",
                "includedCheckedBags": {
                  "quantity": 3
                }
              },
              {
                "segmentId": "4",
                "cabin": "BUSINESS",
                "fareBasis": "DA0R0BRACH",
                "class": "D",
                "includedCheckedBags": {
                  "quantity": 3
                }
              },
              {
                "segmentId": "47",
                "cabin": "ECONOMY",
                "fareBasis": "XL0R0BRACH",
                "class": "X",
                "includedCheckedBags": {
                  "quantity": 2
                }
              },
              {
                "segmentId": "48",
                "cabin": "ECONOMY",
                "fareBasis": "XL0R0BRACH",
                "class": "X",
                "includedCheckedBags": {
                  "quantity": 2
                }
              }
            ]
          }
        ],
        "paymentCardRequired": false
      }
    ]
  },
  "dictionaries": {
    "locations": {
      "MAD": {
        "cityCode": "MAD",
        "countryCode": "ES"
      },
      "GIG": {
        "cityCode": "RIO",
        "countryCode": "BR"
      },
      "CMN": {
        "cityCode": "CAS",
        "countryCode": "MA"
      }
    }
  }
}
```

### Book a flight

#### Request
```bash
PUT /flight/bookFlight
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| travelerID | String | **Required.** Id of the tourist. |
| flight     | JSON   | **Required.** The information about the flight that was returned as a JSON object in find flights. |
| travelers     | JSON   | **Required.** Extra Tourist Information needed for booking which include the following: |
| dateOfBirth | Date | **Required.** |
| firstName | String | **Required.** |
| lastName | String | **Required.** |
| gender | String | **Required.**  |
| email | String | **Required.**  |
| countryCallingCode | Number | **Required.**  |
| phoneNumber | Number | **Required.**  |
| birthPlace | String | **Required.** City of Birth. |
| passportIssuanceLocation | String | **Required.** Country where the passport was issued. |
| passportIssuanceDate | Date | **Required.**  |
| passportNumber | String | **Required.**  |
| passportExpiryDate | Date | **Required.**  |
| passportIssuanceCountry | String | **Required.** |
| nationality | String | **Required.** |

#### Response
```json
{
  "data": {
    "type": "flight-order",
    "id": "MlpZVkFMfFdBVFNPTnwyMDE1LTExLTAy",
    "queuingOfficeId": "NCE1A0950",
    "associatedRecords": [
      {
        "reference": "2ZYVAL",
        "creationDateTime": "2018-07-13T20:17:00",
        "originSystemCode": "1A",
        "flightOfferId": "1"
      }
    ],
    "travelers": [
      {
        "id": "1",
        "dateOfBirth": "1982-01-16",
        "name": {
          "firstName": "STEPHANE",
          "lastName": "MARTIN"
        },
        "contact": {
          "phones": [
            {
              "countryCallingCode": "33",
              "number": "487692704"
            }
          ]
        },
        "documents": [
          {
            "documentType": "PASSPORT",
            "number": "012345678",
            "expiryDate": "2009-04-14",
            "issuanceCountry": "GB",
            "nationality": "GB",
            "holder": true
          }
        ]
      },
      {
        "id": "3",
        "dateOfBirth": "2018-03-24",
        "name": {
          "firstName": "JULES",
          "lastName": "MARTIN"
        }
      },
      {
        "id": "2",
        "dateOfBirth": "2007-10-11",
        "name": {
          "firstName": "EMILIE",
          "lastName": "MARTIN"
        }
      }
    ],
    "flightOffers": [
      {
        "id": "1",
        "type": "flight-offer",
        "source": "GDS",
        "itineraries": [
          {
            "duration": "PT2H",
            "segments": [
              {
                "id": "1",
                "duration": "PT2H",
                "aircraft": {
                  "code": "320"
                },
                "numberOfStops": 0,
                "blacklistedInEU": false,
                "carrierCode": "IB",
                "operating": {
                  "carrierCode": "IB"
                },
                "number": "3403",
                "departure": {
                  "at": "2018-09-22T10:15:00",
                  "terminal": "W",
                  "iataCode": "ORY"
                },
                "arrival": {
                  "at": "2018-09-22T12:15:00",
                  "terminal": "4",
                  "iataCode": "MAD"
                },
                "co2Emissions": [
                  {
                    "weight": "100",
                    "weightUnit": "KG",
                    "cabin": "ECONOMY"
                  }
                ]
              }
            ]
          },
          {
            "duration": "PT1H20M",
            "segments": [
              {
                "id": "20",
                "duration": "PT1H20M",
                "aircraft": {
                  "code": "320"
                },
                "numberOfStops": 0,
                "blacklistedInEU": false,
                "carrierCode": "IB",
                "operating": {
                  "carrierCode": "IB"
                },
                "number": "3118",
                "departure": {
                  "at": "2018-09-26T23:05:00",
                  "terminal": "4",
                  "iataCode": "MAD"
                },
                "arrival": {
                  "at": "2018-09-26T23:25:00",
                  "terminal": "1",
                  "iataCode": "LIS"
                },
                "co2Emissions": [
                  {
                    "weight": "100",
                    "weightUnit": "KG",
                    "cabin": "ECONOMY"
                  }
                ]
              }
            ]
          },
          {
            "duration": "PT4H30M",
            "segments": [
              {
                "id": "30",
                "duration": "PT2H",
                "aircraft": {
                  "code": "320"
                },
                "numberOfStops": 0,
                "blacklistedInEU": false,
                "carrierCode": "IB",
                "operating": {
                  "carrierCode": "IB"
                },
                "number": "3109",
                "departure": {
                  "at": "2018-10-04T12:35:00",
                  "terminal": "1",
                  "iataCode": "LIS"
                },
                "arrival": {
                  "at": "2018-10-04T14:55:00",
                  "terminal": "4",
                  "iataCode": "MAD"
                },
                "co2Emissions": [
                  {
                    "weight": "100",
                    "weightUnit": "KG",
                    "cabin": "ECONOMY"
                  }
                ]
              },
              {
                "id": "31",
                "duration": "PT2H30M",
                "aircraft": {
                  "code": "320"
                },
                "numberOfStops": 0,
                "blacklistedInEU": false,
                "carrierCode": "IB",
                "operating": {
                  "carrierCode": "IB"
                },
                "number": "3444",
                "departure": {
                  "at": "2018-10-04T16:05:00",
                  "terminal": "4",
                  "iataCode": "MAD"
                },
                "arrival": {
                  "at": "2018-10-04T18:05:00",
                  "terminal": "W",
                  "iataCode": "ORY"
                },
                "co2Emissions": [
                  {
                    "weight": "100",
                    "weightUnit": "KG",
                    "cabin": "ECONOMY"
                  }
                ]
              }
            ]
          }
        ],
        "price": {
          "grandTotal": "689.21",
          "total": "423.21",
          "base": "242.00",
          "currency": "EUR",
          "billingCurrency": "EUR",
          "fees": [
            {
              "type": "SUPPLIER",
              "amount": "0"
            },
            {
              "type": "FORM_OF_PAYMENT",
              "amount": "6"
            },
            {
              "type": "TICKETING",
              "amount": "0"
            }
          ],
          "additionalServices": [
            {
              "type": "CHECKED_BAGS",
              "amount": "100"
            },
            {
              "type": "SEATS",
              "amount": "166"
            }
          ]
        },
        "pricingOptions": {
          "fareType": [
            "PUBLISHED"
          ],
          "includedCheckedBags": false
        },
        "validatingAirlineCodes": [
          "IB"
        ],
        "travelerPricings": [
          {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
              "currency": "EUR",
              "total": "200.94",
              "base": "126",
              "taxes": [
                {
                  "code": "YQ",
                  "amount": "0.94"
                },
                {
                  "code": "CJ",
                  "amount": "41.67"
                },
                {
                  "code": "FR",
                  "amount": "31.33"
                }
              ]
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "1",
                "cabin": "ECONOMY",
                "fareBasis": "ANNNNF4K",
                "brandedFare": "LIGHTONE",
                "class": "A",
                "isAllotment": true,
                "allotmentDetails": {
                  "tourName": "tour",
                  "tourReference": "ref"
                },
                "sliceDiceIndicator": "ABCDEF",
                "includedCheckedBags": {
                  "quantity": 0
                }
              },
              {
                "segmentId": "20",
                "cabin": "ECONOMY",
                "fareBasis": "ANNNNF4K",
                "brandedFare": "LIGHTONE",
                "class": "A",
                "isAllotment": true,
                "allotmentDetails": {
                  "tourName": "tour",
                  "tourReference": "ref"
                },
                "sliceDiceIndicator": "ABCDEF",
                "includedCheckedBags": {
                  "quantity": 0
                }
              },
              {
                "segmentId": "30",
                "cabin": "ECONOMY",
                "fareBasis": "ANNNNF4K",
                "brandedFare": "LIGHTONE",
                "class": "A",
                "isAllotment": true,
                "allotmentDetails": {
                  "tourName": "tour",
                  "tourReference": "ref"
                },
                "sliceDiceIndicator": "ABCDEF",
                "includedCheckedBags": {
                  "quantity": 0
                }
              },
              {
                "segmentId": "31",
                "cabin": "ECONOMY",
                "fareBasis": "ANNNNF4K",
                "brandedFare": "LIGHTONE",
                "class": "A",
                "isAllotment": true,
                "allotmentDetails": {
                  "tourName": "tour",
                  "tourReference": "ref"
                },
                "sliceDiceIndicator": "ABCDEF",
                "includedCheckedBags": {
                  "quantity": 0
                }
              }
            ]
          },
          {
            "travelerId": "2",
            "fareOption": "STANDARD",
            "travelerType": "CHILD",
            "price": {
              "currency": "EUR",
              "total": "180.94",
              "base": "106",
              "taxes": [
                {
                  "code": "YQ",
                  "amount": "0.94"
                },
                {
                  "code": "CJ",
                  "amount": "41.67"
                },
                {
                  "code": "FR",
                  "amount": "31.33"
                }
              ]
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "1",
                "cabin": "ECONOMY",
                "fareBasis": "ANNNNF4K",
                "brandedFare": "LIGHTONE",
                "class": "A",
                "isAllotment": true,
                "allotmentDetails": {
                  "tourName": "tour",
                  "tourReference": "ref"
                },
                "sliceDiceIndicator": "ABCDEF",
                "includedCheckedBags": {
                  "quantity": 0
                },
                "additionalServices": {
                  "chargeableCheckedBags": {
                    "quantity": 1,
                    "weight": 20
                  },
                  "chargeableSeatNumber": "33D"
                }
              },
              {
                "segmentId": "20",
                "cabin": "ECONOMY",
                "fareBasis": "ANNNNF4K",
                "brandedFare": "LIGHTONE",
                "class": "A",
                "isAllotment": true,
                "allotmentDetails": {
                  "tourName": "tour",
                  "tourReference": "ref"
                },
                "sliceDiceIndicator": "ABCDEF",
                "includedCheckedBags": {
                  "quantity": 0
                },
                "additionalServices": {
                  "chargeableCheckedBags": {
                    "quantity": 1,
                    "weight": 20
                  },
                  "chargeableSeatNumber": "28A"
                }
              },
              {
                "segmentId": "30",
                "cabin": "ECONOMY",
                "fareBasis": "ANNNNF4K",
                "brandedFare": "LIGHTONE",
                "class": "A",
                "isAllotment": true,
                "allotmentDetails": {
                  "tourName": "tour",
                  "tourReference": "ref"
                },
                "sliceDiceIndicator": "ABCDEF",
                "includedCheckedBags": {
                  "quantity": 0
                },
                "additionalServices": {
                  "chargeableCheckedBags": {
                    "quantity": 1,
                    "weight": 20
                  },
                  "chargeableSeatNumber": "12C"
                }
              },
              {
                "segmentId": "31",
                "cabin": "ECONOMY",
                "fareBasis": "ANNNNF4K",
                "brandedFare": "LIGHTONE",
                "class": "A",
                "isAllotment": true,
                "allotmentDetails": {
                  "tourName": "tour",
                  "tourReference": "ref"
                },
                "sliceDiceIndicator": "ABCDEF",
                "includedCheckedBags": {
                  "quantity": 0
                },
                "additionalServices": {
                  "chargeableCheckedBags": {
                    "quantity": 1,
                    "weight": 20
                  },
                  "chargeableSeatNumber": "33D"
                }
              }
            ]
          },
          {
            "travelerId": "3",
            "fareOption": "STANDARD",
            "travelerType": "HELD_INFANT",
            "associatedAdultId": "1",
            "price": {
              "currency": "EUR",
              "total": "41.33",
              "base": "10",
              "taxes": [
                {
                  "code": "FR",
                  "amount": "31.33"
                }
              ]
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "1",
                "cabin": "ECONOMY",
                "fareBasis": "ANNNNF4K",
                "brandedFare": "LIGHTONE",
                "class": "A",
                "isAllotment": true,
                "allotmentDetails": {
                  "tourName": "tour",
                  "tourReference": "ref"
                },
                "sliceDiceIndicator": "ABCDEF",
                "includedCheckedBags": {
                  "quantity": 0
                }
              },
              {
                "segmentId": "20",
                "cabin": "ECONOMY",
                "fareBasis": "ANNNNF4K",
                "brandedFare": "LIGHTONE",
                "class": "A",
                "isAllotment": true,
                "allotmentDetails": {
                  "tourName": "tour",
                  "tourReference": "ref"
                },
                "sliceDiceIndicator": "ABCDEF",
                "includedCheckedBags": {
                  "quantity": 0
                }
              },
              {
                "segmentId": "30",
                "cabin": "ECONOMY",
                "fareBasis": "ANNNNF4K",
                "brandedFare": "LIGHTONE",
                "class": "A",
                "isAllotment": true,
                "allotmentDetails": {
                  "tourName": "tour",
                  "tourReference": "ref"
                },
                "sliceDiceIndicator": "ABCDEF",
                "includedCheckedBags": {
                  "quantity": 0
                }
              },
              {
                "segmentId": "31",
                "cabin": "ECONOMY",
                "fareBasis": "ANNNNF4K",
                "brandedFare": "LIGHTONE",
                "class": "A",
                "isAllotment": true,
                "allotmentDetails": {
                  "tourName": "tour",
                  "tourReference": "ref"
                },
                "sliceDiceIndicator": "ABCDEF",
                "includedCheckedBags": {
                  "quantity": 0
                }
              }
            ]
          }
        ]
      }
    ],
    "ticketingAggreement": {
      "option": "DELAY_TO_CANCEL",
      "dateTime": "2018-08-21T10:15:00.000"
    },
    "contacts": [
      {
        "companyName": "AMADEUS",
        "purpose": "STANDARD",
        "phones": [
          {
            "deviceType": "FAX",
            "countryCallingCode": "33",
            "number": "480080070"
          },
          {
            "deviceType": "LANDLINE",
            "countryCallingCode": "33",
            "number": "480080070"
          }
        ],
        "emailAddress": "support@mail.com",
        "address": {
          "lines": [
            "485 route du Pin Montard"
          ],
          "postalCode": "06902",
          "cityName": "Sophia Antipolis Cedex",
          "countryCode": "FR"
        }
      }
    ]
  },
  "dictionaries": {
    "locations": {
      "CDG": {
        "cityCode": "PAR",
        "countryCode": "FR"
      },
      "ORY": {
        "cityCode": "PAR",
        "countryCode": "FR"
      },
      "MAD": {
        "cityCode": "MAD",
        "countryCode": "ES"
      }
    }
  }
}
```
## Hotel Routes
### Find Hotel by City

#### Request
```bash
GET /hotel/by-city
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| cityCode         | String | **Required.**  |
| radius    | Number | **Required.** Represents the radius (in kilometers) around the cityCode to search for hotels. |

#### Response
```json
{
  "data": [
    {
      "chainCode": "ZZ",
      "iataCode": "NCE",
      "dupeId": 504813011,
      "name": "HOTEL 3",
      "hotelId": "ZZNCENVX",
      "geoCode": {
        "latitude": 43.66665,
        "longitude": 7.21465
      },
      "address": {
        "countryCode": "FR"
      },
      "distance": {
        "value": 0.92,
        "unit": "KM"
      }
    },
    {
      "chainCode": "NN",
      "iataCode": "NCE",
      "dupeId": 700091936,
      "name": "CAMPANILE NICE - A?ROPORT",
      "hotelId": "NNNCE357",
      "geoCode": {
        "latitude": 43.66686,
        "longitude": 7.21397
      },
      "address": {
        "countryCode": "FR"
      },
      "distance": {
        "value": 0.96,
        "unit": "KM"
      }
    }
  ],
  "meta": {
    "count": 2,
    "links": {
      "self": "http://test.api.amadeus.com/reference-data/locations/hotels/by-city?cityCode=NCE&radius=1"
    }
  }
}
```

### Find Hotel by Geographical Code

#### Request
```bash
GET /hotel/by-geocode
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| latitude         | Number | **Required.**  |
| longitude         | Number | **Required.**  |
| radius    | Number | **Required.** Represents the radius (in kilometers) around the cityCode to search for hotels. ||

```json
{
  "data": [
    {
      "chainCode": "OI",
      "iataCode": "SXD",
      "dupeId": 700118746,
      "name": "HOTEL OMEGA - VALBONNE",
      "hotelId": "OISXD968",
      "geoCode": {
        "latitude": 43.61428,
        "longitude": 7.05464
      },
      "address": {
        "countryCode": "FR"
      },
      "distance": {
        "value": 0.73,
        "unit": "KM"
      }
    },
    {
      "chainCode": "DH",
      "iataCode": "SCR",
      "dupeId": 505001770,
      "name": "CHECK SINGLE CIF DHSCRMS8",
      "hotelId": "DHSCRMS8",
      "geoCode": {
        "latitude": 43.62215,
        "longitude": 7.04024
      },
      "distance": {
        "value": 0.82,
        "unit": "KM"
      }
    },
    {
      "chainCode": "DH",
      "iataCode": "VLI",
      "dupeId": 504621595,
      "name": "CHECK SINGLE CIF DHVLIMS8",
      "hotelId": "DHVLIMS8",
      "geoCode": {
        "latitude": 43.62215,
        "longitude": 7.04024
      },
      "distance": {
        "value": 0.82,
        "unit": "KM"
      }
    },
    {
      "chainCode": "DH",
      "iataCode": "AET",
      "dupeId": 504621441,
      "name": "CHECK SINGLE CIF DHAETMS8",
      "hotelId": "DHAETMS8",
      "geoCode": {
        "latitude": 43.62215,
        "longitude": 7.04024
      },
      "address": {
        "countryCode": "US"
      },
      "distance": {
        "value": 0.82,
        "unit": "KM"
      }
    },
    {
      "chainCode": "DH",
      "iataCode": "NYC",
      "dupeId": 504621445,
      "name": "CHECK SINGLE CIF DHNYCMS8",
      "hotelId": "DHNYCMS8",
      "geoCode": {
        "latitude": 43.62215,
        "longitude": 7.04024
      },
      "address": {
        "countryCode": "US"
      },
      "distance": {
        "value": 0.82,
        "unit": "KM"
      }
    }
  ],
  "meta": {
    "count": 5,
    "links": {
      "self": "http://test.api.amadeus.com/reference-data/locations/hotels/by-geocode?latitude=43.61999752&longitude=7.0499998&radius=1"
    }
  }
}
```

### Find Hotel by id

#### Request
```bash
GET /hotel/:hotelId/offers
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| hotelId         | String | **Required.** |

#### Response
```json
{
  "data": {
    "type": "hotel-offers",
    "hotel": {
      "type": "hotel",
      "hotelId": "MCLONGHM",
      "chainCode": "MC",
      "name": "JW MARRIOTT GROSVENOR HOUSE",
      "cityCode": "LON",
      "address": {
        "countryCode": "GB"
      },
      "amenities": [
        "CRIBS_AVAILABLE"
      ]
    },
    "available": true,
    "offers": [
      {
        "id": "TSXOJ6LFQ2",
        "checkInDate": "2023-11-22",
        "checkOutDate": "2023-11-23",
        "rateCode": "V  ",
        "rateFamilyEstimated": {
          "code": "PRO",
          "type": "P"
        },
        "description": {
          "text": "Executive King Room, Executive Lounge Access, 1 King, 35sqm/377sqft-40sqm/430sqft, Wireless in ternet, for a fee, Wired internet, for a fee, C A credit card is required for payment to guarantee the Prepay Non-refundable Non-changeable rate. Prepay rates will be charged the full cost of the reservation within 24 hours of making the reservation. If payment is unsuccessful within 48 hours of making the reservation, the hotel reserves the right to cancel the reservation. Date changes to the reservation are not allowed. Cancellation will result in forfeiture of the prepayment. The credit card used at the time of making the reservation must be valid for the entire stay.",
          "lang": "EN"
        },
        "room": {
          "type": "ELE",
          "typeEstimated": {
            "beds": 1,
            "bedType": "DOUBLE"
          },
          "description": {
            "text": "Prepay Non-refundable Non-changeable, prepay in full",
            "lang": "EN"
          }
        },
        "guests": {
          "adults": 1
        },
        "price": {
          "currency": "GBP",
          "base": "716.00",
          "total": "716.00",
          "variations": {
            "changes": [
              {
                "startDate": "2023-11-22",
                "endDate": "2023-11-23",
                "base": "716.00"
              }
            ]
          }
        },
        "policies": {
          "paymentType": "deposit",
          "cancellation": {
            "description": {
              "text": "NON-REFUNDABLE RATE"
            },
            "type": "FULL_STAY"
          }
        }
      }
    ]
  },
  "meta": {
    "lang": "EN"
  }
}
```

### Book Hotel

#### Request
```bash
GET /hotel/book
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| bookingValues         | JSON | **Required.** The hotel booking offer. |
| bookingId    | String | **Required.** Hotel Offer Id. |
| travelerId           | String | **Required.** |

#### Response
```json
{
  "data": {
    "type": "hotel-order",
    "id": "V0g2VFJaLzIwMjQtMDYtMDc=",
    "hotelBookings": [
      {
        "type": "hotel-booking",
        "id": "MS84OTkyMjcxMC85MDIyNDU0OQ==",
        "bookingStatus": "CONFIRMED",
        "hotelProviderInformation": [
          {
            "hotelProviderCode": "AR",
            "confirmationNumber": "89922710"
          }
        ],
        "roomAssociations": [
          {
            "hotelOfferId": "******",
            "guestReferences": [
              {
                "guestReference": "1"
              }
            ]
          }
        ],
        "hotelOffer": {
          "id": "******",
          "type": "hotel-offer",
          "category": "TYPE_CONDITIONAL",
          "checkInDate": "2024-06-07",
          "checkOutDate": "2024-06-08",
          "guests": {
            "adults": 1
          },
          "policies": {
            "cancellations": [
              {
                "amount": "215.05",
                "deadline": "2024-06-06T23:59:00+02:00"
              }
            ],
            "paymentType": "GUARANTEE"
          },
          "price": {
            "base": "195.50",
            "currency": "EUR",
            "sellingTotal": "215.05",
            "taxes": [
              {
                "amount": "19.55",
                "code": "VALUE_ADDED_TAX",
                "currency": "EUR",
                "included": false,
                "pricingFrequency": "PER_STAY",
                "pricingMode": "PER_PRODUCT"
              }
            ],
            "total": "215.05",
            "variations": {
              "changes": [
                {
                  "endDate": "2024-06-08",
                  "startDate": "2024-06-07",
                  "base": "195.50",
                  "currency": "EUR"
                }
              ]
            }
          },
          "rateCode": "S9R",
          "room": {
            "description": {
              "lang": "EN",
              "text": "Marriott Senior Discount, includes"
            },
            "type": "XMI"
          },
          "roomQuantity": 1
        },
        "hotel": {
          "hotelId": "ARMADAIT",
          "chainCode": "AR",
          "name": "AC BY MARRIOTT HOTEL AITANA",
          "self": "https://test.travel.api.amadeus.com/v1/reference-data/locations/by-hotel/ARMADAIT"
        },
        "payment": {
          "method": "CREDIT_CARD",
          "paymentCard": {
            "paymentCardInfo": {
              "vendorCode": "VI",
              "cardNumber": "415128XXXXXX1370",
              "expiryDate": "0826",
              "holderName": "BOB SMITH"
            }
          }
        },
        "travelAgentId": "00000000"
      }
    ],
    "guests": [
      {
        "tid": 1,
        "id": 1,
        "title": "MR",
        "firstName": "BOB",
        "lastName": "SMITH",
        "phone": "+33679278416",
        "email": "bob.smith@email.com"
      }
    ],
    "associatedRecords": [
      {
        "reference": "WH6TRZ",
        "originSystemCode": "GDS"
      }
    ],
    "self": "http://test.api.amadeus.com/v2/booking/hotel-orders/V0g2VFJaLzIwMjQtMDYtMDc="
  }
}
```

## Itinerary Routes


## Product Routes


## Promo Code Routes
### Create Promo Code 

#### Request
```bash
POST /PromoCode/
```

| Parameter  | Type   | Description                                             |
|------------|--------|---------------------------------------------------------|
| promocode  | String | **Required.** The promocode name passed in the request body.|
| discount   | Number | **Required.** The discount associates with the promo code.  |

#### Response
```json
{
  "message": "Promo Code and Stripe coupon created successfully!",
  Promocode Document
}
```

### Use Promo Code

#### Request
```bash
PUT /PromoCode/:id
```

| Parameter  | Type   | Description                                             |
|------------|--------|-------------------------------------------------------- |
| id         | String | **Required.** Id of the tourist using the promo code.       |
| promocode  | String | **Required.** The promocode name passed in the request body.|

#### Response
```json
{
  "message": "Promo code applied.",
  "discount": 50,
  "stripeID": "3mdQ1apG"
}
``

## Sales Routes
- `GET /sale/my-product-sales/:creatorId`: Get product sales by creator ID
- `GET /sale/my-sales/:creatorId/:type`: Get sales by creator ID and type

## Seller Routes

## Site Routes

## Tag Routes

### Create a New Tag

#### Request
```bash
POST /tag/
```

| Parameter  | Type   | Description                                             |
|------------|--------|---------------------------------------------------------|
| name       | String | **Required**. Tag's name passed in the request body.                                 |

### Retrieve a Tag by ID

#### Request
```bash
GET /tag/:id
```

| Parameter  | Type   | Description                                             |
|------------|--------|---------------------------------------------------------|
| id         | String | **Required.**                                               |

### Retrieve all Tags

#### Request
```bash
GET /tag/
```

### Update a Tag

#### Request
```bash
PUT /tag/:id
```

| Parameter  | Type   | Description                                             |
|------------|--------|---------------------------------------------------------|
| id         | String | **Required.**                                               |
| name       | String | **Required.** Tag's name passed in the request body.                                 |

### Delete a Tag

#### Request
```bash
DELETE /tag/:id
```

| Parameter  | Type   | Description                                             |
|------------|--------|---------------------------------------------------------|
| id         | String | **Required.**                                               |

## Tour Guide Routes

## Tourist Governer Routes

## Tourist Routes

## Trip Routes

## User Routes

