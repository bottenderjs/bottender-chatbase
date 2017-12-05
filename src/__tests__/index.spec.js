it('should print error when require it', () => {
  expect(() => require('../')).toThrow();
});
