import express from 'express'
import CampaignCtrl from '../../api/controllers/CampaignController'
import validate from '../../helpers/jwt'
const router = express.Router();


router.route('/').post(validate,CampaignCtrl.create);



export default router