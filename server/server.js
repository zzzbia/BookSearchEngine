const express = require("express");
const path = require("path");
const db = require("./config/connection");
//need to remove routes
const routes = require("./routes");
//Add Apollo Server to handle GraphQL
const { ApolloServer } = require("apollo-server-express");
//Add GraphQL schema
const { typeDefs, resolvers } = require("./schemas");
//Add auth middleware
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(routes);

db.once("open", () => {
	app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
