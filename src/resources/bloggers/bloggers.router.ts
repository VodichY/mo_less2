import { Request, Response, Router } from 'express';
import * as bloggersService from "./bloggers.service";
import * as postsService from "../posts/posts.service";
import { Blogger } from "./bloggers.model";
import { Post } from "../posts/posts.model";
import { validateBloggersInputModel, validatePostInputModel, validateHandler } from "../../common/validate";
import { checkAuthorization } from "../../common/authorization";

const router = Router();

router.route("/").get(async (req: Request, res: Response) => {
	const { SearchNameTerm, PageNumber, PageSize } = req.query;
	const result = await bloggersService.getBloggers({ SearchNameTerm, PageNumber, PageSize } as { [key: string]: string });
	res.status(200).json(Blogger.pagination(result));
});

router.route("/").post(checkAuthorization, validateBloggersInputModel, validateHandler, async (req: Request, res: Response) => {
	const { name, youtubeUrl } = req.body;
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

router.route("/:id/posts").get(async (req: Request, res: Response) => {
	const { PageNumber, PageSize } = req.query;
	const bloggerId = req.params.id;
	const blogger = await bloggersService.getBloggerById(+bloggerId);
	if (!blogger) {
		res.status(400).json(
			{
				errorsMessages: [
					{
						message: "Invalid 'bloggerId': such blogger doesn't exist",
						field: "bloggerId"
					}
				]
			}
		);
		return;
	}

	const result = await postsService.getPostByBloggerId({ bloggerId, PageNumber, PageSize } as { [key: string]: string });
	res.status(200).json(Post.pagination(result)); 
});

router.route("/:id/posts").post(checkAuthorization, validatePostInputModel, validateHandler, async (req: Request, res: Response) => {
	const bloggerId = +req.params.id;
	const blogger = await bloggersService.getBloggerById(bloggerId);
	if (!blogger) {
		res.status(400).json(
			{
				errorsMessages: [
					{
						message: "Invalid 'bloggerId': such blogger doesn't exist",
						field: "bloggerId"
					}
				]
			}
		);
		return;
	}

	const post = await postsService.createPost(
		{
			title: req.body.title,
			shortDescription: req.body.shortDescription,
			content: req.body.content,
			bloggerId: bloggerId
		}, blogger);
			
	res.status(201).json(Post.toResponse(post)); 
});

router.route("/:id").put(checkAuthorization, validateBloggersInputModel, validateHandler, async (req: Request, res: Response) => {
	const bloggerId: number = +req.params.id;
	const { name, youtubeUrl } = req.body;
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