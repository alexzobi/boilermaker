const router = require('express').Router();
const {User, UserCardiomon, Cardiomon} = require('../db/models');
// const https = require('https');
const request = require('request');

module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId/cardiomon', (req, res, next) => {
  const id = +req.params.userId
  let user;
  console.log('trying to get your cardiomon')
  User.findOne({where: { id }})
    .then(foundUser => {
      user = foundUser
      user.getCardiomons()
    })
    .then( data => {
      console.log('the found cardiomon ', data)
      if (!data){
        console.log('inside the create loop')
        Cardiomon.findOne({where: { name: 'Coremander' }})
          .then(mon => {
            console.log('this is the found cardiomon ', mon)
            user.addCardiomon(mon)
          })
          .then(() => user.getCardiomons())
          .then(newData => res.json(newData))
          .catch(next);
      } else {
        console.log('these are your cardiomon ', data)
        res.json(data)
      }
    })
    .catch(next);
});

router.get('/:userId', (req, res, next) => {
  const id = +req.params.userId
  User.findOne({where: { id }})
    .then(user => {
      const accessToken = user.accessToken;
      const options = {
        method: 'GET',
        url: 'https://jawbone.com/nudge/api/v.1.1/users/@me/moves',
        headers: {
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json' },
          json: true
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          const moveData = body.data.items;
          if (moveData.length){
            let steps = 0;
            moveData.forEach( day => {
              steps += day.details.steps;
            })
            const newSteps = steps - user.steps
            const points = Math.floor(newSteps / 20 + user.points);
            user.update({ steps, points })
              .then( updatedUser => {
                res.json(updatedUser.points)
              })
              .catch(next)
          } else {
            res.json(user.points)
          }
        })
    })
    .catch(next)

})
