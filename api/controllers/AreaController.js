import Area from '../models/Area'


const list = (req,res) => {
    const { offset = 0, limit = 50} = req.query;
    Area.findAll({
            offset: offset,
            limit: limit},
        {where:{userId: req.user.id}}).then((Areas) => {
        res.status(200).json(Areas);
    }).catch((e) => {
        res.status(500).json({error: e.message});
    })
};

const create = (req,res) => {
    let data = {...req.body,userId: req.user.id};
    Area.create(data).then((Area) => {
        res.status(201).json(Area)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};

const get = (req,res) => {
    AreaId = req.params.id_Area;

    Area.findOne({where:{
        userId: req.user.id,
        id: AreaId
        }}).then((Area) => {
            res.status(200).json(Area)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};

const update = (req,res) => {
    const data = {...req.body};
    Area.update(data,{
        where: {
            id:req.params.id_Area,
            userId:req.user.id
        }
    }).then((Area) => {
        if(Area[0] === 0) {
            return res.status(405).json({error:"You don't own or this Area doesnt's exist"})
        }
        res.sendStatus(201)
    }).catch((e) => {
        res.status(500).json({error: e.message})
    })
};

const remove = async (req,res) => {
    await Area.destroy({where: {
        id:req.params.id_Area,
        userId: req.user.id
        }});
    res.sendStatus(204)
};

const duplicate = (req, res) => {

};

export default {list, create, get, update, remove}