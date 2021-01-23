var pool = require('./db');
var LocalStrategy = require('passport-local').Strategy;


module.exports = new LocalStrategy({
    usernameField:'id',
    passwordField:'password',
    passReqToCallback:true
}, function(req, id, password, done){
    pool.getConnection(function(err, conn){
        if (err) {
            if (conn) {
                conn.release();
            }
            return done(err);
            
        }
        var columns = ['id', 'name', 'age'];
        var exec = conn.query("select ?? from users where id = ? and password = ?", 
        [columns, id, password],function(err, rows){
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            if (err) {
                return done(err);
            }
            if (rows.length > 0) {
                console.log('사용자 찾음');
                return done(null, {'id' : rows[0].id});
            } else {
                console.log('사용자 찾지 못함');
                return done(null, false, req.flash('loginMessage', '아이디를 찾지 못했습니다'));
            }
        });
    })
})