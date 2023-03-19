import { UnprocessableEntityException } from '@nestjs/common';

export function imageFileFilter(req: any, file: any, callback: any) {
	// console.log(file);
	if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
		return callback(new UnprocessableEntityException('Only image files (jpg/png) are allowed'), false);
	if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png')
		return callback(new UnprocessableEntityException('Only image files (jpg/png) are allowed'), false);
	callback(null, true);
};
