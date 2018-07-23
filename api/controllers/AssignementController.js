import Assignment from '../models/Assignment'


const listByCampaign = (req, res) => {
    Assignment.findAll({
        where: {
            id_campaign:req.params.id_campaign
        }
    }).then((Assignments) => {
        res.status(200).json(Assignments)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};

const listByUser = (req, res) => {
    Assignment.findAll({
        where: {
            id_user : req.user.id
        }
    }).then((Assignments) => {
        res.status(200).json(Assignments)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};

const store = (req, res) => {
    const area = req.body.area;
    const users = req.body.users;
    let assignments = users.map(user => {
        return {
            id_area: area,
            id_campaign:req.params.id_campaign,
            id_user:user
        }
    });
    Assignment.bulkCreate(assignments).then(() =>{
        res.sendStatus(201)
    }).catch((e) => {
        res.status(500).json({message:e.message})
    })
};

const remove = (req, res) => {
    const users = req.body.users;
    const area = req.body.area;
    Assignment.detroy({
        where: {
            id_user: users,
            id_area: area,
            id_campaign: req.params.id_campaign
        }
    }).then((total) =>{
        if(total[0] ===0 ){
            return res.status(500).json({error:'Error deleting Assignments'})
        }
        res.status(200).json({deleted:total})
    }).catch((e) =>{
        res.status(500).json({error:e.message})
    })
};

export default { listByUser, listByCampaign, store, remove}