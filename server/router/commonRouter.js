import express from 'express'
import { getDesponibleFields, sendrequest, singIn, singUp } from '../controls/common/auth.js'


const router=express.Router()

//User router
router.post('/signUp',singUp)
router.post('/signIn',singIn)
router.post('/send-Request',sendrequest)
router.get('/getAllFields',getDesponibleFields)
export default router