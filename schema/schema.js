const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

// Creates some paths to user GET invocation
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

// Creates the root of the graphql middleware
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // POST invocation
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

// Wires graphql to the root config
module.exports = new GraphQLSchema({
  query: RootQuery
})
