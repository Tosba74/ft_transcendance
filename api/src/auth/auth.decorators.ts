import { SetMetadata } from '@nestjs/common';

export const ALLOW_PUBLIC = 'allowPublic';
export const AllowPublic = () => SetMetadata(ALLOW_PUBLIC, true);

export const ALLOW_LOGGED = 'allowLogged';
export const AllowLogged = () => SetMetadata(ALLOW_LOGGED, true);