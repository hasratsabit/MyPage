import express from "express";
import blogRoute from "./blog";
const router = express.Router();

router.get("/", (req, res, next) => {
	res.render("index", { title: "Hasrat Sabit", message: "Welcome"})
});


router.use('/blog', blogRoute);
module.exports = router;
