import { Request, Response, Router } from 'express';
import * as postsService from "./posts.service";
import * as bloggersService from "../bloggers/bloggers.service";
import { Post } from "./posts.model";
import { validatePostInputModel, validateHandler } from "../../common/validate";
import { checkAuthorization } from "../../common/authorization";

const router = Router();

router.route("/").get(async (req: Request, res: Response) => {
	const { SearchNameTerm, PageNumber, PageSize } = req.query;
	const result = await postsService.getPosts({ SearchNameTerm, PageNumber, PageSize } as { [key: string]: string });
	res.status(200).json(Post.pagination(result));
});

router.route("/").post(checkAuthorization, validatePostInputModel, validateHandler, async (req: Request, res: Response) => {

	const bloggerId: number = +req.body.bloggerId;
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
			bloggerId: req.body.bloggerId
		}, blogger);
			
	res.status(201).json(Post.toResponse(post));
});

router.route("/:id").get( async (req: Request, res: Response) => {
	const postId: number = +req.params.id;
	const post = await postsService.getPostById(postId);
	if (post) {
		res.status(200).json(Post.toResponse(post));
	} else {
		res.status(404).send('post not found');
	}
});

router.route("/:id").put(checkAuthorization, validatePostInputModel, validateHandler, async (req: Request, res: Response) => {
	const postId: number = +req.params.id;	
	const bloggerId: number = +req.body.bloggerId;
	const blogger = await bloggersService.getBloggerById(bloggerId);
	if (!blogger) {
		res.status(400).json(
			{
				"errorsMessages": [
					{
						"message": "Invalid 'bloggerId': such blogger doesn't exist",
						"field": "bloggerId"
					}
				]
			}
		);
		return;
	}

	const post = await postsService.updatePostById(
		{
			title: req.body.title,
			shortDescription: req.body.shortDescription,
			content: req.body.content,
			bloggerId: req.body.bloggerId
		}, postId);
	if (post) {
		res.status(204).json(post);
	} else {
		res.status(404).send('post not found');
	}
});


router.route("/:id").delete(checkAuthorization, async (req: Request, res: Response) => {
	const postId = +req.params.id;
	const isDeleted =  await postsService.deletePostById(postId);
	if (isDeleted) {
		res.sendStatus(204);
	} else {
		res.status(404).send('post not found');
	}
});

export { router };