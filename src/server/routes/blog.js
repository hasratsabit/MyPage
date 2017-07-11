import express from "express";
const router = express.Router();


router.get('/', (req, res) => {
	res.render('blog/blog', {title: 'ALL BLOGS'})
});

router.get('/add-blog', (req, res) => {
	res.render('blog/add-blog', {title: 'ADD BLOG'})
});

module.exports = router;
