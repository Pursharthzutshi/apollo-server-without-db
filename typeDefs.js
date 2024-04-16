const { gql } = require("apollo-server");

const typeDefs = gql`
type UserList{
    id:ID!
    name:String!
    username:String!
    age:Int
    nationality: String
    friends:[User]
    favoriteMovies:[MovieList]
}

type User{
    id:ID!
    name:String!
    username:String!
    age:Int
    nationality:Nationality!
}

type MovieList{
    id:ID!
    name:String!
    yearOfPublication:Int,
    isInTheaters:Boolean!
    
}

type Query{
    UserList:[UserList]
    MovieList:[MovieList]
    user(id:ID!):UserList    
    movie(name:String!):MovieList
}

input userInputType{
    id:ID!
    name:String!
    username:String!
    age:Int!
    nationality: String
    
}

input updateUsernameType{
    id:ID!
    newUsername:String
}


type Mutation {
    createUser(user:userInputType!):UserList
    updateUsername(updateUsername:updateUsernameType):UserList
    deleteUser(id:ID!):[UserList]
}


type Subscription{
    createUser(channelId:ID!):UserList
}

# inputs




enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE

}

# type UsersSuccessfulResult{

# }

# union UserResult = 
`

module.exports =  typeDefs ;