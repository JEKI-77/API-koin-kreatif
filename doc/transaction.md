# Transaction API Spec

## Register transaction

Endpoint : POST /api/transactions

Request Body s:

```json
{
  "transactionname": "khannedy",
  "password": "rahasia",
  "name": "Eko Khannedy"
}
```

Response Body (Success) :

```json
{
  "data": {
    "transactionname": "khannedy",
    "name": "Eko Khannedy"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "transactionname already registered"
}
```

## Login transaction

Endpoint : POST /api/transactions/login

Request Body :

```json
{
  "transactionname": "khannedy",
  "password": "rahasia"
}
```

Response Body (Success) :

```json
{
  "data": {
    "transactionname": "khannedy",
    "name": "Eko Khannedy",
    "token": "session_id_generated"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "transactionname or password is wrong"
}
```

## Get transaction

Endpoint : GET /api/transactions/current

Headers :

- Authorization: token

Response Body (Success) :

```json
{
  "data": {
    "transactionname": "khannedy",
    "name": "Eko Khannedy"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update transaction

Endpoint : PATCH /api/transactions/current

Headers :

- Authorization: token

Request Body :

```json
{
  "password": "rahasia", // optional, if want to change password
  "name": "Eko Khannedy" // optional, if want to change name
}
```

Response Body (Success) :

```json
{
  "data": {
    "transactionname": "khannedy",
    "name": "Eko Khannedy"
  }
}
```

## Logout transaction

Endpoint : DELETE /api/transactions/current

Headers :

- Authorization: token

Response Body (Success) :

```json
{
  "data": true
}
```
