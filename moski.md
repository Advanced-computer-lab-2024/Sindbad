## User Routes

### Sign Up

```bash
POST /user/signup
```

#### Request

| Parameter | Type   | Description                                                                       |
| --------- | ------ | --------------------------------------------------------------------------------- |
| email     | String | **Required.** The email of the user inside the request body.                      |
| username  | String | **Required.** The id of the user inside the request body.                         |
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
