import express from 'express';
import logger from 'morgan';
import router from './router';

const app = express();
const port = process.env.PORT || 4000;
app.set('port', port);

app.use(logger('dev'));
app.use(router);

app.listen(port, () => console.log(`listening on port ${port}`));
