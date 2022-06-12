import { Request, Response, Router } from 'express';
import * as postsService from "./posts.service";
import * as bloggersService from "../bloggers/bloggers.service";
import { IPost } from "./posts.model";
import { IBlogger } from "../bloggers/bloggers.model";
import { validatePostInputModel, validateHandler } from "../../common/validate";
import { checkAuthorization } from "../../common/authorization";

const router = Router();

router.route("/").get(async (req: Request, res: Response) => {
	const posts: Array<IPost> = await postsService.getPosts();
	res.status(200).json(posts);
});

router.route("/").post(checkAuthorization, validatePostInputModel, validateHandler, async (req: Request, res: Response) => {

	const bloggerId: Number = +req.body.bloggerId;
	const blogger: IBlogger | boolean = await bloggersService.getBloggerById(bloggerId);
	if (!blogger) {
		res.status(400).json(
			{
				"errorsMessages": [
					{
						"message": "Invalid 'bloggerId': such blogger doesn't exist",
						"field": "bloggerId"
					}
				],
				"resultCode": 1
			}
		);
		return;
	}

	const post: IPost = await postsService.createPost(
		{
			title: req.body.title,
			shortDescription: req.body.shortDescription,
			content: req.body.content,
			bloggerId: req.body.bloggerId
		}, blogger);
			
	res.status(201).json(post);
});

router.route("/:id").get( async (req: Request, res: Response) => {
	const postId: Number = +req.params.id;
	const post: IPost | boolean = await postsService.getPostById(postId);
	if (post) {
		res.status(200).json(post);
	} else {
		res.status(404).send('post not found');
	}
});


router.route("/:id").put(checkAuthorization, validatePostInputModel, validateHandler, async (req: Request, res: Response) => {
	const postId: Number = +req.params.id;
	
	const bloggerId: Number = +req.body.bloggerId;
	const blogger: IBlogger | boolean = await bloggersService.getBloggerById(bloggerId);
	if (!blogger) {
		res.status(400).json(
			{
				"errorsMessages": [
					{
						"message": "Invalid 'bloggerId': such blogger doesn't exist",
						"field": "bloggerId"
					}
				],
				"resultCode": 1
			}
		);
		return;
	}

	const post: IPost | boolean = await postsService.updatePostById(req.body, postId);
	if (post) {
		res.status(204).json(post);
	} else {
		res.status(404).send('post not found');
	}
});


router.route("/:id").delete(checkAuthorization, async (req: Request, res: Response) => {
	const postId: Number = +req.params.id;
	const isDeleted: boolean =  await postsService.deletePostById(postId);
	if (isDeleted) {
		res.sendStatus(204);
	} else {
		res.status(404).send('post not found');
	}
});

export { router };