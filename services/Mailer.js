const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys  = require('../config/keys');



class Mailer extends helper.Mail {

    constructor({subject,recipients},content)
    {
          super();
          
          this.sgApi = sendgrid(keys.sendGridKey);
          this.from_email = new helper.Email('noreply@test-email.com');
          this.subject = subject;
          this.body = new helper.Content('text/html',content);
          this.recipients = this.formatAddresses(recipients);
          

         this.addContent(this.body); 
        this.addClickTracking();
          this.addRecipients();
    }

    formatAddresses(recipients)
    {
        return recipients.map( ({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking()
    {
        const clickTrack = new helper.ClickTracking(true, true);

        const trackingSet = new helper.TrackingSettings();
        trackingSet.setClickTracking(clickTrack);
        this.addTrackingSettings(trackingSet);

    }

    addRecipients()
    {
        const persona = new helper.Personalization();
        this.recipients.forEach(recipient => {
            persona.addTo(recipient);
        });
        this.addPersonalization(persona);
    }

    async sendEmail()
    {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        
        return response;
    }

}

module.exports = Mailer;