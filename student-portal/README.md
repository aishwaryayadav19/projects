# Student Portal ⭐

## Project Setup 💻

You need yarn, react, node, and mysql installed in your machine.

```
Clone the project and
$ cd student-portal

Checkout to the student-portal branch
$ git checkout student-portal

Always pull the latest code
$ git pull origin student-portal
```

Setup the database
```
Open the queries.txt file
Execute the commands in the given sequence on your local mysql server
```

You should have

```
John Doe added as an admin to the database
```

Now your database is ready

<br />

Setup the server
```
Move to the server project
$ cd student-portal-server

In the config file on the path /src/config/index.ts : add your mysql username and password to the db config and save the file.

Install package dependencies
$ yarn

Run application in DEV mode
$ yarn dev
```

You should see

```
Student Service is ready to rock and roll .. �🚀 .. { host: '0.0.0.0', port: 8484 }
```

Now you can hit the APIs at http://localhost:8484

<br />

Setup the frontend service
```
Move to the frontend project
$ cd student-portal-ui

Install package dependencies
$ yarn

Run application in DEV mode
$ yarn dev
```

You should see

```
event - compiled successfully
```

Now you can visit the UI at http://localhost:8182

<br />
