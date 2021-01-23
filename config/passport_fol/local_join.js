var pool = require('./db');
var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, id, password, done){
    var paramName = req.body.name;
    var paramAge = req.body.age;
    pool.getConnection(function(err, conn){
        if (err) {
            if (conn) {
                conn.release();
            }
            return done(err);
        }
        var exec = conn.query('select * from users where id=?', [id], function(err, rows){
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);
            if (err) {
                console.log('SQL 실행 시 에러 발생');
                return done(err);
            }
            if (rows.length){
                console.log('exsited user');
                return done(null, false, req.flash('joinMessage', '아이디가 이미 있습니다'));
            }else{
                var data = {id:id, name:paramName, age:paramAge, password:password};
                var query = conn.query('insert into users set ?', data, function(err, rows){
                    console.log('실행된 SQL : ' + query.sql);
                    if (err) {
                        console.log('에러 발생.');
                        return done(err);
                    }else{
                        return done(null, {'id' : id});
                    }
                })
            }
        });
    });
})