import { Request, Response, NextFunction } from 'express';
import  {checkSchema, validationResult, ErrorFormatter } from 'express-validator';

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
	const errors = validationResult(req).formatWith(
		({ location, msg, param, value, nestedErrors }) => {
			return `{message: ${msg}, field: ${param}}`;
			//{ errorsMessages: [{ message: Any<String>, field: "youtubeUrl" }, { message: Any<String>, field: "name" }], resultCode: 1 }
		  }
	);
	if (!errors.isEmpty()) {
		res.status(400).json({ errorsMessages: errors.array(),resultCode: 1});
	} else {
		next();
	};
}


export { validatePostInputModel, validateHandler};