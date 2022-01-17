import express from 'express'
import { deleteUser, getUsers, getUsersById,postUser, putUser } from '../controllers/users.js';
import { authenticate,authorize } from '../middleware/auth.js';
const router = express.Router();
router.get('/', getUsers);
router.get('/:_id', getUsersById);
router.post('/', postUser);
router.put('/:_id', putUser);
router.delete('/:_id',deleteUser)
router.get( '/', authenticate,authorize( [ 'admin' ] ),  getUsers );

/*
const PORT=process.env.PORT||5000;
app.listen( PORT ,err =>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log(`sucessfully started http://localhost:${PORT}`);
}
    )*/
  //  router.get( '/', authenticate, authorize( [ 'admin' ] ), getUsers );

export default router