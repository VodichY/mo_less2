import express, { Request, Response, NextFunction } from 'express'
import { router as bloggerRouter }  from './resources/bloggers/bloggers.router';
import { router as postsRouter }  from './resources/posts/posts.router';

const app = express()

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
	if (req.originalUrl === '/') {
	  res.send('Service is running!');
	  return;
	}
	next();
  });

  app.use('/bloggers', bloggerRouter);
  app.use('/posts', postsRouter);
 
  export { app };

