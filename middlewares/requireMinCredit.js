module.exports = (req, res, next) => {

    //console.log(req.user.credits);

    if (req.user.credits <= 0) {
        return res.status(401).send({ error: 'User does not have sufficient credits!' });
    }

    next();

};