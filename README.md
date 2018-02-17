# apollo-graphql-sql-mongo-rest

GraphQL server that connects to multiple backends: a SQL database, a MongoDB database and a REST endpoint. 

## Getting started

```bash
git clone https://github.com/nandral/apollo-graphql-sql-mongo-rest.git
cd apollo-graphql-sql-mongo-rest
npm install
npm start
```

Then open [http://localhost:3000/graphiql](http://localhost:3000/graphiql)

When you paste this on the left side of the page:

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

