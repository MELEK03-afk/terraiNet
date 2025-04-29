import express from 'express'
import { AccepteRequest, addField, deleteField,  deleteRequest,  getFieldsOwner,  getRequest,  getReservation,  updateField  } from '../controls/owner/OwnerControlers.js'
import { protect } from '../MidelWer/auth.js'


const router = express.Router()

//Fields router
router.post('/add-field',protect,addField)
router.get('/get-fields-Owner/:id',protect,getFieldsOwner)
router.put('/update-fields/:id',protect,updateField)
router.delete('/delete-field/:id',protect,deleteField)
router.get('/get-Requests-Owner/:id',protect,getRequest)
router.get('/get-Reservation-Owner/:id',protect,getReservation)
router.delete('/deleteRequest/:id',protect,deleteRequest)
router.post('/AccepteRequest/:id',protect,AccepteRequest)





export default router