import KoaRouter from "koa-router";
import * as ceotbController from "./ceotb.ctrl";

const router = new KoaRouter();

router.get("/", ceotbController.read);
router.post("/", ceotbController.create);
router.put("/", ceotbController.update);
router.delete("/:ceoId", ceotbController.remove);

router.post("/login", ceotbController.ceologin);
router.post("/ceoid", ceotbController.ceoid);

router.get("/:ceoId", ceotbController.readByCeoId);

// router.post("/ceo/checkpw", ceotbController.ceologincheck);
// 이것도 전에 쓰던 함수라 일단 주석처리...

// ceo가 pw를 입력하면, coin이 나오도록
// router.get("/:custPw", ceotbController.ceologincheck);

export default router;
