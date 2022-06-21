import * as bloggersDataBase from "./bloggers.data.base.mongodb"
import { IBlogger } from "./bloggers.model";

const createBlogger =  async (blogger: IBlogger) => {
	return await bloggersDataBase.createBlogger(blogger);
};

const getBloggers = async (params: {[key: string]: string}) => {
	return await bloggersDataBase.getBloggers(params);
}

 const getBloggerById = async (bloggerId: number) => {
	return await bloggersDataBase.getBloggerById(bloggerId);
 };

const updateBloggerById = async (blogger: IBlogger, bloggerId: number) => {
	return await bloggersDataBase.updateBloggerById(blogger, bloggerId);
}

const deleteBloggerById = async (bloggerId: number) => {
	return await bloggersDataBase.deleteBloggerById(bloggerId);
}

export { 
	createBlogger, 
	getBloggers, 
	getBloggerById, 
	updateBloggerById, 
	deleteBloggerById 
};