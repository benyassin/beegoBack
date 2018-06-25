import Assignement from '../models/Assignement'


const list = (req ,res) => {
    Assignement.findAll({
        where: {
            id_user : req.user.id
        }
    }).then((assignements) => {
        res.status(200).json(assignements)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};

const store = (req, res) => {
    const areas = {...req.body.areas};
    const user = req.body.user
    areas.map(area => {
        return {id_area: area,id_campaign:req.params.id_campaign,id_user:user}
    })
    Assignement.bulkCreate(areas).then(() =>{
        res.sendStatus(201)
    }).catch((e) => {
        res.status(500).json({message:e.message})
    })
};