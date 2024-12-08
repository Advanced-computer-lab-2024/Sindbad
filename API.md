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

```bash
POST /category/
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| name       | String | **Required.** Catergory's name to be passed in the body.|

### Retrieve Category by ID

```bash
GET /category/:id
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| id         | String | **Required.** Id of the category to be retrieved.        |

### Retrieve All Categories

```bash
GET /category/
```

### Update Category by ID

```bash
PUT /category/:id
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| id         | String | **Required.** Id of the category to be updated.      |
| name       | String | **Required.** Catergory's name to be passed in the body.|

### Delete Category by ID

```bash
DELETE /category/:id
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| id         | String | **Required.** Id of the category to be deleted.      |
## Checkout Routes
## Complaints Routes
## Flight Routes

### Find Flights

```bash
GET /flight/findFlight
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| origin         | String | **Required.** origin Location. |
| destination    | String | **Required.** Destination Location. |
| date           | Date | **Required.** Date of the Flight. |
| adults         | Number | **Required.** Number of travelers. |

### Get Tourist's booked flights

```bash
GET /flight/getFlight/:id
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| id         | String | **Required.** Id of the tourist. |

### Confirm Flight's Price before booking

```bash
PUT /flight/confirmFlight
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| flight     | JSON   | **Required.** The information about the flight that was returned as a JSON object in find flights. |

### Book a flight

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


## Hotel Routes
### Find Hotel by City

```bash
GET /hotel/by-city
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| cityCode         | String | **Required.**  |
| radius    | Number | **Required.** Represents the radius (in kilometers) around the cityCode to search for hotels. |


### Find Hotel by Geographical Code

```bash
GET /hotel/by-geocode
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| latitude         | Number | **Required.**  |
| longitude         | Number | **Required.**  |
| radius    | Number | **Required.** Represents the radius (in kilometers) around the cityCode to search for hotels. ||

### Find Hotel by id

```bash
GET /hotel/:hotelId/offers
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| hotelId         | String | **Required.** |

### Book Hotel

```bash
GET /hotel/book
```

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| bookingValues         | JSON | **Required.** The hotel booking offer. |
| bookingId    | String | **Required.** Hotel Offer Id. |
| travelerId           | String | **Required.** |



## Itinerary Routes


## Product Routes


## Promo Code Routes
### Create Promo Code 

```bash
POST /PromoCode/
```

| Parameter  | Type   | Description                                             |
|------------|--------|---------------------------------------------------------|
| promocode  | String | **Required.** The promocode name passed in the request body.|
| discount   | Number | **Required.** The discount associates with the promo code.  |

### Use Promo Code

```bash
PUT /PromoCode/:id
```

| Parameter  | Type   | Description                                             |
|------------|--------|-------------------------------------------------------- |
| id         | String | **Required.** Id of the tourist using the promo code.       |
| promocode  | String | **Required.** The promocode name passed in the request body.|


## Sales Routes
- `GET /sale/my-product-sales/:creatorId`: Get product sales by creator ID
- `GET /sale/my-sales/:creatorId/:type`: Get sales by creator ID and type

## Seller Routes

## Site Routes

## Tag Routes

### Create a New Tag

```bash
POST /tag/
```

| Parameter  | Type   | Description                                             |
|------------|--------|---------------------------------------------------------|
| name       | String | **Required**. Tag's name passed in the request body.                                 |

### Retrieve a Tag by ID

```bash
GET /tag/:id
```

| Parameter  | Type   | Description                                             |
|------------|--------|---------------------------------------------------------|
| id         | String | **Required.**                                               |

### Retrieve all Tags

```bash
GET /tag/
```

### Update a Tag

```bash
PUT /tag/:id
```

| Parameter  | Type   | Description                                             |
|------------|--------|---------------------------------------------------------|
| id         | String | **Required.**                                               |
| name       | String | **Required.** Tag's name passed in the request body.                                 |

### Delete a Tag

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

