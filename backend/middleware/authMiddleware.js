const secretKey = process.env.JWT_SECRET_KEY;

const authToken = async (req, res, next) => {

    const token = req.headers.authorization;
    const verifyToken = jwt.verify(token, secretKey);

}