import Campaign from '../models/Campaign'


const create = (req ,res) => {
    console.log(req.user);
    Campaign.create({
        name: req.body.name,
        userId: req.user.id
    }).then((Campaign) => {
        res.status(201).json(Campaign);
    }).catch((e) => {
        res.status(500).json({ error: e.message });
    });
};


export default {create}