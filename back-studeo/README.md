# Node JS / Express micro-service API

## I - Install dependancies
```sh
yarn
```

## II - Init environment variables
```sh
yarn init:env
```
> You can provide env variables like:
>
> - Application port: PORT=8080
> - Database Url (optional): DATABASE_URL='mongodb://localhost:27017/test-db'

## III - Init localhost database
```sh
yarn init:db
```

## IV - Start server
```sh
yarn start
```

## V - Run unit tests
```sh
yarn test
```

## VI - Run code coverage
```sh
yarn test:cov
```

## Middleware
To add some more **global** middleware, you'll have to update the file `./src/index.js`

## Available endpoints
### Healthz

| Type  | Uri      | Description       |
| ----- | -------- | ----------------- |
| [GET] | /healthz | Check the healthy |

### Login

| Type     | Uri          | Description         | Data source  |
| ------   | ------------ | ------------------- | ------------ |
| [POST]   | /login       | Post login request  | n/a          |

### Users

| Type   | Uri    | Description   | Data source  |
|--------|--------|---------------| ------------ |
| [POST] | /users | Create user   | n/a          |
| [GET]  | /users | Get all users | n/a          |

### Questions

| Type   | Uri        | Description            | Data source  |
|--------|------------|------------------------| ------------ |
| [POST] | /questions | Insert single question | n/a          |
| [GET]  | /questions | Get all questions      | n/a          |

### Answers

| Type   | Uri                   | Description               | Data source  |
|--------|-----------------------|---------------------------| ------------ |
| [POST] | /answers              | Insert user's response    | n/a          |
| [GET]  | /answers/:questionId  | Get answers by questionId | n/a          |

### User-Answers

| Type   | Uri                               | Description                       | Data source  |
|--------|-----------------------------------|-----------------------------------| ------------ |
| [GET]  | /user-answers/:userId/:questionId | Get user's response by questionId | n/a          |
| [POST] | /user-answers/:questionId         | Insert user's response            | n/a          |