# Codemania Task

This project was generated with ❤.

## Installation


1. Clone repository - `$ git clonehttps://github.com/TijanAyo/simple-sm-platform.git`

2. Install dependencies - `$ cd simple-sm-platform`

3. Install dependencies - `$ npm install`

4. Create a new file `.env` if it doesn't exist and copy the contents of `.env.example` into it to be able to run your server on production environment.

<br>

## Running the app

```bash
# development
$ npm run start

# watch mode
# Server should be running on http://localhost:4000/ by default
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Setting up DB
```bash
# Make sure you have mysql or postgresql installed, you could use any database of your choice

# Initialize Prisma 
$ npx prisma init

# Connect to your db by providing the appropriate credentials, check .env.example for a similar example

# Migrate the Database 
$ prisma migrate dev --name init

# Start up prisma studio
$ npx prisma studio
```


## Testing the api

1. Via Postman Collection (https://documenter.getpostman.com/view/19118409/2s8ZDR7kpJ)

2. Via Swagger, viewing the api locally (http://localhost:4000/api-doc)
