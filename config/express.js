import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/index'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount all routes on / path
app.use('/', routes);

export default app