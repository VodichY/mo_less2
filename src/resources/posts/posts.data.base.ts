import * as db from "../../common/db";
import { Post, IPost } from "./posts.model";


const createPost =  (post:  {title: string; shortDescription: string; content: string; bloggerId: number; }) => {
	const createdPost:IPost = new Post(post);
	db.dataDB.posts.push(createdPost);
	return createdPost;
};

const getPosts = () => db.dataDB.posts;

const getPostById =  (postId: Number) => {
	const foundPost = db.dataDB.posts.find((elem)=> elem.id === postId);
	if (foundPost) {
		return foundPost;
	}
	return false; 
};

export { createPost, getPosts, getPostById };
