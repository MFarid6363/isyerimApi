export default (fn: (arg0: any, arg1: any, arg2: any) => Promise<any>) => (req: any, res: any, next: (arg0: any) => any) => {
  fn(req, res, next).catch((err) => next(err));
};
