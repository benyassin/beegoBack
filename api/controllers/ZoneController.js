import subZone from '../models/Zone'


const list = (req,res) => {
    const { offset = 0, limit = 50} = req.query;
    subZone.findAll({
            offset: offset,
            limit: limit},
        {where:{userId: req.user.id}}).then((subZones) => {
        res.status(200).json(subZones);
    }).catch((e) => {
        res.status(500).json({error: e.message});
    })
};

const create = (req,res) => {
    data = {...req.body,userId: req.user.id};
    subZone.create(data).then((subZone) => {
        res.status(201).json(subZone)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};

const get = (req,res) => {
    subZoneId = req.params.id_subZone;

    subZone.findOne({where:{
            userId: req.user.id,
            id: subZoneId
        }}).then((subZone) => {
        res.status(200).json(subZone)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};

const update = (req,res) => {
    const data = {...req.body};
    subZone.update(data,{
        where: {
            id:req.params.id_subZone,
            userId:req.user.id
        }
    }).then((subZone) => {
        if(subZone[0] === 0) {
            return res.status(405).json({error:"You don't own or this subZone doesnt's exist"})
        }
        res.sendStatus(201)
    }).catch((e) => {
        res.status(500).json({error: e.message})
    })
};

const remove = async (req,res) => {
    await subZone.destroy({where: {
            id:req.params.id_subZone,
            userId: req.user.id
        }});
    res.sendStatus(204)
};


export default {list, create, get, update, remove}