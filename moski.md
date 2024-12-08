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
  "_id": "6725031bd5a2d7588e2ce42a",
  "email": "jana.elowainy@gmail.com",
  "username": "tourguide",
  "passwordHash": "$2b$10$6QP9BwFlpfF3sJq6Dl0DrOXnNIM95W9DpXiKwtCOpICsv7w9oO7A2",
  "isAccepted": true,
  "createdAt": {
    "$date": "2024-11-01T16:34:35.090Z"
  },
  "updatedAt": {
    "$date": "2024-11-30T13:03:54.129Z"
  },
  ...
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
  {
    "_id": "6725031215a2d7588e2ce42a",
    "email": "moski.moskito@gmail.com",
    "username": "tourguide",
    "passwordHash": "$2b$10$6QP9BwFadadF3sJq6Dl0DrOXnNIM95W9DpXiKwtCOpICsv7w9oO7A2",
    "isAccepted": false,
    "createdAt": {
      "$date": "2024-11-01T16:34:35.090Z"
    },
    "updatedAt": {
      "$date": "2024-11-30T13:03:54.129Z"
    },
    ...
  },
  {
    "_id": "6725031bd5a2d7588e2ce42a",
    "email": "jana.elowainy@gmail.com",
    "username": "tourguide",
    "passwordHash": "$2b$10$6QP9BwFlpfF3sJq6Dl0DrOXnNIM95W9DpXiKwtCOpICsv7w9oO7A2",
    "isAccepted": true,
    "createdAt": {
      "$date": "2024-11-01T16:34:35.090Z"
    },
    "updatedAt": {
      "$date": "2024-11-30T13:03:54.129Z"
    },
    ...
  },
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
  "_id": "6725031bd5a2d7588e2ce42a",
  "email": "jana.elowainy@gmail.com",
  "username": "tourguide",
  "passwordHash": "$2b$10$6QP9BwFlpfF3sJq6Dl0DrOXnNIM95W9DpXiKwtCOpICsv7w9oO7A2",
  "isAccepted": true,
  "createdAt": {
    "$date": "2024-11-01T16:34:35.090Z"
  },
  "updatedAt": {
    "$date": "2024-11-30T13:03:54.129Z"
  },
  ...
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
  "_id": "6725031bd5a2d7588e2ce42a",
  "email": "jana.elowainy@gmail.com",
  "username": "tourguide",
  "passwordHash": "$2b$10$6QP9BwFlpfF3sJq6Dl0DrOXnNIM95W9DpXiKwtCOpICsv7w9oO7A2",
  "isAccepted": true,
  "createdAt": {
    "$date": "2024-11-01T16:34:35.090Z"
  },
  "updatedAt": {
    "$date": "2024-11-30T13:03:54.129Z"
  },
  ...
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
  "_id": "6725031bd5a2d7588e2ce42a",
  "email": "jana.elowainy@gmail.com",
  "username": "tourguide",
  "passwordHash": "$2b$10$6QP9BwFlpfF3sJq6Dl0DrOXnNIM95W9DpXiKwtCOpICsv7w9oO7A2",
  "isAccepted": true,
  "createdAt": {
    "$date": "2024-11-01T16:34:35.090Z"
  },
  "updatedAt": {
    "$date": "2024-11-30T13:03:54.129Z"
  },
  ...
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
  "id": "64b1f2f5e5b7cbe20c23a3c7",
  "username": "moskiUser",
  "preferredCurrency": "USD",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
