import express from 'express';
import CollectCtrl from '../../api/controllers/CollectController';
import Auth from '../../helpers/jwt';

const router = express.Router();


router.route('/')
    .get(Auth, CollectCtrl.list)
    .post(Auth, CollectCtrl.create)

router.route('/:id_collect')
    .get(Auth, CollectCtrl.get)
    .put(Auth, CollectCtrl.update)
    .delete(Auth, CollectCtrl.remove)

export default router