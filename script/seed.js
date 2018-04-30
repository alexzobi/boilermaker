const db = require('../server/db');
const {User, Cardiomon, UserCardiomon} = require('../server/db/models');
const Promise = require('bluebird');

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({firstName: 'Becca', lastName: 'Au' }),
    User.create({email: 'murphy@email.com', password: '123'})
  ]);

  const cardiomon = await Promise.all([
    Cardiomon.create({
      name: 'Coremander',
      description: 'A small lizard with a big heart.',
      imageUrl: '/images/coremander.png',
    }),
    Cardiomon.create({
      name: 'Coremeleon',
      description: 'Growing in size, power and sassiness.',
      imageUrl: '/images/coremeleon.png',
      health: 250,
      attack: 75,
      defense: 50
    }),
    Cardiomon.create({
      name: 'Beatmonchan',
      description: 'The power of Youth. The punch of a thousand bricks.',
      imageUrl: '/images/beatmonchan.png',
      health: 75,
      attack: 30,
      defense: 25
    }),
    Cardiomon.create({
      name: 'Beatmonlee',
      description: 'Beware the fists. Beware the kicks.',
      imageUrl: '/images/beatmonlee.png',
      health: 400,
      attack: 100,
      defense: 75
    }),
    Cardiomon.create({
      name: 'Cardiosaur',
      description: 'The four-legged friend that can run for days.',
      imageUrl: '/images/cardiosaur.png',
      health: 50,
    }),
  ]);

  const userCardiomon = await Promise.all([
    UserCardiomon.create({
      userId: 1,
      cardiomonId: 1
    }),

  ]);

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${cardiomon.length} cardiomon`);
  console.log(`seeded ${userCardiomon.length} userCardiomon`);

  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
