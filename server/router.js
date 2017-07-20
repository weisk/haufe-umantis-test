import express from 'express';
import path from 'path';
import * as _ from 'lodash';

import books from './books'

const router = express.Router();

const list = _.map(books, (book) => {
  return { id: book.id, name: book.name };
});

// enable CORS middleware only on development

if (!process.env.PROD) {
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

// public api

router.get('/api/books', (req, res) => {
  res.status(200).send(list);
});

router.get('/api/books/:bookId', (req, res) => {
  const item = _.find(books, { id: parseInt(req.params.bookId) });
  if (item) {
    res.status(200).send(item);
  } else {
    res.status(404).end();
  }
});

// static files

if (process.env.PROD) {
  const publicPath = path.join(__dirname, '../public');
  const nodeModulesPath = path.join(__dirname, '../node_modules');

  router.use(express.static(publicPath));

  router.use('/node_modules', express.static(nodeModulesPath));

  router.get('*', (req, res, next) => {
    const index = path.join(__dirname, '../public/index.html')
    res.sendFile(index);
  });
}

export default router;
