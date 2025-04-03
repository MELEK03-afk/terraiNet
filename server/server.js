import express from 'express'
import colors from 'colors'
import cors from "cors"
import connectToMongoose from './config/DBconfig.js'
import commonRouter from './router/commonRouter.js'
import ownerRouter from './router/ownerRoutes.js'

const port=process.env.PORT

const app=express()
app.use(express.json())
connectToMongoose()
app.use(cors())

app.use('/api',commonRouter)
app.use('/api/owner',ownerRouter)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`.blue.underline)
})