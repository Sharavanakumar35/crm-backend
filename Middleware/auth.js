import jwt from 'jsonwebtoken';
import config from '../utils/config.js';

const auth = {
    verifyToken: (request, response, next) => {
        try {
            const token = request.cookies.token;

            if (!token) {
                return response.status(401).json({ message: 'Token missing' });
            }

            try {
                const decodedToken = jwt.verify(token, config.JWT_SECRET);

                request.userId = decodedToken.id;
                next();
            } catch(error) {
                return response.status(401).json({ message: 'Invalid token' });
            }
            
        } catch(error) {
            response.status(500).json({ message: error.message });
        }
    } 
};

export default auth;
