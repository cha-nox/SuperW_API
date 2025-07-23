let tokens = [];

export const generateCsrfToken = (req, res, next) => {
    const token = Math.random().toString(36).substring(2, 15);

    tokens.push(token);
    res.locals.csrf_token = token;
    next();
};

export const verifyCsrfToken = (req, res, next) => {
    if(
        !req.body.csrf_token ||
        !tokens.includes(req.body.csrf_token)
    ){
        return res.status(419).json({error: "Invalid CSRF token."});
    };
    tokens = tokens.filter(t => t !== req.body.csrf_token);
    next();
};