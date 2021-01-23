var local_login = require('./passport_fol/local_login');
var local_join = require('./passport_fol/local_join');

module.exports = function(app, passport) {
    console.log('config/passport 호출됨');

    passport.serializeUser(function(user, done){
        console.log('passport session save : ', user.id)
        done(null, user.id)
    });
    
    passport.deserializeUser(function(id, done){
        console.log('passport session get id : ', id)
        done(null, id);
    });

    passport.use('local-login', local_login);
    passport.use('local-join', local_join);
    console.log('passport strategy 등록됨');
}