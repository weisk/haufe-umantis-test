import express from 'express';
import path from 'path';
import * as _ from 'lodash';

import books from './books'

const router = express.Router();

// cors middleware
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const list = _.map(books, (book) => {
  return { id: book.id, name: book.name };
});

router.get('/books', (req, res) => {
  res.status(200).send(list);
});

router.get('/books/:bookId', (req, res) => {
  const item = _.find(books, { id: parseInt(req.params.bookId) });
  if (item) {
    res.status(200).send(item);
  } else {
    res.status(404).end();
  }
});

// catch-all route
router.get('*', (req, res, next) => {
  res.status(404).end();
});

export default router;
