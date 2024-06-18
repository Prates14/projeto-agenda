exports.middlewareLocal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    next();
}

exports.middlewareCsrfError = (err, req, res, next) => {
    if(err) {
        res.render('err404');
    }
    next();
};

exports.middlewareCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};