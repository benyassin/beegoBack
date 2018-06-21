import express from 'express'
import Formctrl from '../../api/controllers/FormController'
import validate from '../../helpers/jwt'
const router = express.Router();

router.route('/')
    .get(validate,Formctrl.list)
    .post(validate,Formctrl.create);

router.route('/:id_form')
    .get(validate,Formctrl.get)
    // .put(validate)
    .delete(validate,Formctrl.remove);

router.route('/:id_form/duplicate')
    .get(validate,Formctrl.duplicate);

export default router