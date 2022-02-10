/**
* Required External Modules
*/
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import session  from "express-session";
import mongoose  from "mongoose";
import apiRouter from "../routes/api.router";
const MongoStore = require("connect-mongo")(session);

 dotenv.config();
/**
 * App Variables
 */
 if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

/**
 *  Mongoose connection
 */
mongoose
  .connect(process.env.MONGODB_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to database`))
  .catch((err) => console.error(err));

// EXPRESS SERVER INSTANCE
const app = express();

/**
*  App Configuration
*/
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 30 * 24 * 60 * 60, // 30 days
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

// ROUTER
app.use("/api", apiRouter);

/**
 * Server Activation
 */
 app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});