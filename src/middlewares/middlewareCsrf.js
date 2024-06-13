exports.middlewareCsrfError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN') {
        return res.render('err404');
    }
};

exports.middlewareCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};