import Form from '../models/Form'

const create = (req, res) => {

    let data = {
        ...req.body,
        userId: req.user.id
    };
    Form.create(data).then((campaign) => {
        res.status(201).json(campaign)
    }).catch((e) => {
        res.status(500).json({ error: e.message })
    })

};

const list = (req, res) => {

    const { offset = 0, limit = 50 } = req.query;
    Form.findAll({
        offset: offset,
        limit: limit
    }, {
            where: {
                userId: req.user.id,
                campaignId: req.query.id_campaign
            }
        }).then((forms) => {
            res.status(200).json(forms);
        }).catch((e) => {
            res.status(500).json({ error: e.message })
        })

};

const get = (req, res) => {

    let formId = req.params.id_form;

    Form.findOne({
        where: {
            id: formId,
            userId: req.user.id
        }
    }).then((form) => {
        if (!form) return res.status(404).json({ error: 'Form not found' });

        res.status(200).json(form)
    }).catch((e) => {
        res.status(500).json({ error: e.message })
    })

};

const update = (req, res) => {

    let data = { ...req.body };
    Form.update(data, {
        where: {
            id: req.params.id_form,
            userId: req.user.id
        }
    }).then((form) => {
        if (form[0] === 0) {
            return res.status(405).json({ error: "You don't own or this form doesnt's exist" })
        }
        res.sendStatus(201)
    }).catch((e) => {
        res.status(500).json({ error: e.message })
    })

};
const remove = async (req, res) => {

    await Form.destroy({
        where: {
            id: req.params.id_form,
            userId: req.user.id
        }
    });
    res.sendStatus(204)

};

const duplicate = (req, res) => {

    const formId = req.params.id_form;
    const campaignId = req.body.id_campaign;
    Form.findOne({
        where: {
            id: formId,
            userId: req.user.id
        },
        raw: true,
        attributes: { exclude: ['id', 'campaignId'] }
    }).then((form) => {
        if (!form) return res.status(404).json({ error: 'Form not found' });

        form.name = form.name + '-(copy)';
        form.campaignId = campaignId;
        Form.create(form).then((form) => {
            res.status(200).json(form)
        }).catch((e) => {
            res.status(500).json(e)
        })
    }).catch((e) => {

        res.status(500).json({ error: e.message })

    })

};

// const assign = (req, res) => {
//     const {id_campaign,id_forms:[]} = req.body;
//
//     Form.update({campaignId:id_campaign},{
//         where:{
//             id: id_forms,
//             userId:req.user.id
//         }
//     }).then((form) => {
//         if(form[0] === 0) {
//             return res.status(405).json({error:"You don't own or this form doesn't exist"})
//         }
//         res.sendStatus(201)
//     }).catch((e) => {
//         res.status(500).json({error:e.message})
//     })
// };

const toggle = (req, res) => {

    const forms = req.body.forms;

    Form.update({ isActive: req.body.activate }, {
        where: {
            id: forms,
            userId: req.user.id
        }
    }).then((count) => {
        if (count[0] === 0) {
            return res.status(405).json({ error: "You don't own or this form doesn't exist" })
        }
        res.stutus(201).json({ message: "total: " + count })
    }).catch((e) => {
        res.status(500).json({ error: e.message })
    })

};


export default {

    create,
    list,
    get,
    remove,
    update,
    duplicate,
    // assign,
    toggle
}