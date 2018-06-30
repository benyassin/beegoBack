import Zone from '../models/Zone'


const list = (req,res) => {
    const { offset = 0, limit = 50} = req.query;
    Zone.findAll({
            offset: offset,
            limit: limit},
        {where:{userId: req.user.id}}).then((zones) => {
        res.status(200).json(zones);
    }).catch((e) => {
        res.status(500).json({error: e.message});
    })
};

const create = (req,res) => {
    const data = {...req.body,userId: req.user.id};
    Zone.create(data).then((zone) => {
        res.status(201).json(zone)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};

const get = (req,res) => {
    zoneId = req.params.id_subZone;

    zoneId.findOne({where:{
            userId: req.user.id,
            id: subZoneId
        }}).then((zone) => {
        res.status(200).json(zone)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};

const update = (req,res) => {
    const data = {...req.body};
    Zone.update(data,{
        where: {
            id:req.params.id_zone,
            userId:req.user.id
        }
    }).then((zone) => {
        if(zone[0] === 0) {
            return res.status(405).json({error:"You don't own or this zone doesnt's exist"})
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