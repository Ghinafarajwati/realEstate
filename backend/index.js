import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from '../backend/Routes/userRoute.js'
import authRouter from '../backend/Routes/authRoute.js'
import listingRouter from '../backend/Routes/listingRoute.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

mongoose.set('strictQuery', false)
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MONGODB database connected')
    } catch (err) {
        console.error('failed', err)
    }
}

app.use(express.json())
app.use(cookieParser())
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)


//Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(port, () => {
    connect()
    console.log(`Server listening on port ${port}`)
})

