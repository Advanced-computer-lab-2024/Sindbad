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
- [Seller Routes](#seller-routes)
- [Product Routes](#product-routes)
- [Site Routes](#site-routes)
- [Trip Routes](#trip-routes)
- [Payment Routes](#payment-routes)
- [Complaint Routes](#complaint-routes)
- [TourismGovernor Routes](#tourismgovernor-routes)


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

### Create Seller

```bash
POST /seller/
```
| Field                        | Type      | Required/Optional | Description                                      |
|------------------------------|-----------|-------------------|--------------------------------------------------|
| email                        | String    | Required          | Email of the seller. Must be a valid email address. |
| username                     | String    | Required          | Unique username for the seller. Cannot contain spaces. |
| passwordHash                 | String    | Required          | Hashed password for the seller.                 |
| firstName                    | String    | Optional          | First name of the seller.                       |
| lastName                     | String    | Optional          | Last name of the seller.                        |
| preferredCurrency            | String    | Optional          | Preferred currency of the seller. Defaults to "USD". |
| description                  | String    | Optional          | Description or bio of the seller.               |
| idCardImage                  | Buffer    | Optional          | Binary data for the seller's ID card image.     |
| taxationRegistryCardImage    | Buffer    | Optional          | Binary data for the taxation registry card image. |


#### Response: returns created seller


### Get Seller by ID

```bash
GET /seller/:id
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The ID of the seller to be retrieved.|


#### Response: returns fetched seller


### Get All Sellers

```bash
GET /seller/
```
| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| none        |  | retrieves a list of all sellers|

#### Response: returns list of all sellers


### Update an Existing Seller

```bash
PUT /seller/:id
```
| Field             | Type   | Required/Optional | Description                                           |
|-------------------|--------|-------------------|-------------------------------------------------------|
| id                | String | Required          | The ID of the seller to update.                      |
| email             | String | Optional          | Updated email of the seller - request body.                         |
| firstName         | String | Optional          | Updated first name of the seller - request body.                    |
| lastName          | String | Optional          | Updated last name of the seller - request body.                     |
| preferredCurrency | String | Optional          | Updated preferred currency - request body.                          |
| description       | String | Optional          | Updated description or bio - request body.                          |
| profileImageUri   | Object | Optional          | Updated profile image. Must include `public_id` and `url` - request body. |
| bannerImageUri    | Object | Optional          | Updated banner image. Must include `public_id` and `url` - request body. |


#### Response: returns updated seller 


### Delete a Seller

```bash
DELETE /seller/:id
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The ID of the seller to be deleted.|


#### Response: no json return


### Add Seller Documents

```bash
PUT /seller/upload/:id
```
| Field                     | Type   | Required/Optional | Description                                           |
|---------------------------|--------|-------------------|-------------------------------------------------------|
| id                        | String | Required          | The ID of the seller.                                 |
| idCardImage               | Buffer | Optional          | Binary data for the seller's ID card image.          |
| taxationRegistryCardImage | Buffer | Optional          | Binary data for the taxation registry card image.    |

#### Response: returns seller with updated documents


## Product Routes

### Get All Products

```bash
GET /product/
```

| Field        | Type    | Required/Optional | Description                                    |
|--------------|---------|-------------------|------------------------------------------------|
| search       | String  | Optional (query) | Text to search in product names.              |
| minprice     | Number  | Optional (query)  | Minimum price for filtering.                  |
| maxprice     | Number  | Optional (query)  | Maximum price for filtering.                  |
| sortrating   | String  | Optional (query)  | Sort by rating (asc or desc).                 |


#### Response: returns list of all products


### Get Minimum and Maximum Prices

```bash
GET /product/price-min-max
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| none        |  | Retrieves the minimum and maximum prices among all products.|


#### Response: returns minPrice and maxPrice


### Get Products by Creator

```bash
GET /product/my-products/:creatorId
```
| Field      | Type   | Required/Optional | Description                               |
|------------|--------|-------------------|-------------------------------------------|
| creatorId  | String | Required          | The ID of the creator (seller/admin).    |


### Register All Products in Stripe

```bash
GET /product/registerProductsStripe
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| none        |  | Registers all products in Stripe by creating their Stripe product and price entries.|


### Get Product by ID

```bash
GET /product/:id
```

| Field | Type   | Required/Optional | Description                                      |
|-------|--------|-------------------|--------------------------------------------------|
| id    | String | Required          | The ID of the product to retrieve.              |

### Delete a Product

```bash
DELETE /product/:id
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The ID of the product to be deleted.|


### Add Rating to a Product

```bash
POST /product/:id
```
| Parameter | Type   | Required/Optional | Description                                  |
|-----------|--------|-------------------|----------------------------------------------|
| id        | String | Required          | The ID of the product to rate.               |
| userId    | String | Required (Body)   | ID of the user adding the rating.           |
| rating    | Number | Required (Body)   | Rating value (1-5).                          |


### Add or Update Review

```bash
POST /product/:id/review
```
| Parameter | Type   | Required/Optional | Description                                  |
|-----------|--------|-------------------|----------------------------------------------|
| id        | String | Required          | The ID of the product to review.             |
| userId    | String | Required (Body)   | ID of the user adding or updating the review.|
| rating    | Number | Optional (Body)   | Rating value (1-5).                          |
| comment   | String | Optional (Body)   | Review comment.                              |


### Buy Product

```bash
POST /product/:id/buy
```
| Parameter | Type   | Required/Optional | Description                                  |
|-----------|--------|-------------------|----------------------------------------------|
| id        | String | Required          | The ID of the product to purchase.           |
| userId    | String | Required (Body)   | ID of the user making the purchase.          |


## Trip Routes

### Get All Trips

```bash
GET /trip/
```
| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| none        |  | retrieves a list of all trips|


### Get Trip by ID
```bash
GET /trip/:id
```

| Field | Type   | Required/Optional | Description                                      |
|-------|--------|-------------------|--------------------------------------------------|
| id    | String | Required          | The ID of the trip to retrieve.              |

### Create a New Trip

```bash
POST /trip/
```

| Parameter        | Type     | Required/Optional | Description                                             |
|------------------|----------|-------------------|---------------------------------------------------------|
| name             | String   | Required          | Name of the trip/activity.                             |
| description      | String   | Optional          | Description of the trip.                               |
| dateTime         | Date     | Required          | Date and time of the trip.                             |
| price            | Number   | Required          | Price of the trip.                                     |
| pickupLocation   | Object   | Required          | Pickup location object containing address and coordinates (lat, lng). |
| dropoffLocation  | Object   | Required          | Dropoff location object containing address and coordinates (lat, lng). |
| cardImage        | Object   | Optional          | Card image data (public_id and url from Cloudinary).    |
| creatorId        | String   | Required          | The ID of the creator (Advertiser).                    |
| capacity         | Number   | Optional          | Maximum number of participants (default is 0).          |
| participants     | Array    | Optional          | List of participant IDs (Tourist).                     |



#### Response: returns created trip


### Update an Existing Trip

```bash
PUT /trip/:id
```

| Parameter        | Type     | Required/Optional | Description                                              |
|------------------|----------|-------------------|----------------------------------------------------------|
| id               | String   | Required          | The ID of the trip to update.                            |
| name             | String   | Optional          | Updated name of the trip.                                |
| description      | String   | Optional          | Updated description of the trip.                         |
| dateTime         | Date     | Optional          | Updated date and time of the trip.                       |
| price            | Number   | Optional          | Updated price of the trip.                               |
| pickupLocation   | Object   | Optional          | Updated pickup location object (address, lat, lng).      |
| dropoffLocation  | Object   | Optional          | Updated dropoff location object (address, lat, lng).     |
| cardImage        | Object   | Optional          | Updated card image data (public_id and url from Cloudinary). |
| capacity         | Number   | Optional          | Updated capacity of the trip.                            |
| participants     | Array    | Optional          | Updated list of participant IDs.                         |


#### Response: returns updated trip


### Delete a Trip

```bash
DELETE /trip/:id
```

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | **Required.** The ID of the trip to be deleted.|

#### Response: no return json


### Book a Trip

```bash
POST /trip/:id/book
```

| Field  | Type   | Required/Optional | Description                                      |
|--------|--------|-------------------|--------------------------------------------------|
| id     | String | Required          | The ID of the trip to book.                     |
| userId | String | Required (Body)   | ID of the user making the booking.              |


#### Response: returns booked trip


### Get Trips by Creator

```bash
GET /trip/my-trips/:creatorId
```

| Field      | Type   | Required/Optional | Description                                      |
|------------|--------|-------------------|--------------------------------------------------|
| creatorId  | String | Required          | The ID of the creator (Advertiser).              |


#### Response: returns list of trips





## Complaint Routes

### Create a New Complaint

```bash
POST /complaint
```

| Field      | Type     | Required/Optional | Description                                          |
|------------|----------|-------------------|------------------------------------------------------|
| title      | String   | Required          | Title of the complaint.                              |
| body       | String   | Required          | Detailed body of the complaint.                      |
| isResolved | Boolean  | Optional          | Status of the complaint (default: false).            |
| comment    | String   | Optional          | Comment or reply to the complaint.                   |
| creatorId  | String   | Required          | ID of the creator (Tourist) submitting the complaint. |

#### Response: returns created complaint


### Get All Complaints

```bash
GET /complaint
```

| Parameter   | Type     | Required/Optional | Description                                      |
|-------------|----------|-------------------|--------------------------------------------------|
| isResolved  | Boolean  | Optional (query)   | Filter complaints by their resolution status.    |
| sortOrder   | String   | Optional (query)   | Order complaints by date ('asc' or 'desc').      |
| page        | Number   | Optional (query)   | Page number for pagination (default: 1).         |
| limit       | Number   | Optional (query)   | Number of complaints per page (default: 10).     |

#### Response: returns list of all complaints


### Get Complaint by ID

```bash
GET /complaint/:id
```

| Parameter | Type   | Required/Optional | Description                                      |
|-----------|--------|-------------------|--------------------------------------------------|
| id        | String | Required          | The ID of the complaint to retrieve.             |


#### Response: returns complaint


### Update Complaint Status and Comment

```bash
PUT /complaint/:id
```

| Parameter   | Type     | Required/Optional | Description                                          |
|-------------|----------|-------------------|------------------------------------------------------|
| id          | String   | Required          | The ID of the complaint to update.                   |
| isResolved  | Boolean  | Optional (Body)   | Updated resolution status of the complaint.          |
| comment     | String   | Optional (Body)   | Reply to the complaint.                              |


#### Response: returns updated complaint


### Get Complaints by Creator (User)

```bash
GET /complaint/my-complaints/:creatorId
```
| Parameter | Type   | Required/Optional | Description                                      |
|-----------|--------|-------------------|--------------------------------------------------|
| creatorId | String | Required          | The ID of the creator (Tourist) to retrieve complaints for. |


#### Response: returns list of complaints created by user




## Site Routes

### Get All Sites

```bash
GET /sites/
```

| Field    | Type   | Required/Optional | Description                                     |
|----------|--------|-------------------|-------------------------------------------------|
| siteName | String | Optional (query)  | Filters sites by name (partial matching).       |
| tagName  | String | Optional (query)  | Filters sites by tag name (partial matching).   |

#### Response: returns a list of all sites

### Get Site by ID


```bash
GET /sites/:id
```


### Get Site by ID

```bash
GET /sites/:id
```

| Field | Type   | Required/Optional | Description                      |
|-------|--------|-------------------|----------------------------------|
| id    | String | Required          | The ID of the site to retrieve. |


#### Response: returns the fetched site


### Create a new Site


```bash
POST /sites/
```
| Field         | Type     | Required/Optional | Description                                                   |
|---------------|----------|-------------------|---------------------------------------------------------------|
| name          | String   | Required          | Name of the site.                                             |
| description   | String   | Required          | Description of the site.                                      |
| cardImage     | Object   | Optional (file)   | Image for the site (uploaded to Cloudinary).                  |
| location      | Object   | Required          | Address and coordinates (latitude, longitude).                |
| openingHours  | Object   | Required          | Opening hours (e.g., day-wise start and end times).            |
| ticketPrices  | Map      | Optional          | Map of ticket types and their prices.                         |
| tags          | Array    | Optional          | Array of tag names associated with the site.                  |
| creatorId     | String   | Required          | The ID of the creator (user who adds the site).               |

#### Response: returns the created Site



### Update a Site


```bash
PUT /sites/:id
```
| Field         | Type     | Required/Optional | Description                                           |
|---------------|----------|-------------------|-------------------------------------------------------|
| id            | String   | Required          | The ID of the site to update.                        |
| name          | String   | Optional          | Updated name of the site.                            |
| description   | String   | Optional          | Updated description of the site.                     |
| cardImage     | Object   | Optional (file)   | New image for the site (uploaded to Cloudinary).      |
| location      | Object   | Optional          | Updated address and coordinates.                     |
| openingHours  | Object   | Optional          | Updated opening hours.                                |
| ticketPrices  | Map      | Optional          | Updated map of ticket types and prices.              |
| tags          | Array    | Optional          | Updated array of tag names.                          |


#### Response: returns the updated site




### Delete a Site


```bash
DELETE /site/:id
```

| Field | Type   | Required/Optional | Description                      |
|-------|--------|-------------------|----------------------------------|
| id    | String | Required          | The ID of the site to delete.   |


#### Response: no returned json


### Get Sites Created by a User


```bash
GET /site/my-sites/:creatorId
```

| Field      | Type   | Required/Optional | Description                                  |
|------------|--------|-------------------|----------------------------------------------|
| creatorId  | String | Required          | The ID of the user who created the sites.    |

#### Response: returns list of sites




##  Payment Routes



### Stripe Checkout Payment

```bash
POST /payment/stripe
```

| Field     | Type          | Required/Optional | Description                                                   |
|-----------|---------------|-------------------|---------------------------------------------------------------|
| cart      | Array/Object  | Required          | The cart items for the payment. Structure depends on the type (product, itinerary, or activity). |
| userId    | String        | Required          | The ID of the user making the payment.                        |
| promoCode | String        | Optional          | A promo code for discounts (if applicable).                   |
| type      | String        | Required          | The type of purchase (product, itinerary, or activity).        |


#### Response: Returns a URL to the Stripe Checkout page.



### Wallet Checkout Payment

```bash
POST /payment/stripe
```

| Field     | Type          | Required/Optional | Description                                                   |
|-----------|---------------|-------------------|---------------------------------------------------------------|
| cart      | Array/Object  | Required          | The cart items for the payment. Structure depends on the type (product, itinerary, or activity). |
| userId    | String        | Required          | The ID of the user making the payment.                        |
| discount  | Number        | Optional          | A discount percentage to be applied (if applicable).           |
| type      | String        | Required          | The type of purchase (product, itinerary, or activity).        |

#### Response: Returns a success message upon successful wallet payment.


### Cash on Delivery (COD) Payment


```bash
POST /payment/cod
```

| Field     | Type   | Required/Optional | Description                                      |
|-----------|--------|-------------------|--------------------------------------------------|
| cart      | Array  | Required          | The cart items for the order.                    |
| userId    | String | Required          | The ID of the user placing the order.            |


#### Response: Returns a success message upon successfully placing the order.



## TourismGovernor Routes



### Create Tourism Governor


```bash
POST /tourismGovernor/
```

| Field            | Type     | Required/Optional | Description                                               |
|------------------|----------|-------------------|-----------------------------------------------------------|
| username         | String   | Required          | The username of the tourism governor.                     |
| email            | String   | Optional          | The email of the tourism governor.                        |
| passwordHash     | String   | Required          | The hashed password for the tourism governor.             |
| profileImageUri  | Object   | Optional          | Object containing public_id and url of the profile image. |
| bannerImageUri   | Object   | Optional          | Object containing public_id and url of the banner image.  |


#### Response: returns the created tourism governor



### Get Tourism Governor by ID

```bash
GET /tourismGovernor/:id
```

| Field | Type   | Required/Optional | Description                                       |
|-------|--------|-------------------|---------------------------------------------------|
| id    | String | Required          | The ID of the tourism governor to retrieve.      |


#### Response: returns fetched tourism governor



### Update Tourism Governor

```bash
PUT /tourismGovernor/:id
```

| Field            | Type     | Required/Optional | Description                                              |
|------------------|----------|-------------------|----------------------------------------------------------|
| id               | String   | Required          | The ID of the tourism governor to update.                |
| username         | String   | Optional          | The new username of the tourism governor.                |
| email            | String   | Optional          | The new email of the tourism governor.                   |
| profileImageUri  | Object   | Optional          | New profile image object containing public_id and url.   |
| bannerImageUri   | Object   | Optional          | New banner image object containing public_id and url.    |


#### Response: returns updated tourism governor



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

