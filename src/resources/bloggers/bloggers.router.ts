import { Request, Response, Router } from 'express';
import * as bloggersService from "./bloggers.service";
import { Blogger, IBlogger } from "./bloggers.model";

const router = Router();

router.route("/").get( (req: Request, res: Response) => {
	const blogers: Array<IBlogger> = bloggersService.getBloggers();
	res.status(200).json(blogers);
});

router.route("/").post((req: Request, res: Response) => {
	
	const bloger: IBlogger = bloggersService.createBlogger (	
	{	name: req.body.name,
	 	youtubeUrl: req.body.youtubeUrl
	});

	res.status(201).json(Blogger.toResponse(bloger));
});

router.route("/:id").get(async (req: Request, res: Response) => {
	const bloggerId: Number = +req.params.id;
	const bloger: IBlogger | boolean = bloggersService.getBloggerById(bloggerId);
	if (bloger) {
		res.status(200).json(bloger);
	} else {
		res.status(404).send('blogger not found');	
	}
});

router.route("/:id").put(async (req: Request, res: Response) => {
	const bloggerId: Number = +req.params.id;
	const bloger: IBlogger | boolean = bloggersService.updateBloggerById(req.body, bloggerId);
	if (bloger) {
		res.status(204).json(bloger);
	} else {
		res.status(404).send('blogger not found');
	}
});

router.route("/:id").delete(async (req: Request, res: Response) => {
	const bloggerId: Number = +req.params.id;
	const isDeleted: boolean = bloggersService.deleteBloggerById(bloggerId);
	if (isDeleted) {
		res.sendStatus(204);
	} else {
		res.status(404).send('blogger not found');
	}
});

export { router };