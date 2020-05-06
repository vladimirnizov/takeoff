const { ApolloServer }  = require('apollo-server');
const mongoose          = require('mongoose')
const fs                = require('fs')
const path              = require('path')

const resolvers = require('./resolvers')
const User      = require('./models/user')
const Contact   = require('./models/contact')


require('dotenv').config({ path: '.env' })

const typeDefs = fs.readFileSync(path.join(__dirname, 'typeDefs.gql'), 'utf-8')

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('DB connected'))
    .catch(err => console.error(err))

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Contact
    }
})

server.listen(4500).then(({ url }) => {
    console.log(`Server listening on ${url}`);
})