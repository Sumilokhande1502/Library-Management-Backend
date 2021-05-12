import express from 'express';
import mongoose from 'mongoose';
import df from './default/default';
import route from './routes/router';

const port = df.port as number;
const host = df.host as string;



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/api", route);



//MongoDB connection
mongoose.connect('mongodb://localhost:27017/database', { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to Database');
})
.catch(() => {
    console.log('Error');
})





app.listen(5000, () => console.log(`Server is running at http://${host}:${port}`));