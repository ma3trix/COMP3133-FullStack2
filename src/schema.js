// src/schema.js

const { gql } = require('apollo-server-express');

// Define GraphQL schema
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    getAllEmployees: [Employee!]!
    searchEmployeeById(eid: ID!): Employee
    # Add more queries as needed
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User!
    login(usernameOrEmail: String!, password: String!): User
    addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee!
    updateEmployeeById(eid: ID!, first_name: String, last_name: String, email: String, gender: String, salary: Float): Employee
    deleteEmployeeById(eid: ID!): Employee
    # Add more mutations as needed
  }
`;

module.exports = typeDefs;
