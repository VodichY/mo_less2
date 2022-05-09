import { Request, Response, Router } from 'express';
import { createService } from "./bloggers.service";
import { IBlogger } from "./bloggers.model";


const router = Router();

router.route("/").get(async (req: Request, res: Response) => {
	res.status(201).send('get blogers');
});

router.route("/").post(async (req: Request, res: Response) => {
	
	const bloger: IBlogger =  await createService (	
		{	
			id: req.body.id,
			name: req.body.name,
			youtubeUrl: req.body.youtubeUrl			
		  }
	);

	res.status(201).json(bloger);
});

router.route("/:id").get(async (req: Request, res: Response) => {
	res.status(201).send('get blogers id');
});

router.route("/:id").put(async (req: Request, res: Response) => {
	res.status(201).send('put blogers id');
});

router.route("/:id").delete(async (req: Request, res: Response) => {
	res.status(201).send('delete blogers id');
});

export { router };