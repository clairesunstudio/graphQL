const graphql = require('graphql')
const axios = require('axios')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql


const UserType =  new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:300/users/${args.id}`)
          .then(resp => resp.data) //pairing down the response coming down from axios request which was nested in { "data": {}}
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
