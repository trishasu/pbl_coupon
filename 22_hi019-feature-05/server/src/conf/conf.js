// conf 함수 생성
// 파라미터로 env를 받고 env에 저장된 값을 JSON 객체로 생성

const conf = (env) => ({
  port: parseInt(env.PORT || "5000", 10),
});

export default conf;
