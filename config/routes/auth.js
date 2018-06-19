import express from 'express'
import authCtrl from '../../api/controllers/AuthController'

const router = express.Router();

router.route('/')
  .post(authCtrl.authenticate, authCtrl.generateJWT, authCtrl.returnJWT);

router.route('/refresh')
  .post(authCtrl.refreshJWT, authCtrl.generateJWT, authCtrl.returnJWT);

export default router