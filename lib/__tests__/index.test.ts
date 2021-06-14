import sayHello from '../index';

describe('Test Say Hello', () => {
  test('should return say hello', () => {
    expect(sayHello()).toBe('hello world');
  });
});
