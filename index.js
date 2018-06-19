import app from './config/express'
import User from './api/models/User'
import Campaign from "./api/models/Campaign";

// { force: true } will drop the table if it already exists
User.sync();
Campaign.sync({force:true});

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, () => {
  console.log(`The server is running at localhost: ${port}`);
});

export default app