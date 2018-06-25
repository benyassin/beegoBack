import Form from '../models/Form'

const create = (req,res) => {
    let data = {...req.body,
        userId:req.user.id,};
    Form.create(data).then((campaign) => {
        res.status(201).json(campaign)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};

const list = (req,res) => {
    const { offset = 0, limit = 50} = req.query;
    Form.findAll({
        offset: offset,
        limit: limit
    },{
        where:{
            userId:req.user.id
        }
    }).then((forms) => {
      res.status(200).json(forms);
    }).catch((e) => {
        res.status(500).json({error: e.message})
    })
};

const get = (req,res) => {
    let formId = req.params.id_form;

    Form.findOne({
        where: {
            id: formId,
            userId: req.user.id
        }
    }).then((form) => {
        if(!form) return res.status(404).json({error:'Form not found'});

        res.status(200).json(form)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};

const update = (req,res) => {
    let data = {...req.body};
    Form.update(data,{
        where:{
            id: req.params.id_form,
            userId: req.user.id
        }
    }).then((form) => {
        if(form[0] === 0) {
            return res.status(405).json({error:"You don't own or this form doesnt's exist"})
        }
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};
const remove = async (req,res) => {
    await Form.destroy({where:{
        id:req.params.id_form,
        userId: req.user.id
        }});
    res.sednStatus(204)
};

const duplicate = (req,res) => {
    let formId = req.params.id_form;
    Form.findOne({
        where: {
            id:formId,
            userId: req.user.id
        },
        raw: true,
        attributes: { exclude: ['id'] }
    }).then((form) => {
        if(!form) return res.status(404).json({error:'Form not found'});
        // form = form.get({
        //     plain: true
        // });
        console.log(form);
        form.name = form.name + '-(copy)';
            Form.create(form).then((form) => {
                res.status(200).json(form)
            }).catch((e) => {
                res.status(500).json(e)
            })
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};
export default {create, list, get, remove, update, duplicate}