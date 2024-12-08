# Sindbad API Refrences

For testing on postman, write the base link followed by the specified route

```bash
http://localhost:3000/addRouteHere
```

- [Activity Routes](#activity-routes)
- [Admin Routes](#admin-routes)
- [Advertiser Routes](#advertiser-routes)
- [Auth Routes](#auth-routes)
- [Category Routes](#category-routes)
- [Flight Routes](#flight-routes)
- [Hotel Routes](#hotel-routes)
- [Promo Code Routes](#promo-code-routes)
- [Tag Routes](#tag-routes)
- [Seller Routes](#seller-routes)
- [Product Routes](#product-routes)
- [Site Routes](#site-routes)
- [Trip Routes](#trip-routes)
- [Payment Routes](#payment-routes)
- [Complaint Routes](#complaint-routes)
- [Tourism Governor Routes](#tourismgovernor-routes)
- [Tour Guide Routes](#tour-guide-routes)
- [User Routes](#user-routes)
- [Tourist Routes](#tourist-routes)

## Activity Routes

### Create Activity

```bash
POST /activity/
```

#### Request

| Parameter     | Type     | Description                                              |
| ------------- | -------- | -------------------------------------------------------- |
| name          | String   | **Required.** Name of the activity.                      |
| dateTime      | DateTime | **Required.** Scheduled date and time for the activity.  |
| location      | Object   | **Required.** Location details as a JSON object.         |
| price         | Number   | **Required.** Price for the activity.                    |
| category      | String   | **Required.** Name of the category.                      |
| tags          | Array    | **Required.** Array of tag names.                        |
| discounts     | Array    | **Optional.** Array of discount objects.                 |
| isBookingOpen | Boolean  | **Required.** Indicates if booking is open (true/false). |
| headCount     | Number   | **Optional.** Maximum headcount for the activity.        |
| description   | String   | **Optional.** Description of the activity.               |
| cardImage     | File     | **Optional.** Card image file for the activity.          |

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

| Parameter     | Type     | Description                                               |
| ------------- | -------- | --------------------------------------------------------- |
| id            | String   | **Required.** The ID of the activity.                     |
| name          | String   | **Optional.** Updated activity name.                      |
| dateTime      | DateTime | **Optional.** Updated date and time for the activity.     |
| location      | Object   | **Optional.** Updated location details as a JSON object.  |
| price         | Number   | **Optional.** Updated price for the activity.             |
| category      | String   | **Optional.** Updated category for the activity.          |
| tags          | Array    | **Optional.** Updated array of tag names.                 |
| discounts     | Array    | **Optional.** Updated array of discount objects.          |
| isBookingOpen | Boolean  | **Optional.** Updated booking status (open or closed).    |
| headCount     | Number   | **Optional.** Updated maximum headcount for the activity. |
| description   | String   | **Optional.** Updated description of the activity.        |
| cardImage     | File     | **Optional.** Updated card image for the activity.        |

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

| Parameter | Type   | Description                                           |
| --------- | ------ | ----------------------------------------------------- |
| id        | String | **Required.** The ID of the activity to be retrieved. |

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

| Parameter       | Type    | Description                                                                                                           |
| --------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| id              | String  | **Required.** The ID of the activity.                                                                                 |
| isInappropriate | Boolean | **Required.** Indicates if the activity is flagged as inappropriate (true/false). This is passed in the request body. |

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

| Parameter | Type   | Description                                                            |
| --------- | ------ | ---------------------------------------------------------------------- |
| creatorId | String | **Required.** The ID of the user whose activities are to be retrieved. |

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

| Parameter  | Type   | Description                                                                                        |
| ---------- | ------ | -------------------------------------------------------------------------------------------------- |
| searchTerm | String | **Optional** term to search in activity names, tags, or categories to be passed in the query.      |
| budget     | Number | **Optional** for filtering activities by price to be passed in the query.                          |
| date.start | Date   | **Optional** start date for filtering activities to be passed in the query.                        |
| date.end   | Date   | **Optional** end date for filtering activities to be passed in the query.                          |
| category   | String | **Optional** category for filtering activities to be passed in the query.                          |
| minRating  | Number | **Optional** minimum average rating for filtering activities to be passed in the query.            |
| sortBy     | String | **Optional** field to sort by ("price", "averageRating", or "dateTime") to be passed in the query. |
| sortOrder  | String | **Optional** sort order ("asc" or "desc") to be passed in the query. Default is "asc"              |
| page       | Number | **Optional** page number for pagination to be passed in the query. Default is 1.                   |
| limit      | Number | **Optional** number of activities per page to be passed in the query. Default is 10.               |

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

| Parameter | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| id        | String | **Required.** The ID of the activity to delete. |

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

| Parameter | Type   | Description                                             |
| --------- | ------ | ------------------------------------------------------- |
| id        | String | **Required.** The ID of the activity.                   |
| userId    | Number | **Required.** The user's id passed in the request body. |
| rating    | Number | **Required.** The rating passed in the request body.    |

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

| Parameter | Type   | Description                                             |
| --------- | ------ | ------------------------------------------------------- |
| id        | String | **Required.** The ID of the activity                    |
| userId    | Number | **Required.** The user's id passed in the request body. |
| comment   | Number | **Required.** The comment passed in the request body.   |

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

| Parameter  | Type   | Description                                                                       |
| ---------- | ------ | --------------------------------------------------------------------------------- |
| activityId | String | **Required.** The activity to be booked's Id passed in the request body.          |
| userId     | String | **Required.** The Id of the user booking the activity passed in the request body. |

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

| Parameter  | Type   | Description                                                                          |
| ---------- | ------ | ------------------------------------------------------------------------------------ |
| activityId | String | **Required.** The activity to be canceled's Id passed in the request body.           |
| userId     | String | **Required.** The Id of the user cancelling the activity passed in the request body. |

#### Response

```json
{
  "message": "Activity cancelled successfully"
}
```

## Admin Routes

### Get All Admins

#### Request

```bash
GET /admin/
```

| Parameter | Type   | Description                                                                               |
| --------- | ------ | ----------------------------------------------------------------------------------------- |
| email     | String | **Optional.** The admin to be fetched's email as a filter passed in the request query.    |
| username  | String | **Optional.** The admin to be fetched's username as a filter passed in the request query. |

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

| Parameter    | Type   | Description   |
| ------------ | ------ | ------------- |
| email        | String | **Required.** |
| username     | String | **Required.** |
| passwordHash | String | **Required.** |

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

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| id        | String | **Required.** The Admin to be fetched's id. |

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

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| id        | String | **Required.** The Admin to be deleted's id. |

#### Response

```json
{
  "message": "Admin deleted successfully!"
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

### Get All Advertisers

```bash
GET /advertiser/
```

#### Request

None

#### Response

```json
[
  Advertiser 1 Document,
  Advertiser 2 Document,
  ...
]
```

### Add advertiser documents

```bash
PUT /advertiser/upload/:id
```

#### Request

| Parameter                       | Type   | Description                                                         |
| ------------------------------- | ------ | ------------------------------------------------------------------- |
| id                              | String | **Required.** The advertiser's id                                   |
| files.idCardImage               | File   | **Required.** The national ID Card Image in the request files       |
| files.taxationRegistryCardImage | File   | **Required.** The taxation Registry Card Image in the request files |

#### Response

```json
{
  Updated Advertiser Document
}
```

### Get an Advertiser by Id

```bash
GET /advertiser/:id
```

#### Request

| Parameter | Type   | Description                                           |
| --------- | ------ | ----------------------------------------------------- |
| id        | String | **Required.** The id of the Advertiser to be fetched. |

#### Response

```json
{
  Advertiser Document
}
```

## Auth Routes

### Login

```bash
POST /auth/
```

#### Request

| Parameter | Type   | Description                                           |
| --------- | ------ | ----------------------------------------------------- |
| username  | String | **Required.** The user's username in the request body |
| password  | String | **Required.** The user's password in the request body |

#### Response

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "tourist",
  "id": "64b1f2f5e5b7cbe20c23a3c7"
}
```

### Refresh Access Token

```bash
GET /auth/refresh
```

#### Request

| Parameter | Type      | Description                                                   |
| --------- | --------- | ------------------------------------------------------------- |
| jwt       | jwt token | **Required.** The user's refresh token sent inside the cookie |

#### Response

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "tourist",
  "id": "64b1f2f5e5b7cbe20c23a3c7"
}
```

### Logout

```bash
POST /auth/logout
```

#### Request

| Parameter | Type      | Description                                                   |
| --------- | --------- | ------------------------------------------------------------- |
| jwt       | jwt token | **Optional.** The user's refresh token sent inside the cookie |

#### Response

None

### Get User Info

```bash
POST /auth/user
```

#### Request

| Parameter | Type      | Description                                                   |
| --------- | --------- | ------------------------------------------------------------- |
| jwt       | jwt token | **Required.** The user's refresh token sent inside the cookie |

#### Response

```json
{
  "id": "64b1f2f5e5b7cbe20c23a3c7",
  "username": "moskiUser",
  "role": "tourist",
  "preferredCurrency": "USD",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Category Routes

### Create Category

#### Request

```bash
POST /category/
```

| Parameter | Type   | Description                                              |
| --------- | ------ | -------------------------------------------------------- |
| name      | String | **Required.** Catergory's name to be passed in the body. |

### Retrieve Category by ID

#### Request

```bash
GET /category/:id
```

| Parameter | Type   | Description                                       |
| --------- | ------ | ------------------------------------------------- |
| id        | String | **Required.** Id of the category to be retrieved. |

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

| Parameter | Type   | Description                                              |
| --------- | ------ | -------------------------------------------------------- |
| id        | String | **Required.** Id of the category to be updated.          |
| name      | String | **Required.** Catergory's name to be passed in the body. |

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

| Parameter | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| id        | String | **Required.** Id of the category to be deleted. |

#### Response

```json
{
  "message": "Category deleted successfully!"
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

| Parameter   | Type   | Description                         |
| ----------- | ------ | ----------------------------------- |
| origin      | String | **Required.** origin Location.      |
| destination | String | **Required.** Destination Location. |
| date        | Date   | **Required.** Date of the Flight.   |
| adults      | Number | **Required.** Number of travelers.  |

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
        "fareType": ["PUBLISHED"],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": ["6X"],
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
        "fareType": ["PUBLISHED"],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": ["6X"],
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

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| id        | String | **Required.** Id of the tourist. |

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

| Parameter | Type | Description                                                                                        |
| --------- | ---- | -------------------------------------------------------------------------------------------------- |
| flight    | JSON | **Required.** The information about the flight that was returned as a JSON object in find flights. |

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
          "fareType": ["PUBLISHED"],
          "includedCheckedBagsOnly": true
        },
        "validatingAirlineCodes": ["AT"],
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

| Parameter                | Type   | Description                                                                                        |
| ------------------------ | ------ | -------------------------------------------------------------------------------------------------- |
| travelerID               | String | **Required.** Id of the tourist.                                                                   |
| flight                   | JSON   | **Required.** The information about the flight that was returned as a JSON object in find flights. |
| travelers                | JSON   | **Required.** Extra Tourist Information needed for booking which include the following:            |
| dateOfBirth              | Date   | **Required.**                                                                                      |
| firstName                | String | **Required.**                                                                                      |
| lastName                 | String | **Required.**                                                                                      |
| gender                   | String | **Required.**                                                                                      |
| email                    | String | **Required.**                                                                                      |
| countryCallingCode       | Number | **Required.**                                                                                      |
| phoneNumber              | Number | **Required.**                                                                                      |
| birthPlace               | String | **Required.** City of Birth.                                                                       |
| passportIssuanceLocation | String | **Required.** Country where the passport was issued.                                               |
| passportIssuanceDate     | Date   | **Required.**                                                                                      |
| passportNumber           | String | **Required.**                                                                                      |
| passportExpiryDate       | Date   | **Required.**                                                                                      |
| passportIssuanceCountry  | String | **Required.**                                                                                      |
| nationality              | String | **Required.**                                                                                      |

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
          "fareType": ["PUBLISHED"],
          "includedCheckedBags": false
        },
        "validatingAirlineCodes": ["IB"],
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
          "lines": ["485 route du Pin Montard"],
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

| Parameter | Type   | Description                                                                                   |
| --------- | ------ | --------------------------------------------------------------------------------------------- |
| cityCode  | String | **Required.**                                                                                 |
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

| Parameter | Type   | Description                                                                                   |
| --------- | ------ | --------------------------------------------------------------------------------------------- | --- |
| latitude  | Number | **Required.**                                                                                 |
| longitude | Number | **Required.**                                                                                 |
| radius    | Number | **Required.** Represents the radius (in kilometers) around the cityCode to search for hotels. |     |

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

| Parameter | Type   | Description   |
| --------- | ------ | ------------- |
| hotelId   | String | **Required.** |

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
      "amenities": ["CRIBS_AVAILABLE"]
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

| Parameter     | Type   | Description                            |
| ------------- | ------ | -------------------------------------- |
| bookingValues | JSON   | **Required.** The hotel booking offer. |
| bookingId     | String | **Required.** Hotel Offer Id.          |
| travelerId    | String | **Required.**                          |

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

### Get All Itineraries

```bash
GET /itinerary/
```

#### Request

| Parameter  | Type   | Description                                                                                                         |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| searchTerm | String | **Optional.** The search term used to filter results inside the request query inside the request query.             |
| budget     | Object | **Optional.** Contains budget-related filtering options (e.g., min, max) inside the request query.                  |
| date       | Object | **Optional.** Contains date-related filtering options (e.g., start date, end date) inside the request query.        |
| tag        | String | **Optional.** The tag used to filter results inside the request query.                                              |
| rating     | Object | **Optional.** Contains rating-related filtering options (e.g., min, max) inside the request query.                  |
| language   | String | **Optional.** The language preference for the results inside the request query.                                     |
| sortBy     | String | **Optional.** The field by which the results are sorted inside the request query. Default is "availableDatesTimes". |
| sortOrder  | String | **Optional.** The sorting order ("asc" or "desc") inside the request query. Default is "asc".                       |
| page       | Number | **Optional.** The page number for pagination inside the request query. Default is 1.                                |
| limit      | Number | **Optional.** The number of results per page inside the request query. Default is 10.                               |

#### Response

```json
[
  Itinerary 1 Document,
  Itinerary 2 Document,
  ...
]
```

### Book Itinerary

```bash
POST /itinerary/book
```

#### Request

| Parameter        | Type   | Description                                                                  |
| ---------------- | ------ | ---------------------------------------------------------------------------- |
| date             | String | **Required.** The date for the booking or event inside the request body.     |
| adultTicketCount | Number | **Required.** The number of adult tickets inside the request body.           |
| childTicketCount | Number | **Required.** The number of child tickets inside the request body.           |
| itineraryId      | String | **Required.** The ID of the itinerary inside the request body.               |
| userId           | String | **Required.** The ID of the user making the request inside the request body. |

#### Response

```json
{
  Booked Itinerary Document,
  "priceCharged" : 30
}
```

### Cancel Itinerary Booking

```bash
POST /itinerary/cancel
```

#### Request

| Parameter   | Type   | Description                                                                  |
| ----------- | ------ | ---------------------------------------------------------------------------- |
| date        | String | **Required.** The date for the booking or event inside the request body.     |
| itineraryId | String | **Required.** The ID of the itinerary inside the request body.               |
| userId      | String | **Required.** The ID of the user making the request inside the request body. |

#### Response

None

### Get my Itineraries

```bash
POST /itinerary/my-itineraries/:creatorId
```

#### Request

| Parameter | Type   | Description                                                              |
| --------- | ------ | ------------------------------------------------------------------------ |
| creatorId | String | **Required.** The creatorId of the tour guide inside the request params. |

#### Response

```json
[
  Itinerary 1 Document,
  Itinerary 2 Document,
  ...
]
```

### Comment on Itinerary

```bash
POST /itinerary/:id/comment
```

#### Request

| Parameter | Type   | Description                                                                    |
| --------- | ------ | ------------------------------------------------------------------------------ |
| id        | String | **Required.** The id of the itinerary to comment on inside the request params. |
| userId    | String | **Required.** The user id of the user inside the request body.                 |
| comment   | String | **Required.** The user's comment inside the request body.                      |

#### Response

```json
{
  Updated Itinerary Document
}
```

### Get Itinerary By ID

```bash
GET /itinerary/:id/
```

#### Request

| Parameter | Type   | Description                                                      |
| --------- | ------ | ---------------------------------------------------------------- |
| id        | String | **Required.** The id of the itinerary inside the request params. |

#### Response

```json
{
  Itinerary Document
}
```

### Delete Itinerary By ID

```bash
DELETE /itinerary/:id/
```

#### Request

| Parameter | Type   | Description                                                      |
| --------- | ------ | ---------------------------------------------------------------- |
| id        | String | **Required.** The id of the itinerary inside the request params. |

#### Response

```json
{
  Deleted Itinerary Document
}
```

### Add rating to Itinerary

```bash
POST /itinerary/:id/
```

#### Request

| Parameter | Type   | Description                                                      |
| --------- | ------ | ---------------------------------------------------------------- |
| id        | String | **Required.** The id of the itinerary inside the request params. |
| userId    | String | **Required.** The id of user inside the request body.            |
| rating    | number | **Required.** The rating inside the request body.                |

#### Response

```json
{
  Updated Itinerary Document
}
```

### Set Itinerary isAppropriate Status

```bash
PATCH /itinerary/set-inappropriate/:id
```

#### Request

| Parameter       | Type    | Description                                                          |
| --------------- | ------- | -------------------------------------------------------------------- |
| id              | String  | **Required.** The id of the itinerary inside the request params.     |
| isInappropriate | Boolean | **Required.** The values of isInappropriate inside the request body. |

#### Response

```json
{
  Updated Itinerary Document
}
```

## Product Routes

## Promo Code Routes

### Create Promo Code

#### Request

```bash
POST /PromoCode/
```

| Parameter | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| promocode | String | **Required.** The promocode name passed in the request body. |
| discount  | Number | **Required.** The discount associates with the promo code.   |

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

| Parameter | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| id        | String | **Required.** Id of the tourist using the promo code.        |
| promocode | String | **Required.** The promocode name passed in the request body. |

#### Response

```json
{
  "message": "Promo code applied.",
  "discount": 50,
  "stripeID": "3mdQ1apG"
}
```

## Sales Routes

- `GET /sale/my-product-sales/:creatorId`: Get product sales by creator ID
- `GET /sale/my-sales/:creatorId/:type`: Get sales by creator ID and type

## Seller Routes

### Create Seller

```bash
POST /seller/
```

| Field                     | Type   | Required/Optional | Description                                            |
| ------------------------- | ------ | ----------------- | ------------------------------------------------------ |
| email                     | String | Required          | Email of the seller. Must be a valid email address.    |
| username                  | String | Required          | Unique username for the seller. Cannot contain spaces. |
| passwordHash              | String | Required          | Hashed password for the seller.                        |
| firstName                 | String | Optional          | First name of the seller.                              |
| lastName                  | String | Optional          | Last name of the seller.                               |
| preferredCurrency         | String | Optional          | Preferred currency of the seller. Defaults to "USD".   |
| description               | String | Optional          | Description or bio of the seller.                      |
| idCardImage               | Buffer | Optional          | Binary data for the seller's ID card image.            |
| taxationRegistryCardImage | Buffer | Optional          | Binary data for the taxation registry card image.      |

#### Response: returns created seller

### Get Seller by ID

```bash
GET /seller/:id
```

| Parameter | Type   | Description                                         |
| --------- | ------ | --------------------------------------------------- |
| id        | String | **Required.** The ID of the seller to be retrieved. |

#### Response: returns fetched seller

### Get All Sellers

```bash
GET /seller/
```

| Parameter | Type | Description                     |
| --------- | ---- | ------------------------------- |
| none      |      | retrieves a list of all sellers |

#### Response: returns list of all sellers

### Update an Existing Seller

```bash
PUT /seller/:id
```

| Field             | Type   | Required/Optional | Description                                                               |
| ----------------- | ------ | ----------------- | ------------------------------------------------------------------------- |
| id                | String | Required          | The ID of the seller to update.                                           |
| email             | String | Optional          | Updated email of the seller - request body.                               |
| firstName         | String | Optional          | Updated first name of the seller - request body.                          |
| lastName          | String | Optional          | Updated last name of the seller - request body.                           |
| preferredCurrency | String | Optional          | Updated preferred currency - request body.                                |
| description       | String | Optional          | Updated description or bio - request body.                                |
| profileImageUri   | Object | Optional          | Updated profile image. Must include `public_id` and `url` - request body. |
| bannerImageUri    | Object | Optional          | Updated banner image. Must include `public_id` and `url` - request body.  |

#### Response: returns updated seller

### Delete a Seller

```bash
DELETE /seller/:id
```

| Parameter | Type   | Description                                       |
| --------- | ------ | ------------------------------------------------- |
| id        | String | **Required.** The ID of the seller to be deleted. |

#### Response: no json return

### Add Seller Documents

```bash
PUT /seller/upload/:id
```

| Field                     | Type   | Required/Optional | Description                                       |
| ------------------------- | ------ | ----------------- | ------------------------------------------------- |
| id                        | String | Required          | The ID of the seller.                             |
| idCardImage               | Buffer | Optional          | Binary data for the seller's ID card image.       |
| taxationRegistryCardImage | Buffer | Optional          | Binary data for the taxation registry card image. |

#### Response: returns seller with updated documents

## Product Routes

### Get All Products

```bash
GET /product/
```

| Field      | Type   | Required/Optional | Description                      |
| ---------- | ------ | ----------------- | -------------------------------- |
| search     | String | Optional (query)  | Text to search in product names. |
| minprice   | Number | Optional (query)  | Minimum price for filtering.     |
| maxprice   | Number | Optional (query)  | Maximum price for filtering.     |
| sortrating | String | Optional (query)  | Sort by rating (asc or desc).    |

#### Response: returns list of all products

### Get Minimum and Maximum Prices

```bash
GET /product/price-min-max
```

| Parameter | Type | Description                                                  |
| --------- | ---- | ------------------------------------------------------------ |
| none      |      | Retrieves the minimum and maximum prices among all products. |

#### Response: returns minPrice and maxPrice

### Get Products by Creator

```bash
GET /product/my-products/:creatorId
```

| Field     | Type   | Required/Optional | Description                           |
| --------- | ------ | ----------------- | ------------------------------------- |
| creatorId | String | Required          | The ID of the creator (seller/admin). |

### Register All Products in Stripe

```bash
GET /product/registerProductsStripe
```

| Parameter | Type | Description                                                                          |
| --------- | ---- | ------------------------------------------------------------------------------------ |
| none      |      | Registers all products in Stripe by creating their Stripe product and price entries. |

### Get Product by ID

```bash
GET /product/:id
```

| Field | Type   | Required/Optional | Description                        |
| ----- | ------ | ----------------- | ---------------------------------- |
| id    | String | Required          | The ID of the product to retrieve. |

### Delete a Product

```bash
DELETE /product/:id
```

| Parameter | Type   | Description                                        |
| --------- | ------ | -------------------------------------------------- |
| id        | String | **Required.** The ID of the product to be deleted. |

### Add Rating to a Product

```bash
POST /product/:id
```

| Parameter | Type   | Required/Optional | Description                       |
| --------- | ------ | ----------------- | --------------------------------- |
| id        | String | Required          | The ID of the product to rate.    |
| userId    | String | Required (Body)   | ID of the user adding the rating. |
| rating    | Number | Required (Body)   | Rating value (1-5).               |

### Add or Update Review

```bash
POST /product/:id/review
```

| Parameter | Type   | Required/Optional | Description                                   |
| --------- | ------ | ----------------- | --------------------------------------------- |
| id        | String | Required          | The ID of the product to review.              |
| userId    | String | Required (Body)   | ID of the user adding or updating the review. |
| rating    | Number | Optional (Body)   | Rating value (1-5).                           |
| comment   | String | Optional (Body)   | Review comment.                               |

### Buy Product

```bash
POST /product/:id/buy
```

| Parameter | Type   | Required/Optional | Description                         |
| --------- | ------ | ----------------- | ----------------------------------- |
| id        | String | Required          | The ID of the product to purchase.  |
| userId    | String | Required (Body)   | ID of the user making the purchase. |

## Trip Routes

### Get All Trips

```bash
GET /trip/
```

| Parameter | Type | Description                   |
| --------- | ---- | ----------------------------- |
| none      |      | retrieves a list of all trips |

### Get Trip by ID

```bash
GET /trip/:id
```

| Field | Type   | Required/Optional | Description                     |
| ----- | ------ | ----------------- | ------------------------------- |
| id    | String | Required          | The ID of the trip to retrieve. |

### Create a New Trip

```bash
POST /trip/
```

| Parameter       | Type   | Required/Optional | Description                                                            |
| --------------- | ------ | ----------------- | ---------------------------------------------------------------------- |
| name            | String | Required          | Name of the trip/activity.                                             |
| description     | String | Optional          | Description of the trip.                                               |
| dateTime        | Date   | Required          | Date and time of the trip.                                             |
| price           | Number | Required          | Price of the trip.                                                     |
| pickupLocation  | Object | Required          | Pickup location object containing address and coordinates (lat, lng).  |
| dropoffLocation | Object | Required          | Dropoff location object containing address and coordinates (lat, lng). |
| cardImage       | Object | Optional          | Card image data (public_id and url from Cloudinary).                   |
| creatorId       | String | Required          | The ID of the creator (Advertiser).                                    |
| capacity        | Number | Optional          | Maximum number of participants (default is 0).                         |
| participants    | Array  | Optional          | List of participant IDs (Tourist).                                     |

#### Response: returns created trip

### Update an Existing Trip

```bash
PUT /trip/:id
```

| Parameter       | Type   | Required/Optional | Description                                                  |
| --------------- | ------ | ----------------- | ------------------------------------------------------------ |
| id              | String | Required          | The ID of the trip to update.                                |
| name            | String | Optional          | Updated name of the trip.                                    |
| description     | String | Optional          | Updated description of the trip.                             |
| dateTime        | Date   | Optional          | Updated date and time of the trip.                           |
| price           | Number | Optional          | Updated price of the trip.                                   |
| pickupLocation  | Object | Optional          | Updated pickup location object (address, lat, lng).          |
| dropoffLocation | Object | Optional          | Updated dropoff location object (address, lat, lng).         |
| cardImage       | Object | Optional          | Updated card image data (public_id and url from Cloudinary). |
| capacity        | Number | Optional          | Updated capacity of the trip.                                |
| participants    | Array  | Optional          | Updated list of participant IDs.                             |

#### Response: returns updated trip

### Delete a Trip

```bash
DELETE /trip/:id
```

| Parameter | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| id        | String | **Required.** The ID of the trip to be deleted. |

#### Response: no return json

### Book a Trip

```bash
POST /trip/:id/book
```

| Field  | Type   | Required/Optional | Description                        |
| ------ | ------ | ----------------- | ---------------------------------- |
| id     | String | Required          | The ID of the trip to book.        |
| userId | String | Required (Body)   | ID of the user making the booking. |

#### Response: returns booked trip

### Get Trips by Creator

```bash
GET /trip/my-trips/:creatorId
```

| Field     | Type   | Required/Optional | Description                         |
| --------- | ------ | ----------------- | ----------------------------------- |
| creatorId | String | Required          | The ID of the creator (Advertiser). |

#### Response: returns list of trips

## Complaint Routes

### Create a New Complaint

```bash
POST /complaint
```

| Field      | Type    | Required/Optional | Description                                           |
| ---------- | ------- | ----------------- | ----------------------------------------------------- |
| title      | String  | Required          | Title of the complaint.                               |
| body       | String  | Required          | Detailed body of the complaint.                       |
| isResolved | Boolean | Optional          | Status of the complaint (default: false).             |
| comment    | String  | Optional          | Comment or reply to the complaint.                    |
| creatorId  | String  | Required          | ID of the creator (Tourist) submitting the complaint. |

#### Response: returns created complaint

### Get All Complaints

```bash
GET /complaint
```

| Parameter  | Type    | Required/Optional | Description                                   |
| ---------- | ------- | ----------------- | --------------------------------------------- |
| isResolved | Boolean | Optional (query)  | Filter complaints by their resolution status. |
| sortOrder  | String  | Optional (query)  | Order complaints by date ('asc' or 'desc').   |
| page       | Number  | Optional (query)  | Page number for pagination (default: 1).      |
| limit      | Number  | Optional (query)  | Number of complaints per page (default: 10).  |

#### Response: returns list of all complaints

### Get Complaint by ID

```bash
GET /complaint/:id
```

| Parameter | Type   | Required/Optional | Description                          |
| --------- | ------ | ----------------- | ------------------------------------ |
| id        | String | Required          | The ID of the complaint to retrieve. |

#### Response: returns complaint

### Update Complaint Status and Comment

```bash
PUT /complaint/:id
```

| Parameter  | Type    | Required/Optional | Description                                 |
| ---------- | ------- | ----------------- | ------------------------------------------- |
| id         | String  | Required          | The ID of the complaint to update.          |
| isResolved | Boolean | Optional (Body)   | Updated resolution status of the complaint. |
| comment    | String  | Optional (Body)   | Reply to the complaint.                     |

#### Response: returns updated complaint

### Get Complaints by Creator (User)

```bash
GET /complaint/my-complaints/:creatorId
```

| Parameter | Type   | Required/Optional | Description                                                 |
| --------- | ------ | ----------------- | ----------------------------------------------------------- |
| creatorId | String | Required          | The ID of the creator (Tourist) to retrieve complaints for. |

#### Response: returns list of complaints created by user

## Site Routes

### Get All Sites

```bash
GET /sites/
```

| Field    | Type   | Required/Optional | Description                                   |
| -------- | ------ | ----------------- | --------------------------------------------- |
| siteName | String | Optional (query)  | Filters sites by name (partial matching).     |
| tagName  | String | Optional (query)  | Filters sites by tag name (partial matching). |

#### Response: returns a list of all sites

### Get Site by ID

```bash
GET /sites/:id
```

### Get Site by ID

```bash
GET /sites/:id
```

| Field | Type   | Required/Optional | Description                     |
| ----- | ------ | ----------------- | ------------------------------- |
| id    | String | Required          | The ID of the site to retrieve. |

#### Response: returns the fetched site

### Create a new Site

```bash
POST /sites/
```

| Field        | Type   | Required/Optional | Description                                         |
| ------------ | ------ | ----------------- | --------------------------------------------------- |
| name         | String | Required          | Name of the site.                                   |
| description  | String | Required          | Description of the site.                            |
| cardImage    | Object | Optional (file)   | Image for the site (uploaded to Cloudinary).        |
| location     | Object | Required          | Address and coordinates (latitude, longitude).      |
| openingHours | Object | Required          | Opening hours (e.g., day-wise start and end times). |
| ticketPrices | Map    | Optional          | Map of ticket types and their prices.               |
| tags         | Array  | Optional          | Array of tag names associated with the site.        |
| creatorId    | String | Required          | The ID of the creator (user who adds the site).     |

#### Response: returns the created Site

### Update a Site

```bash
PUT /sites/:id
```

| Field        | Type   | Required/Optional | Description                                      |
| ------------ | ------ | ----------------- | ------------------------------------------------ |
| id           | String | Required          | The ID of the site to update.                    |
| name         | String | Optional          | Updated name of the site.                        |
| description  | String | Optional          | Updated description of the site.                 |
| cardImage    | Object | Optional (file)   | New image for the site (uploaded to Cloudinary). |
| location     | Object | Optional          | Updated address and coordinates.                 |
| openingHours | Object | Optional          | Updated opening hours.                           |
| ticketPrices | Map    | Optional          | Updated map of ticket types and prices.          |
| tags         | Array  | Optional          | Updated array of tag names.                      |

#### Response: returns the updated site

### Delete a Site

```bash
DELETE /site/:id
```

| Field | Type   | Required/Optional | Description                   |
| ----- | ------ | ----------------- | ----------------------------- |
| id    | String | Required          | The ID of the site to delete. |

#### Response: no returned json

### Get Sites Created by a User

```bash
GET /site/my-sites/:creatorId
```

| Field     | Type   | Required/Optional | Description                               |
| --------- | ------ | ----------------- | ----------------------------------------- |
| creatorId | String | Required          | The ID of the user who created the sites. |

#### Response: returns list of sites

## Payment Routes

### Stripe Checkout Payment

```bash
POST /payment/stripe
```

| Field     | Type         | Required/Optional | Description                                                                                      |
| --------- | ------------ | ----------------- | ------------------------------------------------------------------------------------------------ |
| cart      | Array/Object | Required          | The cart items for the payment. Structure depends on the type (product, itinerary, or activity). |
| userId    | String       | Required          | The ID of the user making the payment.                                                           |
| promoCode | String       | Optional          | A promo code for discounts (if applicable).                                                      |
| type      | String       | Required          | The type of purchase (product, itinerary, or activity).                                          |

#### Response: Returns a URL to the Stripe Checkout page.

### Wallet Checkout Payment

```bash
POST /payment/stripe
```

| Field    | Type         | Required/Optional | Description                                                                                      |
| -------- | ------------ | ----------------- | ------------------------------------------------------------------------------------------------ |
| cart     | Array/Object | Required          | The cart items for the payment. Structure depends on the type (product, itinerary, or activity). |
| userId   | String       | Required          | The ID of the user making the payment.                                                           |
| discount | Number       | Optional          | A discount percentage to be applied (if applicable).                                             |
| type     | String       | Required          | The type of purchase (product, itinerary, or activity).                                          |

#### Response: Returns a success message upon successful wallet payment.

### Cash on Delivery (COD) Payment

```bash
POST /payment/cod
```

| Field  | Type   | Required/Optional | Description                           |
| ------ | ------ | ----------------- | ------------------------------------- |
| cart   | Array  | Required          | The cart items for the order.         |
| userId | String | Required          | The ID of the user placing the order. |

#### Response: Returns a success message upon successfully placing the order.

## TourismGovernor Routes

### Create Tourism Governor

```bash
POST /tourismGovernor/
```

| Field           | Type   | Required/Optional | Description                                               |
| --------------- | ------ | ----------------- | --------------------------------------------------------- |
| username        | String | Required          | The username of the tourism governor.                     |
| email           | String | Optional          | The email of the tourism governor.                        |
| passwordHash    | String | Required          | The hashed password for the tourism governor.             |
| profileImageUri | Object | Optional          | Object containing public_id and url of the profile image. |
| bannerImageUri  | Object | Optional          | Object containing public_id and url of the banner image.  |

#### Response: returns the created tourism governor

### Get Tourism Governor by ID

```bash
GET /tourismGovernor/:id
```

| Field | Type   | Required/Optional | Description                                 |
| ----- | ------ | ----------------- | ------------------------------------------- |
| id    | String | Required          | The ID of the tourism governor to retrieve. |

#### Response: returns fetched tourism governor

### Update Tourism Governor

```bash
PUT /tourismGovernor/:id
```

| Field           | Type   | Required/Optional | Description                                            |
| --------------- | ------ | ----------------- | ------------------------------------------------------ |
| id              | String | Required          | The ID of the tourism governor to update.              |
| username        | String | Optional          | The new username of the tourism governor.              |
| email           | String | Optional          | The new email of the tourism governor.                 |
| profileImageUri | Object | Optional          | New profile image object containing public_id and url. |
| bannerImageUri  | Object | Optional          | New banner image object containing public_id and url.  |

#### Response: returns updated tourism governor

## Tag Routes

### Create a New Tag

#### Request

```bash
POST /tag/
```

| Parameter | Type   | Description                                          |
| --------- | ------ | ---------------------------------------------------- |
| name      | String | **Required**. Tag's name passed in the request body. |

#### Response

```json
{
  Tag Document
}
```

### Retrieve a Tag by ID

#### Request

```bash
GET /tag/:id
```

| Parameter | Type   | Description   |
| --------- | ------ | ------------- |
| id        | String | **Required.** |

#### Response

```json
{
  Tag Document
}
```

### Retrieve all Tags

#### Request

```bash
GET /tag/
```

#### Response

```json
{
  [
    Tag 1 Document,
    Tag 2 Document,
    ...
  ]
}
```

### Update a Tag

#### Request

```bash
PUT /tag/:id
```

| Parameter | Type   | Description                                          |
| --------- | ------ | ---------------------------------------------------- |
| id        | String | **Required.**                                        |
| name      | String | **Required.** Tag's name passed in the request body. |

#### Response

```json
{
  Updated Tag Document
}
```

### Delete a Tag

#### Request

```bash
DELETE /tag/:id
```

| Parameter | Type   | Description   |
| --------- | ------ | ------------- |
| id        | String | **Required.** |

#### Response

```json
{
  "message": "Tag deleted successfully"
}
```

## Tour Guide Routes

### Comment on Tour Guide

```bash
POST /tourGuide/:id/comment
```

#### Request

| Parameter | Type   | Description                                             |
| --------- | ------ | ------------------------------------------------------- |
| id        | String | **Required.** The tour guide's id in the request params |
| userId    | String | **Required.** The user's id in the request body         |
| comment   | String | **Required.** The user's comment in the request body    |

#### Response

```json
{
  Updated Tour Guide Document
}
```

### Get All Tour Guides

```bash
GET /tourGuide/
```

#### Request

None

#### Response

```json
[
  Tour Guide 1 Document,
  Tour Guide 2 Document,
  ...
]
```

### Get Tour Guide

```bash
GET /tourGuide/:id
```

#### Request

| Parameter | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| id        | string | **Required.** The id of the tour guide in the request params |

#### Response

```json
{
  Tour Guide Document
}
```

### Delete Tour Guide

```bash
DELETE /tourGuide/:id
```

#### Request

| Parameter | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| id        | string | **Required.** The id of the tour guide in the request params |

#### Response

```json
{
  Deleted Tour Guide Document
}
```

### Add Tour Guide Rating

```bash
POST /tourGuide/:id
```

#### Request

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| id        | string | **Required.** The id of the tour guide in the request params   |
| userId    | string | **Required.** The userId of the tour guide in the request body |
| rating    | number | **Required.** The rating in the request body                   |

#### Response

```json
{
  Updated Tour Guide Document
}
```

### Delete Previous Work

```bash
POST /tourGuide/:id/previous-work/:previousWorkId
```

#### Request

| Parameter      | Type   | Description                                                           |
| -------------- | ------ | --------------------------------------------------------------------- |
| id             | string | **Required.** The tour guide's id in the request params               |
| previousWorkId | string | **Required.** The tour guide's previous work id in the request params |

#### Response

```json
{
  Updated Tour Guide Document
}
```

## Tourist Governer Routes

## Tourist Routes

### Get all Tourists

```bash
GET /tourist/
```

#### Request

None

#### Response

```json
[
  Tourist 1 Document,
  Tourist 2 Document,
  ...
]
```

### Get tourist by username

```bash
GET /tourist/user/:username
```

#### Request

| Parameter | Type   | Description                                                       |
| --------- | ------ | ----------------------------------------------------------------- |
| username  | String | **Required.** The username of the user inside the request params. |

#### Response

```json
{
  Tourist Document
}
```

### Get tourist by id

```bash
GET /tourist/:id
```

#### Request

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| id        | String | **Required.** The id of the tourist inside the request params. |

#### Response

```json
{
  Tourist Document
}
```

### Delete tourist by id

```bash
DELETE /tourist/:id
```

#### Request

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| id        | String | **Required.** The id of the tourist inside the request params. |

#### Response

```json
{
  Deleted Tourist Document
}
```

### Tourist Redeem Points

```bash
POST /tourist/:id
```

#### Request

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| id        | String | **Required.** The id of the tourist inside the request params. |

#### Response

```json
{
  "message": "Points redeemed successfully",
  "wallet": 1000,
  "loyaltyPoints": 500
}
```

### Add product to wishlist

```bash
POST /tourist/:id/wishlist
```

#### Request

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| id        | String | **Required.** The id of the tourist inside the request params. |
| productID | String | **Required.** The product id inside the request body.          |

#### Response

```json
{
  "message": "Product added to wishlist",
  "wishlist": [
    Product 1 id,
    Product 2 id,
    ...
  ]
}
```

### Remove product from wishlist

```bash
DELETE /tourist/:id/wishlist
```

#### Request

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| id        | String | **Required.** The id of the tourist inside the request params. |
| productID | String | **Required.** The product id inside the request body.          |

#### Response

```json
{
  "message": "Product removed from wishlist successfully",
  "wishlist": [
    Product 1 id,
    Product 2 id,
    ...
  ]
}
```

### Add activity to bookmarks

```bash
POST /tourist/:id/bookmark
```

#### Request

| Parameter  | Type   | Description                                                    |
| ---------- | ------ | -------------------------------------------------------------- |
| id         | String | **Required.** The id of the tourist inside the request params. |
| activityID | String | **Required.** The activity id inside the request body.         |

#### Response

```json
{
  "message": "Activity added to bookmarks",
  "bookmarks": [
    Activity 1 id,
    Activity 2 id,
    ...
  ]
}
```

### Get bookmarked activities

```bash
GET /tourist/:id/bookmark
```

#### Request

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| id        | String | **Required.** The id of the tourist inside the request params. |

#### Response

```json
{
  [
    Activity 1 id,
    Activity 2 id,
    ...
  ]
}
```

### Remove activity from bookmarks

```bash
DELETE /tourist/:id/bookmark
```

#### Request

| Parameter  | Type   | Description                                                    |
| ---------- | ------ | -------------------------------------------------------------- |
| id         | String | **Required.** The id of the tourist inside the request params. |
| activityID | String | **Required.** The activity id inside the request body.         |

#### Response

```json
{
  "message": "Activity removed from bookmarks successfully",
  "bookmarks": [
    Activity 1 id,
    Activity 2 id,
    ...
  ]
}
```

### Get Cart

```bash
GET /tourist/:id/cart
```

#### Request

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| id        | String | **Required.** The id of the tourist inside the request params. |

#### Response

```json
[
  {
    "productID": Product 1 ID,
    "quantity": 10,
  },
  {
    "productID": Product 2 ID,
    "quantity": 5,
  },
]
```

### Add to Cart

```bash
POST /tourist/:id/cart
```

#### Request

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| id        | String | **Required.** The id of the tourist inside the request params. |
| productID | String | **Required.** The id of the product inside the request body.   |
| quantity  | String | **Required.** The id of the product inside the request body.   |

#### Response

```json
[
  "message": "Product added to cart",
  "cart":
    {
      "productID": Product 1 ID,
      "quantity": 10,
    },
    {
      "productID": Product 2 ID,
      "quantity": 5,
    },
]
```

### Remove amount of specific product from Cart

```bash
PUT /tourist/:id/cart
```

#### Request

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| id        | String | **Required.** The id of the tourist inside the request params. |
| productID | String | **Required.** The id of the product inside the request body.   |
| quantity  | String | **Required.** The id of the product inside the request body.   |

#### Response

```json
[
  "message": "Product updated from cart successfully",
  "cart":
    {
      "productID": Product 1 ID,
      "quantity": 10,
    },
    {
      "productID": Product 2 ID,
      "quantity": 5,
    },
]
```

### Remove product from Cart

```bash
DELETE /tourist/:id/cart/:productID
```

#### Request

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| id        | String | **Required.** The id of the tourist inside the request params. |
| productID | String | **Required.** The id of the product inside the request params. |

#### Response

```json
[
  "message": "Product removed from cart successfully",
  "cart":
    {
      "productID": Product 1 ID,
      "quantity": 10,
    },
    {
      "productID": Product 2 ID,
      "quantity": 5,
    },
]
```

### View Order Details

```bash
GET /tourist/:id/orders/:orderID
```

#### Request

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| id        | String | **Required.** The id of the tourist inside the request params. |
| orderID   | String | **Required.** The id of the order inside the request params.   |

#### Response

```json
{
  "sales": [
    {
      "_id": "64a3b8e9d5d38d001a6c815a",
      "type": "Sale"
    }
  ],
  "cart": [
    {
      "productID": {
        "_id": "64a3b8e9d5d38d001a6c815b",
        "name": "Wireless Earbuds",
        "price": 59.99,
        "category": "Electronics"
      },
      "quantity": 2
    },
    {
      "productID": {
        "_id": "64a3b8e9d5d38d001a6c815c",
        "name": "Yoga Mat",
        "price": 29.99,
        "category": "Sports & Outdoors"
      },
      "quantity": 1
    }
  ],
  "isDelivered": false
}
```

### View Orders

```bash
GET /tourist/:id/orders
```

#### Request

| Parameter   | Type   | Description                                                                |
| ----------- | ------ | -------------------------------------------------------------------------- |
| id          | String | **Required.** The id of the tourist inside the request params.             |
| isDelivered | String | **Required.** The status of delivery of the order inside the request body. |

#### Response

```json
[
  {
    "sales": [
      {
        "_id": "64a3b8e9d5d38d001a6c815a",
        "type": "Sale"
      }
    ],
    "cart": [
      {
        "productID": {
          "_id": "64a3b8e9d5d38d001a6c815b",
          "name": "Wireless Earbuds",
          "price": 59.99,
          "category": "Electronics"
        },
        "quantity": 2
      },
      {
        "productID": {
          "_id": "64a3b8e9d5d38d001a6c815c",
          "name": "Yoga Mat",
          "price": 29.99,
          "category": "Sports & Outdoors"
        },
        "quantity": 1
      }
    ],
    "isDelivered": false
  },
  ...
]
```

### Add address

```bash
POST /tourist/:id/address
```

#### Request

| Parameter | Type   | Description                                                       |
| --------- | ------ | ----------------------------------------------------------------- |
| id        | String | **Required.** The id of the tourist inside the request params.    |
| street    | String | **Required.** The street of the address inside the request body.  |
| city      | String | **Required.** The city of the address inside the request body.    |
| state     | String | **Required.** The state of the address inside the request body.   |
| zip       | String | **Required.** The zip of the address inside the request body.     |
| country   | String | **Required.** The country of the address inside the request body. |

#### Response

```json
{
  "message": "Address added successfully",
  "addresses": [
    {
      "type": [
        {
          "label": "Work",
          "street": "Group 116, Building 26, Flat 6",
          "city": "New Cairo",
          "state": "Cairo",
          "zip": "11735",
          "country": "Egypt"
        }
      ],
      "_id": {
        "$oid": "6754895e15efad19b9f51ad6"
      }
    },
    {
      "type": [
        {
          "label": "Home",
          "street": "Group 120, Building 10, Flat 4",
          "city": "Old Cairo",
          "state": "Cairo",
          "zip": "11532",
          "country": "Egypt"
        }
      ],
      "_id": {
        "$oid": "6754896115efad19b9f51aef"
      }
    }
  ]
}
```

### Add to Cart from Wishlist

```bash
POST /tourist/:id/cart/wishlist
```

#### Request

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| id        | String | **Required.** The id of the tourist inside the request params. |
| productID | String | **Required.** The id of the product inside the request body.   |
| quantity  | String | **Required.** The id of the product inside the request body.   |

#### Response

```json
{
  "message": "Product moved from wishlist to cart",
  "cart": [
    {
      "productID": Product 1 ID,
      "quantity": 10,
    },
    {
      "productID": Product 2 ID,
      "quantity": 5,
    },
  ],
  "wishlist": [
    Product 1 id,
    Product 2 id,
    ...
  ]
}
```

### Get Wishlist Products

```bash
GET /tourist/:id/cart/wishlist
```

#### Request

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| id        | String | **Required.** The id of the tourist inside the request params. |

#### Response

```json
[
  {
    "_id": {
      "$oid": "67253028d5a2d7588e2ce83c"
    },
    "name": "Headphones",
    "imageUris": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZIVemLQYn-oA9n_I34o3U5CFYc7kitMdWg&s"
    ],
    "price": 60,
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ullamcorper turpis vitae imperdiet vehicula. Suspendisse luctus condimentum leo. Sed id fermentum velit, eget ultricies dui. Aenean suscipit maximus velit, at gravida justo lacinia id. Nam tortor lectus, bibendum sed metus non, luctus ultrices orci. Interdum et malesuada fames ac.",
    "rating": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 1,
      "5": 0
    },
    "averageRating": 4,
    "quantity": 1,
    "numSales": 2,
    "isArchived": false,
    "reviews": [
      {
        "userId": "672faf6be3120c5df6679670",
        "rating": 4,
        "comment": "Good battery life",
        "_id": {
          "$oid": "6731e2f48ddbfc04a4a5f327"
        }
      }
    ],
    "createdAt": {
      "$date": "2024-11-01T19:46:48.825Z"
    },
    "updatedAt": {
      "$date": "2024-11-30T11:24:29.068Z"
    },
    "__v": 12,
    "creatorId": {
      "$oid": "67252de1d5a2d7588e2ce7fe"
    },
    "userRatings": [
      {
        "$oid": "672faf6be3120c5df6679670"
      }
    ],
    "priceId": "price_1QQommFqphnFdcP1xFI0GJ2W"
  },
  ...
]
```

## Trip Routes

## User Routes

### Sign Up

```bash
POST /user/signup
```

#### Request

| Parameter | Type   | Description                                                                       |
| --------- | ------ | --------------------------------------------------------------------------------- |
| email     | String | **Required.** The email of the user inside the request body.                      |
| username  | String | **Required.** The username of the user inside the request body.                   |
| password  | String | **Required.** The password of the user inside the request body.                   |
| role      | String | **Required.** The role of the user inside the request body.                       |
| userData  | Object | **Required.** Additional User Data depending on the role inside the request body. |

#### Response

```json
{
  Created User (Tourist / Tour Guide / Tourism Governor / Advertiser / Seller / Admin) Document
}
```

### Reset Password

```bash
POST /user/reset-password
```

#### Request

| Parameter   | Type   | Description                                                         |
| ----------- | ------ | ------------------------------------------------------------------- |
| newPassword | String | **Required.** The new password of the user inside the request body. |
| id          | String | **Required.** The id of the user inside the request body.           |

#### Response

```json
{
  User (Tourist / Tour Guide / Tourism Governor / Advertiser / Seller / Admin) Document
}
```

### Send Reset Password Email

```bash
POST /user/forgot-password
```

#### Request

| Parameter | Type   | Description                                                     |
| --------- | ------ | --------------------------------------------------------------- |
| username  | String | **Required.** The username of the user inside the request body. |

#### Response

None

### Update User Password

```bash
POST /user/changePassword/:id
```

#### Request

| Parameter   | Type   | Description                                                         |
| ----------- | ------ | ------------------------------------------------------------------- |
| id          | String | **Required.** The id of the user inside the request params.         |
| role        | String | **Required.** The role of the user inside the request body.         |
| oldPassword | String | **Required.** The old password of the user inside the request body. |
| newPassword | String | **Required.** The new password of the user inside the request body. |

#### Response

```json
{
  Updated User (Tourist / Tour Guide / Tourism Governor / Advertiser / Seller / Admin) Document
}
```

### Change User System Acceptance Status

```bash
POST /user/changeAcceptance/:id
```

#### Request

| Parameter  | Type    | Description                                                              |
| ---------- | ------- | ------------------------------------------------------------------------ |
| id         | String  | **Required.** The id of the user inside the request params.              |
| role       | String  | **Required.** The role of the user inside the request body.              |
| isAccepted | Boolean | **Required.** The isAccepted status of the user inside the request body. |

#### Response

```json
{
  Updated User (Tourist / Tour Guide / Tourism Governor / Advertiser / Seller / Admin) Document
}
```

### Get User Role

```bash
GET /user/get-user-role/:id
```

#### Request

| Parameter | Type   | Description                                                 |
| --------- | ------ | ----------------------------------------------------------- |
| id        | String | **Required.** The id of the user inside the request params. |

#### Response

```json
{
  "role": "tourist"
}
```

### Get Users Pending to be accepted into system

```bash
GET /user/getPendingUsers
```

#### Request

None

#### Response

```json
[
  User 1 Document,
  User 2 Document,
  ...
]
```

### Check if user account is safe to delete

```bash
GET /user/canDelete/:id
```

#### Request

| Parameter | Type   | Description                                                 |
| --------- | ------ | ----------------------------------------------------------- |
| id        | String | **Required.** The id of the user inside the request params. |
| role      | String | **Required.** The id of the user inside the request body.   |

#### Response

```json
{
  "canDelete": true
}
```

### Get all Users

```bash
GET /user/
```

#### Request

None

#### Response

```json
[
  User 1 Document,
  User 2 Document,
  ...
]
```

### Delete User Account

```bash
DELETE /user/:id
```

#### Request

| Parameter | Type   | Description                                                 |
| --------- | ------ | ----------------------------------------------------------- |
| id        | String | **Required.** The id of the user inside the request params. |
| role      | String | **Required.** The id of the user inside the request body.   |

#### Response

```json
{
  "deletedCount": 10,
  "userDeleted": true
}
```

### Change status of account deletion request

```bash
PATCH /user/request-account-deletion/:id
```

#### Request

| Parameter                  | Type   | Description                                                 |
| -------------------------- | ------ | ----------------------------------------------------------- |
| id                         | String | **Required.** The id of the user inside the request params. |
| role                       | String | **Required.** The role of the user inside the request body. |
| isRequestedAccountDeletion | String | **Optional.** The id of the user inside the request body.   |

#### Response

```json
{
  "deletedCount": 10,
  "userDeleted": true
}
```
