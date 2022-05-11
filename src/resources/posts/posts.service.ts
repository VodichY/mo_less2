import * as postsDataBase from "./posts.data.base"
import { IPost } from "./posts.model";

const createPost =  (post :  {title: string; shortDescription: string; content: string; bloggerId: number; }) => {
	const createdPost: IPost =  postsDataBase.createPost(post);
	return createdPost;
};

const getPosts = () => postsDataBase.getPosts();

const getPostById = (postId: Number) => postsDataBase.getPostById(postId);

export { createPost, getPosts, getPostById };

