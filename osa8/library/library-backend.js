const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()



const MONGODB_URI = `mongodb+srv://dbUser:${process.env.MONGOPASSWORD}@cluster0.u9b7f.mongodb.net/LibraryDb?retryWrites=true&w=majority`
const JWT_SECRET = process.env.SECRET;
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type Author {
    name: String!
    id: ID!
    born: String
    bookCount: Int!
  }

  type Book {
      title: String!
      published: Int!
      author: Author
      id: ID!
      genres: [String!]
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
    genre: String
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(genre: String): [Book!]
      allAuthors: [Author!]
      me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: ID!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      id: ID!
      setBornTo: Int!
    ):Author
    addAuthor(
      name:String!
      born:Int
      bookcount:Int
    ):Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
      bookCount: () => Book.countDocuments(),
      authorCount: () => Author.countDocuments(),
      allBooks: (root, args) => {
        if (!args.genre){
          return Book.find({}).populate('author')
        }else if (args.genre){
          try{
            return Book.find({genres: {$in:[args.genre]}}).populate('author')
          }catch(error){
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
                    
        }else{
          return null
        }


      },
      allAuthors: () => {
        return Author.find({})
      },

      me: (root, args, context) => {
        return context.currentUser
      }
  },

  Author:{
      bookCount: (root) => {
        return Book.find({author: root.author})
      }
  },
  
  Mutation: {
    addBook: (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      try{
        const book = new Book({...args})
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book.save()
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      
    },

    addAuthor: (root, args) => {
      try{
        const author = new Author({...args})

        return author.save()
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

    },

    editAuthor: (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      try{
        return Author.findByIdAndUpdate(args.id, { born: args.setBornTo}, {new: true})

      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      
      
    },

    createUser: (root, args) => {
      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
      try{
        return user.save();
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    login: async (root,args) => {
      
      try{
        const user = await User.findOne({ username: args.username })

        if ( !user || args.password !== 'open' ) {
          throw new UserInputError("wrong name or password")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
        
        return { value: jwt.sign(userForToken, JWT_SECRET), genre: user.favoriteGenre }
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }


}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})