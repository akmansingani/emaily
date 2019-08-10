const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.post('/api/stripe', requireLogin , async (req,res) =>{
        
        // console.log(req.body);

        const charge = await stripe.charges.create({
            amount : 500,
            currency : 'usd',
            description : '5 email credits',
            source : req.body.id,
        });

       req.user.credits +=5;
       const objUser = await req.user.save();

        res.send(objUser);

    });
    
}
