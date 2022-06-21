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

const getBloggers = async (params: {[key: string]: string}) => {
	const searchNameTerm = params.SearchNameTerm || "";
	const pageNumber = +params.PageNumber || 1;
	const pageSize = +params.PageSize || 10;
	const database = clientMongoDb.db('mo_less2');
	const bloggersCollection = database.collection('bloggers');
	const query = { name: { $regex: searchNameTerm } };
	const bloggers = await bloggersCollection.find(query).sort({ _id: -1 }).skip((pageNumber - 1) * pageSize).limit(pageSize).toArray() as IBlogger[];
	const bloggersCount = await bloggersCollection.countDocuments(query);
	const pagesCount = Math.ceil(bloggersCount / pageSize);
	return { bloggers , bloggersCount, pagesCount, pageNumber, pageSize };
};

export { 
	createBlogger, 
	getBloggers, 
	getBloggerById, 
	updateBloggerById, 
	deleteBloggerById 
};