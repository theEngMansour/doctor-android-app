
const User = require('../models/user');

const Profile = require('../models/profile');


/**
 * Posts List
 * select('title content') OR select('-comments')
 */
/* exports.list =(req, res, next) => {
    User.findOne({_id: req.user.id})
    .sort({created_at: 'desc'})
    .then(user => {
        if(user.userType == 'doctor'){     
            Profile.findOne({userId: user._id})    
            .sort({created_at: 'desc'})
            .populate('userId', '-_id -__v')
            .then(data => {
                const normal = {
                    name: data.userId.name,
                    email: data.userId.email,
                    userType: data.userId.userType,
                };
                const doctor = {
                    speialization: data.speialization,
                    address: data.address,
                    workingHours: data.workingHours,
                    phone: data.phone,
                };
                const user = Object.assign(normal, doctor);
                res.json(user);
            })
        } else {
            res.json(user);
        }
    }).catch(next);
} */

exports.list =(req, res, next) => {
    User.findOne({_id: req.user.id})
    .sort({created_at: 'desc'})
    .then(user => {
        res.json(user);
    }).catch(next);
}