// 위 src/index.js에서 생성한 routerRoutesMd, routerAllowMethodsMd를 별도의 파일로 분리

import Boom from "@hapi/boom";

const routerRoutesMd = (r) => r.routes();
const routerAllowMethodsMd = (r) => r.allowedMethods({
  throw: true,
  notImplemented: () => Boom.notImplemented("that method is not allowed"),
  methodNotAllowed: () => Boom.methodNotAllowed("that method is not allowed"),
});

// 두 함수 export
export {
  routerRoutesMd,
  routerAllowMethodsMd,
};
