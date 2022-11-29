export const validateData = async (ctx, next) => {
  await next();
};

export const saveData = async (ctx, next) => {
  await next();
};

export const response = async (ctx) => {
  ctx.status = 200;
  ctx.body = "ok";
};
