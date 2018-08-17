import express from 'express';
import EntityCtrl from '../../api/controllers/EntityController';
import Auth from '../../helpers/jwt';

const router = express.Router();


router.route('/')
    .get(Auth, EntityCtrl.list)

router.route('/:id_entity')
    .get(Auth, EntityCtrl.get)
    .put(Auth, EntityCtrl.update)
    .delete(Auth, EntityCtrl.remove);

export default router