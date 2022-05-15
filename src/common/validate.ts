import { Request, Response, NextFunction } from 'express';
import  {checkSchema, validationResult } from 'express-validator';

const validateBloggersInputModel = checkSchema( {
	name: {
		trim: true,
		notEmpty: {
			bail: true,
			errorMessage: 'name field is requered',
		},
		isLength: {
			bail: true,
			errorMessage: 'name should be not more 15 chars long',
			options: { max: 15 }
		}

	},
	youtubeUrl: {
		trim: true,
		notEmpty: {
			bail: true,
			errorMessage: 'shortDescription field is requered',
		},
		isLength: {
			bail: true,
			errorMessage: 'shortDescription should be not more 100 chars long',
			options: { max: 100 }
		},
		isURL: {
			bail: true,
			negated: false,
			errorMessage: 'shortDescription should be URL',
		}
	}
});

const validatePostInputModel = checkSchema( {
	title: {
		trim: true,
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
		trim: true,
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
		trim: true,
		notEmpty: {
			bail: true,
			errorMessage: 'content field is requered',
		},
		isLength: {
			errorMessage: 'content should be not more 1000 chars long',
			options: { max: 1000 }
		}
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


export { validateBloggersInputModel, validatePostInputModel, validateHandler};