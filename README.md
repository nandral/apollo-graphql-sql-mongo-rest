# apollo-graphql-sql-mongo-rest

GraphQL server that connects to multiple backends: a SQL database, a MongoDB database and a REST endpoint. 

# Demo

https://graphql-sql-mongo-rest-nandral.c9users.io/graphiql

When you paste below GraphQL query on the left side of the page:

```
query{
  allAuthors {
    firstName
    lastName
  }
  getFortuneCookie
}

```

and hit the play button (cmd-return), then you should get this on the right side should show some sample data served from GraphQL Server which aggregates data from SQL, MongoDB and REST API.

## Getting started

```bash
git clone https://github.com/nandral/apollo-graphql-sql-mongo-rest.git
cd apollo-graphql-sql-mongo-rest
npm install
npm start
```


