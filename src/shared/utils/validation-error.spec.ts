import { ValidationError } from './validation-error';

describe('ValidationError', () => {
  it('should create an instance with the correct message', () => {
    const errorMessage = 'Invalid input';
    const error = new ValidationError(errorMessage);

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe(errorMessage);
    expect(error.name).toBe('ValidationError');
  });

  it('should extend the built-in Error class', () => {
    const error = new ValidationError('Some error');
    expect(error).toBeInstanceOf(Error);
  });
});
