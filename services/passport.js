const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('Users');

passport.serializeUser( (usr,done) => {

    console.log("[serialize user] user id : " + usr.id);
    done(null,usr.id);

});

passport.deserializeUser( (userid,done) => {

    console.log("[deserialize user] user id : " + userid);
    User.findById(userid).then( user => {
        console.log("found" + user);
        done(null,user);
    });

});

passport.use(
    new GoogleStrategy(
    {
        clientID : keys.googleClientID,
        clientSecret : keys.googleClientSecret,
        callbackURL : '/auth/google/callback',
        proxy : true,
    }, 
    async (accessToken, refreshToken, profile, done) => {
        // user logged in
        console.log("google profile id " + profile.id);

        // check if user exists
      const usr = await User.findOne({ googleId : profile.id });

      if(usr) {
           // user already exists
           done(null,usr);
       }
       else
        {
            // create new user
           const user = await new User({ googleId : profile.id }).save();
           done(null,user);
           
        }
        
    }
  )
);
