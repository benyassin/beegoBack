import Zone from '../models/Zone'


const list = (req, res) => {
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

const create = (req, res) => {
    const data = {...req.body,userId: req.user.id};
    Zone.create(data).then((zone) => {
        res.status(201).json(zone)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};

const get = (req, res) => {
    zoneId = req.params.id_subZone;

    zoneId.findOne({where:{
            userId: req.user.id,
            id: zoneId
        }}).then((zone) => {
        res.status(200).json(zone)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};

const update = (req, res) => {
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

const remove = async (req, res) => {
    await Zone.destroy({where: {
            id:req.params.id_zone,
            userId: req.user.id
        }});
    res.sendStatus(204)
};

const duplicate = (req, res) => {
    const {id_zones : [],id_campaign} = req.body;

    Zone.find({
        where: {
        id:id_zones,
        userId: req.user.id
        },
        attributes:{
            exclude: ['id','campaignId']
        }
    }).then((zones) => {
        if(zones.length === 0) return res.status(404).json({error:'Zones not found'});

        let newZones = zones.map(zone => {
            return {...zone,campaignId:id_campaign}
        });
        Zone.bulkCreate(newZones).then(() =>{
            res.sendStatus(201)
        }).catch((e) => {
            res.status(500).json({message:e.message})
        })
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })

};

const assign = (req, res) => {
    const {id_zones : [], id_area} = req.body;

    Zone.update({areaId:id_area},{
        where:{
            id : id_zones,
            userId: req.user.id
        }
    }).then((zones) =>{
        if(zones[0] === 0){
            return res.status(405).json({error:"You don't own or this form doesn't exist"})
        }
        res.sendStatus(201)
    }).catch((e) =>{
        res.status(500).json({error:e.message})
    })
};



export default {
    list,
    create,
    get,
    update,
    remove,
    duplicate,
}