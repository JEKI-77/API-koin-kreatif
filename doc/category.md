# category API Spec

## Register category

Endpoint : POST {URL}/v1/category

Request Body :

```json
{
  "category": "",
  "status": "false"
}
```

Response Body (Success) :

```json
{
  "category": "",
  "status": "false"
}
```

Response Body (Failed) :

```json
{
  "errors": "categoryname already "
}
```

## Get category

Endpoint : GET {URL}/v1/category

Response Body (Success) :

```json
{
  "category": "",
  "status": "false"
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update category

Endpoint : PATCH {URL}/v1/category

Request Body :

```json
{
  "category": "",
  "status": "false"
}
```

Response Body (Success) :

```json
{
  "category": "",
  "status": "false"
}
```
