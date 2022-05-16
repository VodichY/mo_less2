import { Request, Response, NextFunction } from 'express';
import { decode } from 'js-base64';

const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
	const bearerHeader = req.header('Authorization') || "";
	const decodePassord = decode(bearerHeader.slice(6));
	if (decodePassord && decodePassord.split(':')[0] === "admin" && decodePassord.split(':')[1] === "qwerty") {
		next();
	} else {
		res.status(401).send('Unauthorized');
	};
}

export { checkAuthorization };