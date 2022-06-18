import * as bloggersDataBase from "./bloggers.data.base.mongodb"
import { IBlogger } from "./bloggers.model";

const createBlogger =  async (blogger: IBlogger) => {
	const createdBlogger: IBlogger = await bloggersDataBase.createBlogger(blogger);
	return createdBlogger;//createdBlogger;
};

const getBloggers = async () => {
	return await bloggersDataBase.getBloggers();
}

 const getBloggerById = async (bloggerId: string) => {
	return await bloggersDataBase.getBloggerById(bloggerId);
 };

const updateBloggerById = async (blogger: IBlogger, bloggerId: string) => {
	return await bloggersDataBase.updateBloggerById(blogger, bloggerId);
}

const deleteBloggerById = async (bloggerId: string) => {
	return await bloggersDataBase.deleteBloggerById(bloggerId);
}


export { 
	createBlogger, 
	getBloggers, 
	getBloggerById, 
	updateBloggerById, 
	deleteBloggerById 
};