import mongoose from 'mongoose';

import '../models/products.js';
import '../models/users.js';

const connectionStr = `mongodb://localhost:27017/Online_store_app`;
mongoose.connect(connectionStr)
    .then(() => {
        console.log('connected to database');
    })
    .catch(err => {
        console.log(err.message);
    })
