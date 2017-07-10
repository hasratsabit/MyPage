import express from "express";
import blogRoute from "./blog";
const router = express.Router();

router.get("/", (req, res, next) => {
	res.render("index", { title: "Hasrat Sabit", message: "Welcome"})
});

router.get('/blog', (req, res) => {
	res.render('blog/blog', {title: 'ALL BLOGS'})
});

router.get('/add-blog', (req, res) => {
	res.render('blog/add-blog', {title: 'ADD BLOG'})
});


module.exports = router;
