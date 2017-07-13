import express from "express";
import Blog from "../models/blog";
import multer from "multer";
const router = express.Router();


router.get('/', (req, res) => {
	Blog.find((err, blogs) => {
		if(err){
			console.log(err);
			return;
		}else {
			res.render('blog/blog', {
				title: 'Blogs',
				blog: blogs
			})
		}
	})
});


router.post('/post-blog', (req, res) => {
	const blog = new Blog();
	blog.title = req.body.title;
	blog.image = req.body.image;
	blog.content = req.body.content

	blog.save((err) => {
		if(err){
			console.log(err);
			return;
		}else {
			res.redirect('/')
		}
	})
})

router.get('/post-blog', (req, res) => {
	res.render('blog/add-blog', {title: 'ADD BLOG'})
});

router.get('/view-all-blogs', (req, res) => {
	res.render('blog/view-all-blogs', { title: 'View all blogs'})
})

module.exports = router;
