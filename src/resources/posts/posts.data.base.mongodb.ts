import { Post, IPost } from "./posts.model";
import { IBlogger } from "../bloggers/bloggers.model";
import { clientMongoDb } from "../../server";

const createPost = async (post: IPost, blogger: IBlogger) => {
	post.bloggerName = blogger.name;
	const createdPost: IPost = new Post(post);	
	const database = clientMongoDb.db('mo_less2');
	const postsCollection = database.collection('posts');
	const cursor = await postsCollection.insertOne(createdPost);
	return createdPost;
};

const getPosts = async (params: {[key: string]: string}) => {
	const pageNumber = +params.PageNumber || 1;
	const pageSize = +params.PageSize || 10;
	const database = clientMongoDb.db('mo_less2');
	const postsCollection = database.collection('posts');
	const query = {};
	const options = {};
	const posts = await postsCollection.find(query, options).skip((pageNumber - 1) * pageSize).limit(pageSize).toArray() as IPost[];
	const postsCount = await postsCollection.countDocuments(query);
	const pagesCount = Math.ceil(postsCount / pageSize);
	return { posts , postsCount, pagesCount, pageNumber, pageSize };
}


const getPostById = async (postId: number) => {
	const database = clientMongoDb.db('mo_less2');
	const postsCollection = database.collection('posts');
	const query = { id: postId };
	const options = {};
  	const post = await postsCollection.findOne(query, options) as IPost;
	  if (post) {
		return post;
	}
	return false;
};

const getPostByBloggerId = async (params: {[key: string]: string}) => {
	const bloggerId = +params.bloggerId;
	const pageNumber = +params.PageNumber || 1;
	const pageSize = +params.PageSize || 10;
	const database = clientMongoDb.db('mo_less2');
	const postsCollection = database.collection('posts');
	const query = { bloggerId: bloggerId };
	const options = {};
	const posts = await postsCollection.find(query, options).skip((pageNumber - 1) * pageSize).limit(pageSize).toArray() as IPost[];
	const postsCount = await postsCollection.countDocuments(query);
	const pagesCount = Math.ceil(postsCount / pageSize);
	return { posts , postsCount, pagesCount, pageNumber, pageSize };
};

const updatePostById = async ( post: IPost, postId: number ) => {
	const dataBase = clientMongoDb.db("mo_less2");
	const postsCollection = dataBase.collection("posts");
  
	const query = { id: postId };
	const options = { upsert: false };
	const updateDoc = { $set: post };
  
	const cursor = await postsCollection.updateOne(query, updateDoc, options);
	if (cursor.modifiedCount) {
		return post;
	}
	return false;
};

const deletePostById = async (postId: number) => {
	const database = clientMongoDb.db('mo_less2');
	const postsCollection = database.collection('posts');
	const query = { id: postId };
	const options = {};
  	const cursor = await postsCollection.deleteOne(query, options);
	  if (cursor.deletedCount) {
		return true;
	}
	return false;
};

export { 
	createPost, 
	getPosts, 
	getPostById,
	updatePostById, 
	deletePostById,
	getPostByBloggerId 
};
