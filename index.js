import app from './config/express'
import url from 'url'
// { force: true } will drop the table if it already exists

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, () => {
  console.log(`The server is running at localhost: ${port}`);
});


export default app
