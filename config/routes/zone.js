import express from 'express';
import Zonectrl from '../../api/controllers/ZoneController';
import validate from '../../helpers/jwt';
const router = express.Router();


router.route('/')
    .get(validate, Zonectrl.list)
    .post(validate, Zonectrl.create);

router.route('/:id_zone')
    .get(validate, Zonectrl.get)
    .put(validate, Zonectrl.update)
    .delete(validate, Zonectrl.remove);

export default router
