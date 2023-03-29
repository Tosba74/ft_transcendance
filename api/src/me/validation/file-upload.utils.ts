import { UnprocessableEntityException } from '@nestjs/common';

export function imageFileFilter(req: any, file: any, callback: any) {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
		return callback(new UnprocessableEntityException('Only image files (jpg/png/gif) are allowed'), false);
	if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/gif')
		return callback(new UnprocessableEntityException('Only image files (jpg/png/gif) are allowed'), false);
	callback(null, true);
};
