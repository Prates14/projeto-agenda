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