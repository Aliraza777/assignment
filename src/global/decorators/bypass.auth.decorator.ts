import { SetMetadata } from '@nestjs/common';

export const BYPASS_KEY = 'isPublic';
export const BypassAuth = () => {
  return SetMetadata(BYPASS_KEY, true);
};
