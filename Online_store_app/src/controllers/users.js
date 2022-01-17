import { fetchUsers, fetchUsersById, addUser, updateUser, removeUser } from "../services/users.js";
import HttpError from '../utils/HttpError.js'

/*const getUsers=(req,res)=>{
    res.send('we will send the list of users');

}*/

const getUsers = (req, res) =>{
         let  {sort, role, order, page } = req.query;
        let pageInt = parseInt(page);
      if (isNaN(pageInt)) {
    pageInt = 1;
        }
        if (!sort) {
         sort = 'name';
            } if (!order) {
             order = 'asc';
             }

            
 //console.log(sort, role, page, 'This is from users');

  fetchUsers(sort, role, order, parseInt(page))
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        const httpError = new HttpError(err.message, 500);
        next(httpError)
    })

}
       const getUsersById = (req, res, next) => {
         const { _id } = req.params;
             fetchUsersById(_id)
        .then((user) => {
            if (!user) {
                const httpError = new HttpError('User with gievn id does not exists', 404)
                next(httpError);
                return
            }
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                const httpError = new HttpError('Invalid user id', 400)
                next(httpError);
            } else {
                const httpError = new HttpError(err.message, 500)
                next(httpError)
            }
        });
    }
    const postUser = (req, res, next) => {
        const { body } = req;
        // const { _id } = req.params;

        if (Object.keys(body).length === 0) {
            const httpError = new HttpError('request body is empty.user details are missing', 400);
            next(httpError);
            return;
        }
        addUser(body)
            .then(user => {
                if (!user) {
                    const httpError = new HttpError('user with gievn id does not exists', 404)
                    next(httpError);
                    return
                }
                res.json(user);
            })
            .catch((err) => {
                if (err.kind === 'ObjectId') {
                    const httpError = new HttpError('Invalid user id', 400)
                    next(httpError);
                } else {
                    const httpError = new HttpError(err.message, 500)
                    next(httpError)
                }
            });
    }
    const putUser = (req, res, next) => {
        const { body } = req;
        const { _id } = req.params;
        if (Object.keys(body).length === 0) {
            const httpError = new HttpError('request body is empty.product details are missing', 400);
            next(httpError);
            return;
        }
        updateUser(_id, body)
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                res.json(err.message);
            })
    }
    const deleteUser = (req, res, next) => {
        const { _id } = req.params;
        removeUser(_id)
            .then(() => {
                res.status(204).json()
            })
            .catch((err) => {
                if (err.kind === 'ObjectId') {
                    const httpError = new HttpError('Invalid user id', 400)
                    next(httpError);
                } else {
                    const httpError = new HttpError(err.message, 500)
                    next(httpError)
                }
            })
    }

    export {
        getUsers,
        getUsersById,
        postUser,
        putUser,
        deleteUser

    }