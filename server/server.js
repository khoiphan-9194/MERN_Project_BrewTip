const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const multer = require('multer');
const cors = require('cors');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      return cb(null, '../client/public/uploads');
    },
    filename: (req, file, cb) => {
     return cb(null, `${file.originalname}`);
    }
  });

  const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
 console.log(req.body);
    console.log(req.file);
  });



 

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });

    app.get('/upload/:filename', (req, res) => {
      res.sendFile(path.join(__dirname, `../client/dist/uploads/${req.params.filename}`));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
  startApolloServer();