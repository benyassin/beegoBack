import express from 'express'
import Areactrl from '../../api/controllers/AreaController'
import validate from '../../helpers/jwt'
const router = express.Router();


router.route('/')
    .get(validate, Areactrl.list)
    .post(validate, Areactrl.create);

route.route('/:id_area')
    .get(validate, Areactrl.get)
    .put(validate, Areactrl.update)
    .delete(validate, Areactrl.remove);

