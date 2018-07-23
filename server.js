const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema')
const app = express();

//wires express to graphql so the requests will hav this middleware
app.use('/graphql', expressGraphQL({
  schema,
  //GraphiQL provides a React component responsible for rendering the UI
  graphiql: true
}));

app.listen(4000, () => {
  console.log('listening');
});
