// dotenv는 해당 파일의 내용을 process.env로 설정하는 패키지
import DotEnv from "dotenv";
// app-root-path는 애플리케이션의 절대경로를 알려주는 패키지
import AppRootPath from "app-root-path";
// 위에서 생성한 conf 파일 import
import Conf from "./conf";

// env 설정(default는 dev")
const env = process.env.NODE_ENV || "dev";
// dotenv를 사용해 ${AppRootPath}/env/${env}.env 파일을 로딩해 process.env로 설정
const result = DotEnv.config({ path: `${AppRootPath}/env/${env}.env` });
if (result.error) throw result.error;

// conf 함수 호출 파라미터는 dotenv에서 로딩한 process.env 전달
const config = Conf(process.env);

console.log(config);

export default config;
