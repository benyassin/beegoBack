import express from 'express'
import CampaignCtrl from '../../api/controllers/CampaignController'
import validate from '../../helpers/jwt'
const router = express.Router();


router.route('/')
    .get(validate,CampaignCtrl.list)
    .post(validate,CampaignCtrl.create);
router.route('/:id_campaign')
    .get(validate,CampaignCtrl.get)
    .put(validate,CampaignCtrl.update)
    .delete(validate,CampaignCtrl.remove);

export default router