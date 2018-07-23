import express from 'express'
import userCtrl from '../../api/controllers/UserController'
import Auth from '../../helpers/jwt'
import validate from './validation/validation'
// import userValidation from './validation/user'



const router = express.Router();

router.route('/')
  .get(Auth,validate, userCtrl.list)
  .post(userCtrl.create);

router.route('/:userId')
  .get(Auth, userCtrl.get)
  .put(Auth, userCtrl.update)
  .delete(Auth, userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

export default router