import express from 'express'
import userCtrl from '../../api/controllers/UserController'
import Auth from '../../helpers/jwt'
import validate from './validation/validation'
// import userValidation from './validation/user'



const router = express.Router();

router.route('/')
  .get(Auth, userCtrl.load)
  .post(userCtrl.create);

router.route('/:userId')
  .put(Auth,userCtrl.update)
  .delete(Auth,userCtrl.remove);

/** Load user when API */
//router.param('userId',Auth, userCtrl.load);

export default router