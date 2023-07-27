export const weatherConfig = (() => {
  return {
    api: "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0",
    secret_key: import.meta.env.VITE_API_KEY,
  };
})();
