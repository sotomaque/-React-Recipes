const express = require('express'); // node server
const mongoose = require('mongoose'); // use mongoose to create schemas
const bodyParser = require('body-parser'); // middleware
require('dotenv').config({ path: 'variables.env' }); // mongoURL variable

// mongoose declared models
const Recipe = require('./models/Recipe'); 
const User = require('./models/User');

// GraphQL-Express Middleware
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools')

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Create GQL Schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// Connect to DB
mongoose
    .connect(process.env.MONGO_URL, {
         useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB CONNECTED'))
    .catch(err => console.error(err))

// Initialize Application
const app = express();

// Create GraphiQL Application
app.use(
    '/graphiql', 
    graphiqlExpress({ endpointURL: '/graphql'})
);

// Connect mongoose schemas with GraphQL
app.use(
    '/graphql',
    bodyParser.json(), 
    graphqlExpress({
        schema,
        context: {
            Recipe,
            User
        }
    })
);

// set default port
const PORT = process.env.PORT || 4444;

// begin listening to port #
app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}`)
})