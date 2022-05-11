import * as db from "../../common/db";
import { Blogger, IBlogger } from "./bloggers.model";


const createBlogger =  (blogger:  {name: string; youtubeUrl: string }) => {
	const createdBlogger:IBlogger = new Blogger(blogger);
	db.dataDB.bloggers.push(createdBlogger);
	return createdBlogger;
};

const getBloggerById =  (bloggerId: Number) => {
	const foundBloger = db.dataDB.bloggers.find((elem)=> elem.id === bloggerId);
	if (foundBloger) {
		return foundBloger;
	}
	return false; 
};

const updateBloggerById =  (dataBlogger: { [key: string]: string }, bloggerId: Number) => {
	const foundBloger = db.dataDB.bloggers.find((elem)=> elem.id === bloggerId);
	if (foundBloger) {
		foundBloger.name = dataBlogger.name;
		foundBloger.youtubeUrl = dataBlogger.youtubeUrl;
		return foundBloger;
	}
	return false; 
};

const deleteBloggerById =  (bloggerId: Number) => {
	const foundBloger = db.dataDB.bloggers.find((elem)=> elem.id === bloggerId);
	if (foundBloger) {
		const bloggerIndex = db.dataDB.bloggers.indexOf(foundBloger);
		db.dataDB.bloggers.splice(bloggerIndex, 1);
		return true;
	}
	return false; 
};


const getBloggers = () => db.dataDB.bloggers;


export { 
	createBlogger, 
	getBloggers, 
	getBloggerById, 
	updateBloggerById, 
	deleteBloggerById 
};