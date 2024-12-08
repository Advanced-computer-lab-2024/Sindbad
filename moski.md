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
