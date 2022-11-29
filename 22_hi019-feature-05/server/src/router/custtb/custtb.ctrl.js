import bcrypt from "bcrypt";

// custtb에 custId, custPw, custPt
export const read = async (ctx) => {
  try {
    const { db } = ctx;
    const sql = "SELECT custId, custPw, custPt FROM custtb";
    const result = await db.all(sql);
    ctx.status = 200;
    ctx.body = result;
  } catch (e) {
    console.log(e);
  }
};

export const create = async (ctx) => {
  try {
    const { db } = ctx;
    const { custId, custPw, custPt } = ctx.request.body;

    const hashedPassword = await bcrypt.hashSync(custPw, 10);

    const stmt = db.prepare(
      "INSERT INTO custtb (custId, custPw, custPt) VALUES (?, ?, ?)"
    );
    stmt.run(custId, hashedPassword, custPt);
    stmt.finalize();
  } catch (e) {
    console.log(e);
  }

  ctx.status = 200;
};

export const update = async (ctx) => {
  try {
    const { db } = ctx;
    const { custId, custPt } = ctx.request.body;

    const stmt = db.prepare("UPDATE custtb SET custPt=? where custId = ?");
    stmt.run(custPt, custId);
    stmt.finalize();
  } catch (e) {
    console.log(e);
  }

  ctx.status = 200;
};

export const remove = async (ctx) => {
  try {
    const { db } = ctx;
    const { custId } = ctx.params;

    const stmt = db.prepare("DELETE FROM custtb where custId = ?");
    stmt.run(custId);
    stmt.finalize();
  } catch (e) {
    console.log(e);
  }

  ctx.status = 200;
};

export const custlogin = async (ctx) => { // customer 로그인할 때
  try {
    const { db } = ctx;
    const { custId, custPw } = ctx.request.body;

    const sql = "SELECT custId, custPw, custPt FROM custtb where custId=?";
    const result = await db.get(sql, [custId]);

    if (result.custId && result.custPw) {
      if (bcrypt.compareSync(custPw, result.custPw)) {
        ctx.status = 200;
        ctx.body = {
          custId: result.custId,
          custPt: result.custPt,
        };
      } else {
        ctx.status = 404;
      }
    } else {
      ctx.status = 404;
    }
  } catch (e) {
    console.log(e);
  }
};
/*
export const custid = async (ctx) => {
  try {
    const { db } = ctx;
    const { custId, custPt } = ctx.request.body;

    const sql = "SELECT custId, custPt FROM custtb where custId=?";
    const result = await db.get(sql, [custId, custPt]);
    ctx.status = 200;
    ctx.body = result;
  } catch (e) {
    console.log(e);
  }
}; */

export const readByCustId = async (ctx) => { // customer이 쿠폰 받기 위해 아이디 입력할 때.
  try {
    const { db } = ctx;
    const { custId } = ctx.params;

    const sql = "SELECT custId, custPt FROM custtb where custId=?";
    const result = await db.get(sql, [custId]);
    ctx.status = 200;
    ctx.body = result;
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

export const readByCustPt = async (ctx) => { // 카페 리스트 상단에 customer의 쿠폰 갯수 보여주기
  try {
    const { db } = ctx;
    const { custPt } = ctx.params;

    const sql = "SELECT custId, custPt FROM custtb where custId=?";
    const result = await db.get(sql, [custPt]);
    ctx.status = 200;
    ctx.body = result;
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};
