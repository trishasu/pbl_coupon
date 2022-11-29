/* eslint-disable no-console */
import Path from "path";
import Koa from "koa";
import KoaCors from "@koa/cors";
import KoaCompose from "koa-compose";
import KoaHelmet from "koa-helmet";
import KoaBody from "koa-body";
import Router from "@/router";
import Conf from "@/conf";
import sqlite3 from "sqlite3";
import AppRootPath from "app-root-path";
import util from "util";
import errorHandlerMd from "./middlewares/errorHandlerMd";
import { routerAllowMethodsMd, routerRoutesMd } from "./middlewares/routerMd";

const databaseFile = `${AppRootPath}/datasource/coupon_schema.sqlite`;
const connection = new (sqlite3.verbose().Database)(databaseFile);

const app = new Koa();

connection.get = util.promisify(connection.get);
connection.all = util.promisify(connection.all);

app.context.db = connection;

app.use(
  KoaCompose([
    errorHandlerMd,
    KoaCors({ origin: "*", credentials: "true" }),
    KoaHelmet(),
    KoaBody({
      multipart: true,
      jsonStrict: false,
      formidable: {
        uploadDir: Path.join(__dirname, "../upload"),
        keepExtensions: true,
      },
    }),
  ]),
);

app.use(routerRoutesMd(Router)).use(routerAllowMethodsMd(Router));

app.listen(Conf.port, () => {
  console.log(`server listening ${Conf.port}`);
});
