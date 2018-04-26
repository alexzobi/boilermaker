const passport = require('passport')
const router = require('express').Router()
const JawboneStrategy = require('passport-jawbone').Strategy
const {User} = require('../db/models')
module.exports = router

passport.use(new JawboneStrategy({
  clientID     : process.env.JAWBONE_CLIENT_ID,
  clientSecret : process.env.JAWBONE_CLIENT_SECRET,
  callbackURL  : process.env.JAWBONE_CALLBACK_URL,
  passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},
function(req, token, refreshToken, profile, done) {
  User.findOrCreate({ jawboneId: profile.meta.user_xid }, function (err, user) {
    return done(err, user);
  });
}
));

//     User.find({where: {googleId}})
//       .then(foundUser => (foundUser
//         ? done(null, foundUser)
//         : User.create({name, email, googleId})
//           .then(createdUser => done(null, createdUser))
//       ))
//       .catch(done)
//   })
  
router.get('/', passport.authorize('jawbone', {scope: 'move_read'}))

router.get('/callback', passport.authorize('jawbone',
  {
    scope: ['move_read'],
    failureRedirect: '/auth/jawbone/failure'
  }),
  function(req, res) {
    res.redirect('/home');
  }
);

