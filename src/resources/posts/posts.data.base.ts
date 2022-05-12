import * as db from "../../common/db";
import { Post, IPost } from "./posts.model";
import { IBlogger } from "../bloggers/bloggers.model";

const createPost = (post: {
	title: string;
	shortDescription: string;
	content: string;
	bloggerId: number;
}, blogger: IBlogger) => {
	const bloggerName = blogger.name;
	const createdPost: IPost = new Post(post);
	db.dataDB.posts.push(createdPost);
	const { id, title, shortDescription, content, bloggerId } = createdPost;

	return { id, title, shortDescription, content, bloggerId, bloggerName};
};

const getPosts = () => {
	return db.dataDB.posts.map((post) => {
		const foundBlogger = db.dataDB.bloggers.find((elem)=> elem.id === post.bloggerId);
		let bloggerName: String = "";
		if (foundBlogger) {
			bloggerName = foundBlogger.name;
		};
	 	const { id, title, shortDescription, content, bloggerId } = post;
		return { id, title, shortDescription, content, bloggerId, bloggerName};
	})	
}


const getPostById = (postId: Number) => {
	const foundPost = db.dataDB.posts.find((elem) => elem.id === postId);
	if (foundPost) {
		const foundBlogger = db.dataDB.bloggers.find((elem)=> elem.id === foundPost.bloggerId);
		let bloggerName: String = "";
		if (foundBlogger) {
			bloggerName = foundBlogger.name;
		};
	 	const { id, title, shortDescription, content, bloggerId } = foundPost;
		return { id, title, shortDescription, content, bloggerId, bloggerName};
	}
	return false;
};

const updatePostById = (
	dataBlogger: { [key: string]: string },
	postId: Number
) => {
	const foundPost = db.dataDB.posts.find((elem) => elem.id === postId);
	if (foundPost) {
		foundPost.title = dataBlogger.title;
		foundPost.shortDescription = dataBlogger.shortDescription;
		foundPost.content = dataBlogger.content;
		foundPost.bloggerId = +dataBlogger.bloggerId;
		return foundPost;
	}
	return false;
};

const deletePostById = (postId: Number) => {
	const foundPost = db.dataDB.posts.find((elem) => elem.id === postId);
	if (foundPost) {
		const postIndex = db.dataDB.posts.indexOf(foundPost);
		db.dataDB.posts.splice(postIndex, 1);
		return true;
	}
	return false;
};

export { 
	createPost, 
	getPosts, 
	getPostById,
	updatePostById, 
	deletePostById 
};
