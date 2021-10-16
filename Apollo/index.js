
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const resolvers = require('./schema/resolvers');
const typeDefs = require('./schema/typeDefs');
const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
const PORT =5000
server.applyMiddleware({ app });
app.listen(PORT,()=>{
    console.log(`Server is runing http://localhost:${PORT}${server.graphqlPath}`);
})