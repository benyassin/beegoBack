import Campaign from '../models/Campaign'


const create = (req ,res) => {

    let data = {...req.body};
    
    data.userId = req.user.id;
    data.organizationId = req.user.organizationId

    Campaign.create(data).then((Campaign) => {
        res.status(201).json(Campaign);
    }).catch((e) => {
        res.status(500).json({ error: e.message });
    });

};

const update = (req,res) => {

    let data = {...req.body};
    Campaign.update(data, {
        where: {
            id: req.params.id_campaign,
            userId:req.user.id
        }
    }).then((campaign) => {
        if(campaign[0] === 0) {
           return res.status(405).json({error:"You don't own or this campaign doesnt's exist"})
        }
        res.sendStatus(201)
    }).catch((e) => {
        res.status(500).json({
            error: e.message
        })
    })
};

const list = (req,res) => {

    const { offset = 0, limit = 50} = req.query;
    Campaign.findAll({
        offset: offset,
        limit: limit},
        {where:{userId: req.user.id}}).then((campaigns) => {
        res.status(200).json(campaigns);
    }).catch((e) => {
        res.status(500).json({error: e.message});
    })

};

const get = (req, res) => {
    let campaignId = req.params.id_campaign;
    Campaign.findOne({where:{
        id:campaignId,
        userId:req.user.id
        }}).then((campaign) => {
        if(!campaign) return res.status(404).json({error: 'Campaign not found'});

        res.status(200).json(campaign)
    }).catch((e) => {
        res.status(500).json({error: e.message})
    })
};

const remove = async (req,res) => {

    await Campaign.destroy({where:{
        id:req.params.id_campaign,
        userId: req.user.id
        }});
    res.sendStatus(204);

};


export default {
    create,
    update,
    list,
    get,
    remove
}