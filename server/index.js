import express from 'express';
import logger from 'morgan';
import router from './router';

const app = express();
const port = process.env.PORT || 4000;
app.set('port', port);

app.use(logger('dev'));
app.use(router);

export default function() {
  app.listen(port, () => console.log(`[api] listening on port ${port}`));
}

