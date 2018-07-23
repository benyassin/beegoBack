import express from 'express'
import Formctrl from '../../api/controllers/FormController'
import auth from '../../helpers/jwt'
const router = express.Router();

router.route('/')
    .get(auth,Formctrl.list)
    .post(auth,Formctrl.create);

router.route('/:id_form')
    .get(auth,Formctrl.get)
    .put(auth,Formctrl.update)
    .delete(auth,Formctrl.remove);

router.route('/:id_form/duplicate')
    .post(auth,Formctrl.duplicate);

export default router