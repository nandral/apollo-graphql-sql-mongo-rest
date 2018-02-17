import "babel-polyfill";

import compression from "compression";
import express from "express";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import schema from "./data/schema";
import { Engine } from "apollo-engine";

const GRAPHQL_PORT = 3000;
const ENGINE_API_KEY = "service:nandral_apollo_engine_1:_ZKV_ICGYUQj_hkrkr4OkA";

const graphQLServer = express();

const engine = new Engine({
  engineConfig: {
    apiKey: ENGINE_API_KEY,
    stores: [
      {
        name: "inMemEmbeddedCache",
        inMemory: {
          cacheSize: 20971520 // 20 MB
        }
      }
    ],
    queryCache: {
      publicFullQueryStore: "inMemEmbeddedCache"
    }
  },
  graphqlPort: GRAPHQL_PORT
});

engine.start();
// This must be the first middleware
graphQLServer.use(engine.expressMiddleware());
graphQLServer.use(compression());

graphQLServer.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    tracing: true, // This option turns on tracing
    cacheControl: true
  })
);
//Enable GraphiQL IDE for easy testing
graphQLServer.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
