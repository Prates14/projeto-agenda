exports.middlewareLocal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.middlewareCsrfError = (err, req, res, next) => {
    if(err) {
        res.locals.erro = err;
        return res.render('err404');
    }
};

exports.middlewareCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};