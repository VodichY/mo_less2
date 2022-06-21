import * as postsDataBase from "./posts.data.base.mongodb"
import { IPost } from "./posts.model";
import { IBlogger } from "../bloggers/bloggers.model";

const createPost = async (post: IPost, blogger: IBlogger) => {
	return await postsDataBase.createPost(post, blogger);
};

const getPosts = async (params: {[key: string]: string}) => {
	return await postsDataBase.getPosts(params);
}

const getPostById = async (postId: number) => {
	return await postsDataBase.getPostById(postId);
}


const updatePostById = async (post: IPost, postId: number) => {
	return await postsDataBase.updatePostById(post, postId);
}

const deletePostById = async (postId: number) => {
	return await postsDataBase.deletePostById(postId);
}


export {
	createPost,
	getPosts,
	getPostById,
	updatePostById,
	deletePostById
};

