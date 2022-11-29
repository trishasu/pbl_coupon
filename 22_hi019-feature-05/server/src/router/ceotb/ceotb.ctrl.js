import bcrypt from "bcrypt";

export const read = async (ctx) => {
  try {
    const { db } = ctx;

    const sql = "SELECT ceoId, ceoPw, ceoPt FROM ceotb";
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
    const { ceoId, ceoPw, ceoPt } = ctx.request.body;

    const hashedPassword = await bcrypt.hashSync(ceoPw, 10);

    const stmt = db.prepare(
      "INSERT INTO ceotb (ceoId, ceoPw, ceoPt) VALUES (?, ?, ?)",
    );
    stmt.run(ceoId, hashedPassword, ceoPt);
    stmt.finalize();
  } catch (e) {
    console.log(e);
  }

  ctx.status = 200;
};

// export const update = async (ctx) => {
//   try {
//     const { db } = ctx;
//     const { ceoId, ceoPw, ceoPt } = ctx.request.body;

//     const stmt = db.prepare(
//       "UPDATE ceotb SET ceoPw =? , ceoPt=? where ceoId = ?"
//     );
//     stmt.run(ceoPw, ceoPt, ceoId);
//     stmt.finalize();
//   } catch (e) {
//     console.log(e);
//   }

//   ctx.status = 200;
// };

export const update = async (ctx) => {
  try {
    const { db } = ctx;
    const { ceoId, ceoPt } = ctx.request.body;

    const stmt = db.prepare("UPDATE ceotb SET ceoPt=? where ceoId = ?");
    stmt.run(ceoPt, ceoId);
    stmt.finalize();
  } catch (e) {
    console.log(e);
  }

  ctx.status = 200;
};

export const remove = async (ctx) => {
  try {
    const { db } = ctx;
    const { ceoId } = ctx.params;

    const stmt = db.prepare("DELETE FROM ceotb where ceoId = ?");
    stmt.run(ceoId);
    stmt.finalize();
  } catch (e) {
    console.log(e);
  }

  ctx.status = 200;
};

export const ceologin = async (ctx) => {
  try {
    const { db } = ctx;
    const { ceoId, ceoPw } = ctx.request.body;

    const sql = "SELECT ceoId, ceoPw, ceoPt FROM ceotb where ceoId=?";
    const result = await db.get(sql, [ceoId]);

    if (result.ceoId && result.ceoPw) {
      if (bcrypt.compareSync(ceoPw, result.ceoPw)) {
        ctx.status = 200;
        ctx.body = {
          ceoId: result.ceoId,
          ceoPt: result.ceoPt,
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

export const ceoid = async (ctx) => {
  try {
    const { db } = ctx;
    const { ceoId, ceoPt } = ctx.request.body;

    const sql = "SELECT ceoId, ceoPt FROM ceotb where ceoId=?";
    const result = await db.get(sql, [ceoId, ceoPt]);
    ctx.status = 200;
    ctx.body = result;
  } catch (e) {
    console.log(e);
  }
};

// ceoPw이 인증되면, 코인갯수가 뜨게 해야 하는데, 이때 서로 다른 사용자가 pw가 동일할 수도 있음
// 그래서 내 생각은, 비밀번호 + 휴대번호 입력하고 둘이 같은 ceo로 인정되면, pt가 보이도록 해야 함.
// 아니면, 다시 id와 pw를 입력하게 해서 코인을 보여주도록 해야함.
/*
export const ceologincheck = async (ctx) => {
  try {
    const { db } = ctx;
    const { ceoPw } = ctx.params;

    const sql = "SELECT ceoPt FROM ceotb where ceoPw=?";
    const result = await db.get(sql, [ceoPw, ceoPt]);
    ctx.status = 200;
    ctx.body = result;
  } catch (e) {
    console.log(e);
  }
}; */

export const readByCeoId = async (ctx) => {
  try {
    const { db } = ctx;
    const { ceoId } = ctx.params;

    const sql = "SELECT ceoId, ceoPt FROM ceotb where ceoId=?";
    const result = await db.get(sql, [ceoId]);
    ctx.status = 200;
    ctx.body = result;
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};
