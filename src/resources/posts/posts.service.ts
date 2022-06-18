import * as postsDataBase from "./posts.data.base.mongodb"
import { IPost } from "./posts.model";
import { IBlogger } from "../bloggers/bloggers.model";

const createPost = (post: { title: string; shortDescription: string; content: string; bloggerId: number; }, blogger: IBlogger) => {
	const createdPost: IPost = postsDataBase.createPost(post, blogger);
	return createdPost;
};

const getPosts = () => postsDataBase.getPosts();

const getPostById = async (postId: string) => {
	return await postsDataBase.getPostById(postId);
} 


const updatePostById = (dataPost: { [key: string]: string }, postId: Number) => {
	return postsDataBase.updatePostById(dataPost, postId);
}

const deletePostById = (postId: Number) => postsDataBase.deletePostById(postId);

export {
	createPost,
	getPosts,
	getPostById,
	updatePostById,
	deletePostById
};

