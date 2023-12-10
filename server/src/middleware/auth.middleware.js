import jwt from "jsonwebtoken";

const config = process.env

const verifyToken = (req, res, next) => {

    if (!req.cookies)
        return res.status(400).json({ message: "Bad request" })

    const accessToken = req.headers["authorization"];
    const refreshToken = req.cookies['token'];

    if (!accessToken && !refreshToken) {
        return res.status(403).json({message: "A token is required for authentication"});
    }
    try {
        req.id = jwt.verify(accessToken, config.TOKEN_KEY);
        next();
    } catch (err) {
        if (!refreshToken)
            return res.status(401).json({message: "No token provided"});

        try {
            const decoded = jwt.verify(refreshToken, config.TOKEN_KEY);

            const accessToken = jwt.sign({ id: decoded.id }, config.TOKEN_KEY, { expiresIn: '30m' });
            
            res
                .cookie('token', refreshToken, { httpOnly: true, sameSite: 'strict' })
                .header('Authorization', accessToken)
                .send(decoded.user);

        } catch (e) {
            return res.status(401).json({message: "Invalid Token"});
        }
    }

}

export {
    verifyToken
}