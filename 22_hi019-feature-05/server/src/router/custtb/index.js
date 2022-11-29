import KoaRouter from "koa-router";
import * as custtbController from "./custtb.ctrl";

const router = new KoaRouter();

router.get("/", custtbController.read);
router.post("/", custtbController.create);
router.put("/", custtbController.update);
router.delete("/:custId", custtbController.remove);

router.post("/login", custtbController.custlogin);
// router.post("/custid", custtbController.custid);

router.get("/:custId", custtbController.readByCustId);
router.get("/:custPt", custtbController.readByCustPt);
// path param.

export default router;
