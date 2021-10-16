const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
   id:ID
   username: String
   password: String
   email: String
  }

  type Query {
    getAllUsers: [User!]!
    User(id:ID):User!
    # post(id: ID!): Post
  }

  type Mutation {
    createUser(username:String,password:String,email:String): User!
    update(id: ID!,username:String,password:String,email:String): User!
    remove(id: ID!): User!
  }
  input UserInput {
      username: String
      password: String
      email: String
  }
`
module.exports = typeDefs;