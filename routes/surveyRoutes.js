const requireLogin = require('../middlewares/requireLogin');
const requireMinCredit = require('../middlewares/requireMinCredit');
const mongoose = require('mongoose');

const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');

const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/etemplates/surveyTemplate');

const Survey = mongoose.model('Surveys');

module.exports = (app) => {

    app.get('/api/surveys', requireLogin, async (req, res) => {
        
        const surveyList = await Survey.find({ _user: req.user.id}).select ({
            recipients : false
        });

        res.send(surveyList);

    });

    app.post('/api/surveys', requireLogin, requireMinCredit , async (req,res) => {

        const title = req.body.surveyTitle;
        const subject = req.body.surveySubject;
        const body = req.body.emailContent;
        const recipients = req.body.recipientList;
       

        const objSurvey = new Survey ({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        //console.log(objSurvey);

        const mailer = new Mailer(objSurvey, surveyTemplate(objSurvey));

        try {
            
            await mailer.sendEmail();
            await objSurvey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);

        } catch (err) {
            console.log(err);
            res.status(422).send(err);
          
            
        }

    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    
        console.log(req);

        //const test = { "email": 'info@sshsol.com',"url": 'http://localhost:3000/api/surveys/5d1222f3d8e2ea291c30d718/yes/'};

        res.send('Thank you for providing the feedback!');

    });

    app.post('/api/surveys/webhooks', (req, res) => {

       const p = new Path('/api/surveys/:surveyId/:choice');

       //console.log(req.body);

       // filters out mutliple events and returns unique events to process
       const events = _.map(req.body, (event) => {

        const pathname = new URL(event.url).pathname;
            const match = p.test(pathname);
            if(match)
            {
                return { email : event.email,surveyId : match.surveyId,choice : match.choice };
            }

       });
       const cleanEvents = _.compact(events);
       const uniqueEvents = _.uniqBy(cleanEvents,'email','surveyId');

       // update db
       _.forEach(uniqueEvents,(uniqueEvents) => {

            Survey.updateOne({
                _id: uniqueEvents.surveyId,
                recipients : {
                    $elemMatch:{email : uniqueEvents.email,responded : false}
                }
            },{
                    $inc : { [uniqueEvents.choice] : 1 },
                    $set : { 'recipients.$.responded' : true},
                    lastResponded : new Date()
            }).exec();

       });

       res.send({});
      

    });

};