let tokens = [];

export const generateCsrfToken = (req, res, next) => {
    const token = Math.random().toString(36).substring(2, 15);

    tokens.push(token);
    res.setHeader('X-CSRF-token', token);
    next();
};

export const verifyCsrfToken = (req, res, next) => {
    if(
        !req.headers['x-csrf-token'] ||
        !tokens.includes(req.headers['x-csrf-token'])
    ){
        return res.status(419).json({error: "Invalid CSRF token."});
    };
    tokens = tokens.filter(t => t !== req.headers['x-csrf-token']);
    next();
};