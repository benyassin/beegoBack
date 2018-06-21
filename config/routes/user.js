import express from 'express'
import userCtrl from '../../api/controllers/UserController'
import validate from '../../helpers/jwt'

const router = express.Router();

router.route('/')
  .get(validate, userCtrl.list)
  .post(userCtrl.create);

router.route('/:userId')
  .get(validate, userCtrl.get)
  .put(validate, userCtrl.update)
  .delete(validate, userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

export default router