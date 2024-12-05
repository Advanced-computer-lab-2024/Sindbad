# Sindbad API Refrences
---

## API References


###

 >User Routes
- `POST /user/register`: Register a new user
- `POST /user/login`: Login a user
- `GET /user/:id`: Get user details

> Activity Routes
### Get Activity by ID

**GET** `/activity/:id`

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | Required. The ID of the activity to retrieve.|



### Get My Activities

**GET** `/activity/my-activities/:creatorId`

| Parameter  | Type   | Description                                       |
|------------|--------|---------------------------------------------------|
| creatorId  | String | Required. The ID of the user whose activities are to be retrieved. |


### Get All Activities

**GET** `/activity`


### Search Activities

**GET** `/activity/search`

| Parameter   | Type   | Description                                                        |
|-------------|--------|--------------------------------------------------------------------|
| searchTerm  | String | Required. The term to search for in activity names, tags, or categories. |

### Filter Activities

**GET** `/activity/filter`

| Parameter | Type   | Description                                                            |
|-----------|--------|------------------------------------------------------------------------|
| budget    | Object | Optional. Object with `min` and `max` properties for filtering by price. |
| date      | Object | Optional. Object with `start` and `end` properties for date range filtering. |
| category  | String | Optional. Category for filtering activities.                           |
| rating    | Number | Optional. Minimum rating for filtering activities.                     |

### Create Activity

**POST** `/activity`

| Parameter          | Type   | Description                                  |
|--------------------|--------|----------------------------------------------|
| name, dateTime, etc | Various | Required. Fields to define the activity (e.g., name, dateTime, location, price, etc.). |


### Update Activity

**PUT** `/activity/:id`

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | Required. The ID of the activity to update.  |


### Delete Activity

**DELETE** `/activity/:id`

| Parameter | Type   | Description                                  |
|-----------|--------|----------------------------------------------|
| id        | String | Required. The ID of the activity to delete.  |



### Get Sorted Activities

**GET** `/activity/sort`

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| sortBy     | String | Required. Field to sort by (`price` or `rating`).     |
| sortOrder  | String | Optional. Sort order (`asc` or `desc`). Default is `asc`. |
| page       | Number | Optional. Page number for pagination. Default is `1`. |
| limit      | Number | Optional. Number of activities per page. Default is `10`. |


> Tag Routes

### Create a New Tag

**POST** `/tag`

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| name       | String | Required.                                            |

### Retrieve a Tag by ID

**GET** `/tag/:id`

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| id         | String | Required.                                            |

### Retrieve all Tags

**GET** `/tag`

### Update a Tag

**PUT** `/tag/:id`

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| id         | String | Required.                                            |

### Delete a Tag

**DELETE** `/tag/:id`

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| id         | String | Required.                                            |

> Category Routes
### Create Category 

**POST** `/categories`

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| name       | String | Required.                                            |

### Retrieve Category by ID

**GET** `/categories/:id`

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| id         | String | Required.                                            |

### Retrieve All Categories

**GET** `/categories`

### Update Category by ID

**PUT** `/categories/:id`

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| id         | String | Required.                                            |

### Delete Category by ID

**DELETE** `/categories/:id`

| Parameter  | Type   | Description                                          |
|------------|--------|------------------------------------------------------|
| id         | String | Required.                                            |

> Itinerary Routes
- `POST /itinerary`: Create a new itinerary
- `GET /itinerary/:id`: Get itinerary details
- `PUT /itinerary/:id`: Update itinerary
- `DELETE /itinerary/:id`: Delete itinerary

> Product Routes
- `POST /product`: Create a new product
- `GET /product/:id`: Get product details
- `PUT /product/:id`: Update product
- `DELETE /product/:id`: Delete product

> Sales Routes
- `GET /sale/my-product-sales/:creatorId`: Get product sales by creator ID
- `GET /sale/my-sales/:creatorId/:type`: Get sales by creator ID and type
