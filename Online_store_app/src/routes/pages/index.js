import express from "express";
import { getHomePage } from "../../controllers/pages/index.js";
//import { getProductsPage } from "../../controllers/pages/products.js";
const router =express.Router();
router.get('/',(req,res,next)=>{
    res.render('index');
})
router.get('/',getHomePage)
//router.get('/',getProductsPage)

export default router;