// ctx.throw로 작성된 부분을 boom 패키지로 변경한다.
// boom import
import Boom from "@hapi/boom";

const errorHandlerMd = async (ctx, next) => {
  try {
    await next();

    // Boom으로 변경
    if (ctx.status === 404) {
      throw Boom.notFound("not found");
    }
  } catch (err) {
    // Boom으로 변경
    // boom에서 발생한 output.statusCode를 ctx.status로 설정
    ctx.status = (err.output && err.output.statusCode)
      ? err.output.statusCode : 500;

    // Boom으로 변경
    // boom에서 발생한 output.payload를 ctx.body로 설정
    ctx.body = (err.output && err.output.payload)
      ? err.output.payload : {
        statusCode: ctx.status,
        error: "Internal Server Error",
        message: "Unknown Error",
      };

    // ctx.app.emit("error", err, ctx);
  }
};

export default errorHandlerMd;
