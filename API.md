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
### Get Activity by ID

```bash
GET /activity/:id
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The ID of the activity to be retrieved.|



### Get My Activities

```bash
GET /activity/my-activities/:creatorId
```

| Parameter  | Type   | Description                                       |
|------------|--------|---------------------------------------------------|
| creatorId  | String | **Required.** The ID of the user whose activities are to be retrieved. |


### Get All Activities

```bash
GET /activity/
```
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


### Delete Activity

```bash
DELETE /activity/:id
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The ID of the activity to delete.  |

### Post a Rating to an Activity

```bash
POST activity/:id
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The ID of the activity.  |
| userId    | Number | **Required.** The user's id passed in the request body.  |
| rating    | Number | **Required.** The rating passed in the request body.  |

### Post a comment to an Activity

```bash
POST /activity/:id/comment
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The ID of the activity  |
| userId    | Number | **Required.** The user's id passed in the request body.  |
| comment    | Number | **Required.** The comment passed in the request body.  |

### Book an Activity

```bash
POST /activity/book
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| activityId        | String | **Required.** The activity to be booked's Id passed in the request body.  |
| userId        | String | **Required.** The Id of the user booking the activity passed in the request body.  |

### Cancel an Activity's Booking

```bash
POST /activity/cancel
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| activityId        | String | **Required.** The activity to be canceled's Id passed in the request body.  |
| userId        | String | **Required.** The Id of the user cancelling the activity passed in the request body.  |



## Admin Routes

### Get All Admins
```bash
GET /admin/
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| email        | String | **Optional.** The admin to be fetched's email as a filter passed in the request query.  |
| username        | String | **Optional.** The admin to be fetched's username as a filter passed in the request query.  |

### Create an Admin
```bash
POST /admin/
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| email        | String | **Required.**   |
| username        | String | **Required.**   |
| passwordHash        | String | **Required.**  |

### Get an Admin by Id
```bash
GET /admin/:id
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The Admin to be fetched's id.  |

### Delete an Admin
```bash
DELETE /admin/:id
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The Admin to be deleted's id.  |

### Get Accounts requesting to be deleted
```bash
GET /admin/requested-account-deletion-users
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

