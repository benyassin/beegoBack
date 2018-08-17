import Entity from '../models/Entity';


const list = (req, res) => {
    const { offset= 0,limit = 50} = req.query

    Entity.findAll({
        offset:offset,
        limit:limit
    },{
        where:{
            collectId: req.query.collectId
        }
    }).then((entities) => {
        res.status(200).json(entities)
    }).catch((e) => {
        res.status(500).json({error: e.message})
    })
}


const get = (req, res) => {

    let entityId = req.params.id_entity;

    Entity.findOne({},{
        where:{
            id: entityId
        }
    }).then((entity) => {
        res.stutus(200).json(entity)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
}

const update = (req, res) => {
    let data = {...req.body};

    Entity.update(data,{
        where:{
            id:req.params.id_entity,
        }
    }).then((entity) => {
        if(entity[0]=== 0 ) {
            return res.status(405).json({error:"You don't own or this campaign doesnt's exist"})
        }
        res.sendStatus(201)
    }).catch((e) => {
        res.status(500).json({error: e.message})
    })
}


const remove = async (req,res) => {
    await Entity.destroy({where: {
        id:req.params.id_entity
    }});
    res.sendStatus(204)
}


export default {
    get,
    list,
    update,
    remove
}