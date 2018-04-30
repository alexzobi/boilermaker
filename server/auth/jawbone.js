const passport = require('passport');
const router = require('express').Router();
const JawboneStrategy = require('passport-jawbone').Strategy;
const {User} = require('../db/models');
module.exports = router


const jawboneConfig = {
  clientID: process.env.JAWBONE_CLIENT_ID,
  clientSecret: process.env.JAWBONE_CLIENT_SECRET,
  callbackURL: process.env.JAWBONE_CALLBACK_URL,
  passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
}
const strategy = new JawboneStrategy(jawboneConfig,
  (req, token, refreshToken, profile, done) => {
    const jawboneId = profile.meta.user_xid
    const firstName = profile.data.first
    const lastName = profile.data.last
    const accessToken = token
    // console.log('profile keys', Object.keys(profile))
    console.log('this is the token ', token)

    User.find({ where: { jawboneId }})
      .then(foundUser => (foundUser
        ? foundUser.update({ accessToken, refreshToken})
          .then(updatedUser => done(null, updatedUser))
        : User.create({ jawboneId, firstName, lastName, accessToken, refreshToken })
          .then(createdUser => done(null, createdUser))
      ))
      .catch(done)
  });

passport.use(strategy);

router.get('/', passport.authenticate('jawbone', {scope: 'move_read'}))

router.get('/callback', passport.authenticate('jawbone',
  {
    scope: ['move_read'],
    failureRedirect: '/'
  }),
  function(req, res) {
    // then store access token with user
    // all of these async and then redirect user.
    res.redirect(`/users/${req.user.id}`);
  }
);

