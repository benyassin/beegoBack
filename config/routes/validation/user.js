import Joi from 'joi';


const create = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});
// module.exports = {
//
//   load: {
//     params: {
//       userId: Joi.number().integer().min(1).required(),
//     },
//   },
//
//   create: {
//     body: {
//
//     },
//   },
//
//   update: {
//     body: {
//       username: Joi.string().alphanum().min(3).max(30).required(),
//       password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
//     },
//   },
//
// };

export default create
