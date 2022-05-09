import { DB } from "../../common/db"
import { Blogger, IBlogger } from "./bloggers.model";

const createBloggerDb = async (bloger:  { id: number; name: string; youtubeUrl: string }) => {
	const obloger:IBlogger = await new Blogger(bloger);
	DB.bloggers.push(obloger);
	return obloger;
};

export { createBloggerDb };