import { Request, Response, NextFunction } from 'express';
import  {checkSchema, validationResult } from 'express-validator';

const validatePostInputModel = checkSchema( {
	title: {
		notEmpty: {
			bail: true,
			errorMessage: 'title field is requered',
		},
		isLength: {
			bail: true,
			errorMessage: 'title should be not more 30 chars long',
			options: { max: 30 }
		}

	},
	shortDescription: {
		notEmpty: {
			bail: true,
			errorMessage: 'shortDescription field is requered',
		},
		isLength: {
			errorMessage: 'shortDescription should be not more 100 chars long',
			options: { max: 100 }
		}
	},
	content: {
		notEmpty: {
			bail: true,
			errorMessage: 'content field is requered',
		},
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
			return {message: msg, field: param};
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