import express from 'express'
import Assignmentctrl from '../../api/controllers/AssignementController'
import validate from '../../helpers/jwt'
const router = express.Router();


router.route('/')
    .get(validate, Assignmentctrl.listByUser);

router.route('/:id_campaign')
    .get(validate, Assignmentctrl.listByCampaign)
    .post(validate, Assignmentctrl.store);

router.route('/:id_campaign/remove')
    .post(validate, Assignmentctrl.remove);


export default router
