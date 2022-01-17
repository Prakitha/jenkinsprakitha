import mongoose from "mongoose";
import config from '../utils/config.js'


const User = mongoose.model('User');

const fetchUsers = (sort, role, order, page) => {
    const skipClause = (page - 1) * config.PAGE_SIZE;
    const filterClause = {
    }

    const sortClause = {
        [sort]: order === 'desc' ? -1 : 1
    }
    if (role) {
        filterClause.role = role
    }

    return User.find(filterClause).select('-password').sort(sortClause).skip(skipClause).limit(config.PAGE_SIZE);
};
const fetchUsersById = (_id) => {
    return User.findById(_id)
};
const addUser = (user) => {
    return User.create(user);
}
const updateUser=(_id,newUserDetails)=>{
    return User.findByIdAndUpdate(_id,newUserDetails,{new:true});
}
const removeUser=(_id)=>{
    return User.findByIdAndRemove(_id);
}
/*const fetchUsersByRole = (role) => {
    return Product.findByRole(role)
}
*/
export {
    fetchUsers, fetchUsersById,
    addUser,
    updateUser,
    removeUser
};