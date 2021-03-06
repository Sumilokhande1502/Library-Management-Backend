import express from 'express';
import mongoose from 'mongoose';
import df from "./default/default";
import route from "./routes/router";
import dotenv from "dotenv";

dotenv.config();

const uri = df.uri as string;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", route);

//MongoDB connection
function mongoSetup() {
    // mongoose.Promise = global.Promise;
    mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true,useFindAndModify:false  ,useCreateIndex: true});
    const db = mongoose.connection
    db.on('error', (err) => {
        console.log("Error while connecting DB", err);
    })
    db.once('open', () => {
        console.log("DB Connected!!!");
    })
}


  
async function bootstrap() {
  const PORT = process.env.PORT;
  const HOST = process.env.HOST;
  console.log(`Server is running at http://${HOST}:${PORT}`);
  await app.listen(PORT);

  mongoSetup()
}

bootstrap();

