import * as bloggersDataBase from "./bloggers.data.base"
import { IBlogger } from "./bloggers.model";

const createBlogger =  (blogger :  {name: string; youtubeUrl: string }) => {
	const createdBlogger: IBlogger =  bloggersDataBase.createBlogger(blogger);
	return createdBlogger;
};

const getBloggers = () => bloggersDataBase.getBloggers();

const getBloggerById = (bloggerId: Number) => bloggersDataBase.getBloggerById(bloggerId);

const updateBloggerById = (dataBlogger: { [key: string]: string }, bloggerId: Number) => {
	return bloggersDataBase.updateBloggerById(dataBlogger, bloggerId);
}

const deleteBloggerById = (bloggerId: Number) => bloggersDataBase.deleteBloggerById(bloggerId);

export { 
	createBlogger, 
	getBloggers, 
	getBloggerById, 
	updateBloggerById, 
	deleteBloggerById 
};