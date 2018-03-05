const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

const typeDefs = `
    schema {
      query: Query
      mutation: Mutation
    }

    type Query {
      author(firstName: String, lastName: String): Author
      allAuthors: [Author]
      getFortuneCookie: String @cacheControl(maxAge: 5)
    }

    type Author {
      id: Int
      firstName: String
      lastName: String
      posts: [Post]
    }

    type Post {
      id: Int
      title: String
      text: String
      views: Int
      author: Author
    }   

    type Mutation{
      createAuthor(firstName:String! lastName:String!): Author!
    }
  
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// export default schema;
module.exports = schema;
