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
