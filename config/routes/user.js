import express from 'express'
import jwt from 'express-jwt'
import config from '../env/index'
import userCtrl from '../../api/controllers/UserController'


const router = express.Router();
const secret = config.jwt.jwtSecret;

router.route('/')
  .get(jwt({ secret }), userCtrl.list)
  .post(userCtrl.create);

router.route('/:userId')
  .get(jwt({ secret }), userCtrl.get)
  .put(jwt({ secret }), userCtrl.update)
  .delete(jwt({ secret }), userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

export default router