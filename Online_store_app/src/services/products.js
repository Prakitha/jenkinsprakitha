/**
 * Service talks to the database (data layer)
 */
import mongoose from "mongoose";
import config from '../utils/config.js'
const Product = mongoose.model('Product');

const fetchProducts = (sort, order, page, minPrice, minRating, q) => {
    const skipClause = (page - 1) * config.PAGE_SIZE;

    const filterClause = {};
    if (minPrice) {
        filterClause.price = {
            $gte: minPrice
        }
    }
    if (minRating) {
        filterClause.rating = {
            $gte: rating
        }

    }
    if (q) {
        filterClause.description = {
            $regex: q,
            $options: 'i'// ignore case
        }
    }

    console.log(filterClause);

    const sortClause = {
        [sort]: order === 'desc' ? -1 : 1
    }
    
    return Product.find(filterClause).
    select('name code relaseDate description price rating imageUrl')
    .sort(sortClause).skip(skipClause).limit(config.PAGE_SIZE);
};
const fetchProductsById = (_id) => {
    return Product.findById(_id)
};
const addProduct = (product) => {
    return Product.create(product);
}
const updateProduct=(_id,newProductDetails)=>{
    return Product.findByIdAndUpdate(_id,newProductDetails,{new:true,runValidators: true });
}
const removeProduct=(_id)=>{
    return Product.findByIdAndRemove(_id);
}
const addReview = ( _id, review ) => {
    return Product.findByIdAndUpdate( 
      _id,
      {
        $push: {
          reviews: review
        }
      },
      {
        new: true,
        runValidators: true
      }
    );
  };
  const fetchReviews= ( _id ) => {
    return Product
            .findById( _id )
            .select( 'reviews' )
            .then(productReview => productReview.review)
  }
export {
    fetchProducts,
    fetchProductsById,
    addProduct,
    updateProduct,
    removeProduct,
    addReview,fetchReviews

};