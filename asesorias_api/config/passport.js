const passport = require('passport');
const LocalStrategy = require('passport-local');

const { basePath } = global;
const { TypeOrmSqlClient: db } = require(`${basePath}/config/client`);
const { ViewUser } = require(`${basePath}/src/application/user`);
const { UserRepository } = require(`${basePath}/src/infrastructure/repositories/typeorm`);


passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
  const repository = new UserRepository(db);
  const service = new ViewUser(repository);

  const User = service.find({email})
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
  }).catch(done);

}));