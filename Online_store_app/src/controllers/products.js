/*const getProducts=(req,res)=>{
    res.send('we will send the list of products');

}
export{
    getProducts
}*/
import { fetchProducts, fetchProductsById, addProduct, updateProduct, removeProduct,addReview ,fetchReviews} from "../services/products.js";
import HttpError from '../utils/HttpError.js'
/*const getUsers=(req,res)=>{
    res.send('we will send the list of users');

}*/
const getProducts = (req, res) => {
    let { sort, order, minPrice, minRating, page, q } = req.query;


    let pageInt = parseInt(page);
    if (isNaN(pageInt)) {
        pageInt = 1;
    }
    if (!sort) {
        sort = 'name';
    }
    if (!order) {
        order = 'asc';
    }
    // console.log(sort,order,minPrice,minRating,q,"This is from products");


    fetchProducts(sort, order, parseInt(page), minPrice, minRating, q)
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            const httpError = new HttpError(err.message, 500);
            next(httpError)
        });
    //  console.log(sort, order, minPrice, minRating, "This is from products");

}

const getProductsById = (req, res, next) => {
    const { _id } = req.params;
    fetchProductsById(_id)
        .then((product) => {
            if (!product) {
                const httpError = new HttpError('product with gievn id does not exists', 404)
                next(httpError);
                return
            }
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                const httpError = new HttpError('Invalid product id', 400)
                next(httpError);
            } else {
                const httpError = new HttpError(err.message, 500)
                next(httpError)
            }
        });
}
const postProduct = (req, res, next) => {
    const { body } = req;
    // const { _id } = req.params;
    console.log(Object.keys.apply(body));
    if (Object.keys(body).length === 0) {
        const httpError = new HttpError('request body is empty.product details are missing', 400);
        next(httpError);
        return;
    }
    addProduct(body)
        .then(product => {
            if (!product) {
                const httpError = new HttpError('product with gievn id does not exists', 404)
                next(httpError);
                return
            }
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                const httpError = new HttpError('Invalid product id', 400)
                next(httpError);
            } else {
                const httpError = new HttpError(err.message, 500)
                next(httpError)
            }
        });
}
const putProduct = (req, res, next) => {
    const { body } = req;
    const { _id } = req.params;
    if (Object.keys(body).length === 0) {
        const httpError = new HttpError('request body is empty.product details are missing', 400);
        next(httpError);
        return;
    }
    updateProduct(_id, body)
        .then(product => {
            res.json(product);
        })
        .catch(err => {
            res.json(err.message);
        })
}
const deleteProduct = (req, res, next) => {
    const { _id } = req.params;
    removeProduct(_id)
        .then(() => {
            res.status(204).json()
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                const httpError = new HttpError('Invalid product id', 400)
                next(httpError);
            } else {
                const httpError = new HttpError(err.message, 500)
                next(httpError)
            }
        })
}
const postReview = (req, res, next) => {
    const { _id } = req.params;
    const { body } = req;
  
    // check if the body is an empty object
    if( Object.keys( body ).length === 0 ) {
      const httpError = new HttpError( 'Request body is empty. Review details are missing.', 400 );
      next( httpError );
      return;
    }
  
    addReview( _id, body )
      .then(product => {
        res.status( 201 ).json( product );
      })
      .catch(err => {
        const httpError = new HttpError( err.message, 400 );
        next( httpError );
      });
  };
  const getReview = (req, res, next) => {
    const { _id } = req.params;
  
    fetchReviews( _id )
      .then((reviews) => {
          res.json(reviews);
      })
      .catch((err) => {
          const httpError = new HttpError( err.message, 500 );
          next( httpError );
      });
  }
export {
    getProducts,
    getProductsById,
    postProduct,
    putProduct,
    deleteProduct,
    postReview,
    getReview
    

}