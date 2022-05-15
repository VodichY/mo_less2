import { Request, Response, NextFunction } from 'express';
import  {checkSchema, validationResult } from 'express-validator';

const validatePostInputModel = checkSchema( {
	title: {
		isString: true,
		isLength: {
			errorMessage: 'title should be not more 30 chars long',
			options: { max: 30 }
		}

	},
	shortDescription: {
		isString: true,
		isLength: {
			errorMessage: 'shortDescription should be not more 100 chars long',
			options: { max: 100 }
		}
	},
	content: {
		isString: true,
		isLength: {
			errorMessage: 'content should be not more 1000 chars long',
			options: { max: 1000 }
		}
	},
	bloggerId: {
		isInt: true
	}
});

const validateHandler = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
	} else {
		next();
	};
}

export { validatePostInputModel, validateHandler };