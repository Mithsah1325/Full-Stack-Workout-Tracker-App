import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose'
import workoutRoute from './routes/workouts.js'
import userRoute from './routes/user.js'


//Enable All CORS Requests
// app.use(cors())

// Express app
const app = express();

const port = process.env.PORT;

// Middleware
app.use(express.json())

app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
});

// Route
app.use('/api/workouts', workoutRoute)
app.use('/api/user', userRoute)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB is connecteed')
    })
    .catch((error) => {
        console.log(error)
    })

// Listen for requests
app.listen(port, () => {
    console.log(`Server is running at : ${port}`);
});
