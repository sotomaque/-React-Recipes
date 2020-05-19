const express = require('express'); // node server
const mongoose = require('mongoose'); // use mongoose to create schemas
const bodyParser = require('body-parser'); // middleware
const cors = require('cors'); // for cross-domain requests
const jwt = require('jsonwebtoken'); // jwt for token auth
require('dotenv').config({ path: 'variables.env' }); // mongoURL variable

const path = require('path'); // for sending down a file in production mode

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

// Configure Cors
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));

// set up JWT Auth
app.use(async (request, response, next) => {
    const token = request.headers['authorization'];
    
    if (token !== 'null') {
        // verify token
        try {
            const currentUser = await jwt.verify(token, process.env.SECRET);
            request.currentUser = currentUser;
        } catch (err) {
            console.error(err)
        }
    }
    next();
});

// Create GraphiQL Application
// app.use(
//     '/graphiql', 
//     graphiqlExpress({ endpointURL: '/graphql'})
// );

// Connect mongoose schemas with GraphQL
app.use(
    '/graphql',
    bodyParser.json(), 
    graphqlExpress(({ currentUser }) => ({
        schema,
        context: {
            Recipe,
            User,
            currentUser
        }
    }))
);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    // add middleware
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build',
        'index.html'));
    })
}

// set default port
const PORT = process.env.PORT || 4444;

// begin listening to port #
app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}`)
})