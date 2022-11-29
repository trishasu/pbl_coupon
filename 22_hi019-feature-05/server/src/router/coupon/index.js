import KoaRouter from "koa-router";
import * as couponCtrl from "./coupon.ctrl";

const router = new KoaRouter();

router.post("/", couponCtrl.validateData, couponCtrl.saveData, couponCtrl.response);
// router.get("/:id", couponCtrl.validateId, couponCtrl.read, couponCtrl.response);

export default router;
