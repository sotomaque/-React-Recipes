exports.typeDefs=`
    type Recipe {
        name: String!
        category: String!
        description: String!
        instructions: String!
        createdDate: String!
        links: Int
        username: String
    }

    type User {
        username: String! @unique
        password: String!
        email: String!
        joinDate: String
        favorites: [Recipe]
    }

    type Query {
        getAllRecipes: [Recipe]
    }
`