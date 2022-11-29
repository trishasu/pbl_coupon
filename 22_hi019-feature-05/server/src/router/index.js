import KoaRouter from "koa-router";
import ceotbRouter from "./ceotb";
import custtbRouter from "./custtb";
// import userRouter from "./user";
// import authenticationRouter from "./authentication";
// import itemRouter from "./item";
// import couponRouter from "./coupon";

const router = new KoaRouter({
  prefix: "/api/v1",
});

// 원래는 이렇게 적혀있었음
// router.use("/ceotb", ceotbRouter.routes());
// router.use("/cust", custtbRouter.routes());

// 새로 고친 코드
router.use("/cust", custtbRouter.routes());
// "/cust"로 하면 test 날렸을 때 POST {{BASEURL}}/cust는 200인데
// POST {{BASEURL}}/cust/login가 404 에러뜸..
// "/custtb"로 하면 둘다 404에러뜸..

router.use("/ceotb", ceotbRouter.routes());

// router.use("/users", userRouter.routes());
// router.use("/items", itemRouter.routes());
// router.use("/authentication", authenticationRouter.routes());
// router.use("/coupon", couponRouter.routes());

export default router;
