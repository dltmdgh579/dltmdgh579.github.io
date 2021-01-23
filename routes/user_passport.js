

module.exports = function(router, passport){
    console.log('user_passport 호출됨');

    router.route('/').get(function(req, res){
        console.log('/ 패스로 요청됨');

        var id = req.user;
        if(!id) res.redirect('login.html', {message: req.flash('')});
        res.redirect('index', {'id':id});
    });

    router.route('/login').get(function(req, res){
        console.log('/login 패스로 GET 요청됨');

        res.redirect('login', {message: req.flash('loginMessage')});
    });

    router.route('/login').post(passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    router.route('/join').get(function(req, res){
        console.log('/join 패스로 GET 요청됨');

        res.redirect('join', {message: req.flash('joinMessage')});
    });

    router.route('/join').post(passport.authenticate('local-join', {
        successRedirect: '/',
        failureRedirect: '/join',
        failureFlash: true
    }));

    router.route('/logout').get(function(req, res){
        console.log('/logout 패스로 GET 요청됨');

        req.logout();
        res.redirect('/login');
    });

}