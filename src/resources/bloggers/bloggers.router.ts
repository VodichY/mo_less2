import { Request, Response, Router } from 'express';
const router = Router();

router.route("/").get(async (req: Request, res: Response) => {
	res.status(201).send('get blogers');
});

router.route("/").post(async (req: Request, res: Response) => {
    res.status(201).send('post blogers');
});

router.route("/:id").get(async (req: Request, res: Response) => {
	res.status(201).send('get blogers');
});

router.route("/:id").put(async (req: Request, res: Response) => {
	res.status(201).send('get blogers');
});

router.route("/:id").delete(async (req: Request, res: Response) => {
	res.status(201).send('get blogers');
});

export { router };