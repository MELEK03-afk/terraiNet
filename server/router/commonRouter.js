import express from 'express'
import { checktime, getDesponibleFields, getField, SendRequest, singIn, singUp, UpdateProfile } from '../controls/common/auth.js'


const router=express.Router()

//User router
router.post('/signUp',singUp)
router.post('/signIn',singIn)
router.post('/send-Request',SendRequest)
router.get('/getAllFields',getDesponibleFields)
router.put('/UpdateUser/:id',UpdateProfile)
router.get('/getField/:id',getField)
router.post('/checktime',checktime)
export default router