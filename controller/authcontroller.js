const { User } = require('../models/UserModel');
exports.RegisterUser = async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    await user.save((err, doc) => {
    if (err) {
        console.log('failure');
        return res.status(422).json({errors:err})
    } else {
    console.log('success');
    return res.status(200).json(
    {
    success: true,
    message: 'Successfully Signed Up',
    userData
    }
    )
    }
});
}
exports.LoginUser = (req, res) => {
User.findOne({ 'username': req.body.username }, (err, user) => {
if (!user) {
    return res.status(404).json({ success: false, message: 'username not found!' });
    } else {
    user.comparePassword(req.body.password, (err, isMatch) => {
    console.log(isMatch);
 //isMatch is eaither true or false
    if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Wrong Password!' });
} else {
    user.generateToken((err, user) => {
    if (err) {
    return res.status(400).send({ err });
} else {
    const data = {
    userID: user._id,
    username: user.username,
    token: user.token
    }
 //saving token to cookie
    console.log("SUCCESSFULLY LOGGED IN ");
    res.cookie('authToken', user.token).status(200).json(
    {
    success: true,
    message: 'Successfully Logged In!',
    userData: data
    })
}
});
}
});
}
});
}
exports.LogoutUser = (req, res) => {
    User.findByIdAndUpdate(
    { _id: req.user._id }
    , { token: '' },
    (err) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).send({ success: true, message: 'Successfully Logged Out!' });
})
}
//get authenticated user details
exports.getUserDetails= (req, res) => {
    return res.status(200).json({
    isAuthenticated: true,
    username: req.user.username,
    });
    };
