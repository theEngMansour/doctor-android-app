const User = require('../models/user');

exports.search = (req, res) => {
    const {q} = req.query;
    const searchQuery = q ? q : '';
    User.find({
      name: {$regex: searchQuery, $options: 'i'}, 
      userType: 'doctor',
    })
    .then(result => {
        res.status(200).json(result)
    });
}