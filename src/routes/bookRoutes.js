const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const collection = await db.collection('books');

        const books = await collection.find().toArray();
        res.render('booksListView', {
          nav,
          title: 'Library',
          books
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });

  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const collection = await db.collection('books');

        const book = await collection.findOne({ _id: new ObjectID(id) });
        res.render('bookView', {
          nav,
          title: 'Library',
          book
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });

  return bookRouter;
}

module.exports = router;
