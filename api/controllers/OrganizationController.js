import Organization from '../models/Organization'
import userCtrl from './UserController'


// name:string / logo:string / owner:id
const create =  (req, res) => {

    let data = {...req.body};

    Organization.create(data).then((organization) => {
        userCtrl.assignToOrganization(data.owner,organization.id).then(() =>{

        }).catch((e) =>{
            res.status(500).json({error:e.message})
        });

        res.status(200).json(organization)
    }).catch((e) => {
        res.status(500).json({error:e.message})
    })
};

export default {
    create
}