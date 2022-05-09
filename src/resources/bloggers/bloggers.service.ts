import { createBloggerDb } from "./bloggers.db"
import { IBlogger, Blogger } from "./bloggers.model";

const createService = async (bloger:  { id: number; name: string; youtubeUrl: string }) => {
	
	const bloger1: IBlogger =  await createBloggerDb(bloger);
		  return bloger1;
	// return {	
	// 	id: bloger.id,	
	// 	name: bloger.name,
	// 	youtubeUrl: bloger.youtubeUrl			
	//   };
};

export { createService };