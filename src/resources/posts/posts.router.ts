import { Request, Response, Router } from 'express';
const router = Router();

router.route("/").get(async (req: Request, res: Response) => {
	res.status(201).send('get posts');
});

router.route("/").post(async (req: Request, res: Response) => {
    res.status(201).send('post posts');
});

router.route("/:id").get(async (req: Request, res: Response) => {
	res.status(201).send('get posts id');
});

router.route("/:id").put(async (req: Request, res: Response) => {
	res.status(201).send('put posts id');
});

router.route("/:id").delete(async (req: Request, res: Response) => {
	res.status(201).send('delete posts id');
});

export { router };