import express from 'express'
import { addField, deleteField, deleteuser, getFieldsOwner, getUser, updateField, UpdateUSer } from '../controls/owner/fields.js'
import { protect } from '../MidelWer/auth.js'


const router = express.Router()

//Fields router
router.post('/add-field',addField)
router.get('/get-fields-Owner',protect,getFieldsOwner)
router.put('/update-fields/:id',protect,updateField)
router.delete('/delete-fields/:id',protect,deleteField)

//User Router
router.get('/getUsers',getUser)
router.delete('/deleteUser/:id',deleteuser)
router.put('/Update-User/:id',UpdateUSer)




export default router