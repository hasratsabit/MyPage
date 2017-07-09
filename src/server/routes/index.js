const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
	res.render("index", { title: "Hasrat Sabit", message: "Welcome"})
});

router.get('/admin', (req, res) => {
	res.render('admin/admin', { title: 'Add Product Here'})
})


module.exports = router;
