import express from 'express'
import CampaignCtrl from '../../api/controllers/CampaignController'
import Auth from '../../helpers/jwt'

const router = express.Router();


router.route('/')
    .get(Auth,CampaignCtrl.list)
    .post(Auth,CampaignCtrl.create);
    
router.route('/:id_campaign')
    .get(Auth,CampaignCtrl.get)
    .put(Auth,CampaignCtrl.update)
    .delete(Auth,CampaignCtrl.remove);

export default router