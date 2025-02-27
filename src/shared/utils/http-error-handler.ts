import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { ValidationError } from './validation-error';

export const handleHttpError = (err: unknown) => {
  if (err instanceof AxiosError) {
    console.log('AxiosError', err);
    throw new BadRequestException(err.message);
  }

  if (err instanceof ValidationError) {
    console.log('ValidationError', err);
    throw new BadRequestException(err.message);
  }

  throw new InternalServerErrorException('Ha ocurrido un error');
};
