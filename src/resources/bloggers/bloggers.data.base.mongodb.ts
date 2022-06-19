//import * as db from "../../common/db";
import { Blogger, IBlogger} from "./bloggers.model";
import { clientMongoDb } from "../../server";

const createBlogger =  async (blogger:  IBlogger) => {
	const createdBlogger = new Blogger(blogger);
	const database = clientMongoDb.db('mo_less2');
	const bloggersCollection = database.collection('bloggers');
  	const cursor = await bloggersCollection.insertOne(createdBlogger);
	return createdBlogger;
};

const getBloggerById =  async (bloggerId: number) => {
	const database = clientMongoDb.db('mo_less2');
	const bloggersCollection = database.collection('bloggers');
	const query = { id: bloggerId };
	const options = {};
  	const blogger = await bloggersCollection.findOne(query, options) as IBlogger;
	  if (blogger) {
		return blogger;
	}
	return false;
};

const updateBloggerById =  async (blogger: IBlogger, bloggerId: number) => {
 
	const dataBase = clientMongoDb.db("mo_less2");
	const bloggersCollection = dataBase.collection("bloggers");
  
	const query = { id: bloggerId };
	const options = { upsert: false };
	const updateDoc = { $set: blogger };
  
	const cursor = await bloggersCollection.updateOne(query, updateDoc, options);
	if (cursor.modifiedCount) {
		return blogger;
	}
	return false;
};

const deleteBloggerById =  async (bloggerId: number) => {
	const database = clientMongoDb.db('mo_less2');
	const bloggersCollection = database.collection('bloggers');
	const query = { id: bloggerId };
	const options = {};
  	const cursor = await bloggersCollection.deleteOne(query, options);
	  if (cursor.deletedCount) {
		return true;
	}
	return false;
};


const getBloggers = async () => {
	const database = clientMongoDb.db('mo_less2');
	const bloggersCollection = database.collection('bloggers');
	const query = {};
	const bloggersCursor = await bloggersCollection.find(query);
	const bloggers = bloggersCursor.toArray() as Promise<IBlogger[]>;
	return bloggers;
};


export { 
	createBlogger, 
	getBloggers, 
	getBloggerById, 
	updateBloggerById, 
	deleteBloggerById 
};