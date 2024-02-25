const passport = require('passport');
const { User } = require('../app/models');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({usernameField: 'email'},
    async function(email, password, done) {
        try {
            const user = await User.findOne({ email: email });
            if (!user) { return done(null, false, {message: 'Incorrect email or password'}); }
            const hashedPassword = user.password;
            
            const comparePassword = await bcrypt.compare(password, hashedPassword);
            if (!comparePassword) { return done(null, false, {message: 'Incorrect email or password'}); }

            console.log(comparePassword)
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    const user = User.findById(id);
    done(null, user);
});

module.exports = passport;