import express from 'express'
import organizationCtrl from '../../api/controllers/OrganizationController'
import Auth from '../../helpers/jwt'

const router = express.Router();


router.route('/')
    .post(Auth,organizationCtrl.create);

export default router