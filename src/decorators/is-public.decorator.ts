import { SetMetadata } from '@nestjs/common';

export const isPublic = () => SetMetadata('IS_PUBLIC', true);
