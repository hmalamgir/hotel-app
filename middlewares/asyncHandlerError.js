// eslint-disable-next-line import/no-anonymous-default-export
export default (func) => (req, res, next) => {
  return Promise.resolve(func(req, res, next)).catch(next);
};
