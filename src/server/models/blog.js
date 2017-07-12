import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
	title: String,
	author: String,
	postDate: Date,
	content: String,
	category: String,
	comment: String,
	commentNum: Number,
	shared: Number,
	liked: String,
	image: String
});

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
