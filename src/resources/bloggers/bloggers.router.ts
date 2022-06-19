import { Request, Response, Router } from 'express';
import * as bloggersService from "./bloggers.service";
import { Blogger } from "./bloggers.model";
import { validateBloggersInputModel, validateHandler } from "../../common/validate";
import { checkAuthorization } from "../../common/authorization";

const router = Router();

router.route("/").get(async (req: Request, res: Response) => {
	const { SearchNameTerm, PageNumber, PageSize } = req.query;
	const bloggers = await bloggersService.getBloggers();
	res.status(200).json(bloggers.map((elem) => Blogger.toResponse(elem)));
});

router.route("/").post(checkAuthorization, validateBloggersInputModel, validateHandler, async (req: Request, res: Response) => {
	const { name, youtubeUrl } =  req.body;
	const blogger = await bloggersService.createBlogger({ name, youtubeUrl });
	res.status(201).json(Blogger.toResponse(blogger));
});

router.route("/:id").get(async (req: Request, res: Response) => {
	const bloggerId: number = +req.params.id;
	const blogger = await bloggersService.getBloggerById(bloggerId);
	if (blogger) {
		res.status(200).json(Blogger.toResponse(blogger));
	} else {
		res.status(404).send('blogger not found');
	}
});

router.route("/:id").put(checkAuthorization, validateBloggersInputModel, validateHandler, async (req: Request, res: Response) => {
	const bloggerId: number = +req.params.id;
	const { name, youtubeUrl } =  req.body;
	const blogger = await bloggersService.updateBloggerById({ name, youtubeUrl }, bloggerId); 
	if (blogger) {
		res.sendStatus(204);
	} else {
		res.status(404).send('blogger not found');
	}
});

router.route("/:id").delete(checkAuthorization, async (req: Request, res: Response) => {
	const bloggerId: number = +req.params.id;
	const isDeleted: boolean = await bloggersService.deleteBloggerById(bloggerId);
	if (isDeleted) {
		res.sendStatus(204);
	} else {
		res.status(404).send('blogger not found');
	}
});

export { router };