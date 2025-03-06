import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

import { ValidationError } from './validation-error';

export const handleHttpError = (err: unknown) => {
  if (axios.isAxiosError<{ message: string }>(err)) {
    const errorMessage = err.response?.data.message || err.message;
    throw new BadRequestException(errorMessage);
  } else if (err instanceof ValidationError) {
    throw new BadRequestException(err.message);
  } else {
    throw err;
  }
};
