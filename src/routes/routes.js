const { Router } = require("express");
const router = Router();

const ClientController = require("../controllers/ClientController");
const SellerController = require("../controllers/SellerController");
const ProductController = require("../controllers/ProductController");
const OrderController = require("../controllers/OrderController");

router.post("/Client", ClientController.create);
router.get("/Client", ClientController.index);
router.get("/Client/:id", ClientController.show);
router.put("/Client/:id", ClientController.update);
router.delete("/Client/:id", ClientController.destroy);

router.post("/Seller", SellerController.create);
router.get("/Seller", SellerController.index);
router.get("/Seller/:id", SellerController.show);
router.put("/Seller/:id", SellerController.update);
router.delete("/Seller/:id", SellerController.destroy);

router.post("/Product", ProductController.create);
router.get("/Product", ProductController.index);
router.get("/Product/:id", ProductController.show);
router.put("/Product/:id", ProductController.update);
router.delete("/Product/:id", ProductController.destroy);
router.put("/Product/:pid/Seller/:sid", ProductController.addProductSeller);
router.put("/Product/Seller/:id", ProductController.removeProductSeller);

router.post("/Order", OrderController.create);
router.get("/Order", OrderController.index);
router.get("/Order/:id", OrderController.show);
router.put("/Order/:id", OrderController.update);
router.delete("/Order/:id", OrderController.destroy);
router.put("/Order/:oid/Client/:cid", OrderController.addClient);
router.put("/Order/Client/:id", OrderController.removeClient);
router.post("/Order/:orderId/Product/:productId", OrderController.addProduct);
router.delete("/Order/:orderId/Product/:productId", OrderController.removeProduct);

module.exports = router;
