import { getUserByCredentials } from '../services/auth.js';
import HttpError from '../utils/HttpError.js';
import jwt from 'jsonwebtoken';

const login = ( req, res ,next) => {
    const { body } = req;

    getUserByCredentials( body )
        .then(user => {
            if( !user ) {
               // res.json( 'Go away you cheater' );
                const httpError = new HttpError( 'Go away you hacker', 401 );
                next( httpError );
                return;
            }

           // res.json( 'Wait. Let me generate your token...' );
            // generate and send a token
            const claims = {
                email: user.email,
                name: user.name,
                role: user.role
            };

            jwt.sign( claims, process.env.JWT_SECRET, ( err, token ) => {
                if( err ) {
                    const httpError = new HttpError( 'Unable to generate token right now. Please try again later.', 500 );
                    next( httpError );
                    return;
                }

                res.json({
                    email: user.email,
                    name: user.name,
                    token: token
                });
            });
        });
}

export {
    login
};