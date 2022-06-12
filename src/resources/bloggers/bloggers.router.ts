import { Request, Response, Router } from 'express';
import * as bloggersService from "./bloggers.service";
import { Blogger, IBlogger } from "./bloggers.model";
import { validateBloggersInputModel, validateHandler } from "../../common/validate";
import { checkAuthorization } from "../../common/authorization";

const router = Router();

router.route("/").get(async (req: Request, res: Response) => {
	const bloggers: Array<IBlogger> = await bloggersService.getBloggers();
	res.status(200).json(bloggers);
});

router.route("/").post(checkAuthorization, validateBloggersInputModel, validateHandler, async (req: Request, res: Response) => {

	const blogger: IBlogger = await bloggersService.createBlogger(
		{
			name: req.body.name,
			youtubeUrl: req.body.youtubeUrl
		});

	res.status(201).json(Blogger.toResponse(blogger));
});

router.route("/:id").get(async (req: Request, res: Response) => {
	const bloggerId: Number = +req.params.id;
	const blogger: IBlogger | boolean = await bloggersService.getBloggerById(bloggerId);
	if (blogger) {
		res.status(200).json(blogger);
	} else {
		res.status(404).send('blogger not found');
	}
});

router.route("/:id").put(checkAuthorization, validateBloggersInputModel, validateHandler, async (req: Request, res: Response) => {
	const bloggerId: Number = +req.params.id;
	const blogger: IBlogger | boolean = await bloggersService.updateBloggerById(req.body, bloggerId);
	if (blogger) {
		res.status(204).json(blogger);
	} else {
		res.status(404).send('blogger not found');
	}
});

router.route("/:id").delete(checkAuthorization, async (req: Request, res: Response) => {
	const bloggerId: Number = +req.params.id;
	const isDeleted: boolean = await bloggersService.deleteBloggerById(bloggerId);
	if (isDeleted) {
		res.sendStatus(204);
	} else {
		res.status(404).send('blogger not found');
	}
});

export { router };