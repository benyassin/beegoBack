import Collect from '../models/Collect'
import Entity from '../models/Entity';
import EntityCtrl from '../controllers/EntityController'

const create = (req, res) => {

    Collecte.create({
        form : req.body.form,
        campaignId : req.body.campaignId,
        data : req.body.data
    }).then((collect) => {
        let entities = req.body.entities.map((entity) => {
            return { ...entity, collectId: collect.id }
        })

        EntityCtrl.createBulk(entities).then((result) => {
            if (result.error === true) {
                res.status(500).json(result.message)
            }
        })

    }).catch((e) => {
        return res.status(500).json({ error: e.message })
    })
}



const list = (req, res) => {

    const { offset = 0, limit = 50 } = req.query

    Collect.findAll({
        offset: offset,
        limit: limit
    }, {
            where: {
                campaignId: req.query.campaignId
            }
        }).then((collects) => {
            res.status(200).json(collects)
        }).catch((e) => {
            res.status(500).json({ error: e.message })
        })
}

const get = (req, res) => {

    let collectId = req.params.id_campaign;

    Collect.findOne({}, {
        where: {
            id: collectId
        },
        include: [Entity]
    }).then((collect) => {
        res.status(200).json(collect)
    }).catch((e) => {
        res.status(500).json({ error: e.message })
    })
}

const update = (req, res) => {
    let data = { ...req.body };

    Collect.update(data, {
        where: {
            id: req.params.id_campaign,
        }
    }).then((campaign) => {
        if (campaign[0] === 0) {
            return res.status(405).json({ error: "You don't own or this campaign doesnt's exist" })
        }
        res.sendStatus(201)
    }).catch((e) => {
        res.status(500).json({ error: e.message })
    })
}

const remove = async (req, res) => {
    await Collect.destroy({
        where: {
            id: req.params.id_collect
        }
    });
    res.sendStatus(204)
}

export default {
    create,
    list,
    update,
    get,
    remove
}