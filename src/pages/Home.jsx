import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { weatherConfig } from "../third-party/weather.config";
import { DialLogState, useDiaLogStore } from "../contexts/DialogProvider";

const HomePage = () => {
  const [isBackGroundBlur, setIsBackGroundBlur] = useState(true);
  const [weather, setWeather] = useState();
  const [, setDiaLogAttribute] = useDiaLogStore();

  const fetchWeather = async () => {
    try {
      const response = await axios.get("/getUltraSrtNcst", {
        baseURL: weatherConfig.api,
        params: {
          serviceKey: weatherConfig.secret_key,
          dataType: "JSON",
          base_date: new Date()
            .toISOString()
            .substring(0, 10)
            .replace(/-/g, ""),
          base_time: "0600",
          nx: 60,
          ny: 127,
        },
      });
      setWeather(response.data.response.body.items.item);
    } catch (err) {
      console.log(err);
      throw new Error("failed load weather api");
    }
  };

  useEffect(() => {
    fetchWeather();
    const userName = localStorage.getItem("userName");
    if (!userName) {
      return setIsBackGroundBlur(true);
    } else setIsBackGroundBlur(false);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const userName = e.target.userName.value.trim();
    if (!userName) return alert("이름을 입력해주세요");
    localStorage.setItem("userName", userName);
    setIsBackGroundBlur(false);
    e.target.userName.value = "";
  };

  const onPressNavigateBlog = () => {
    setDiaLogAttribute({
      type: DialLogState.ALERT,
      text: "정말로 페이지를 이동하겠습니까",
      isOpen: true,
      onConfirm: async () => {
        await setDiaLogAttribute({ isOpen: false });
        window.location.href = "/posts";
      },
    });
  };

  return (
    <>
      {isBackGroundBlur && (
        <S.BlurBackGround>
          <S.UserNameForm onSubmit={onSubmit}>
            <input type="text" name="userName" placeholder="Enter your name" />
            <button type="submit">Submit</button>
          </S.UserNameForm>
        </S.BlurBackGround>
      )}
      <div>
        <h1>Home Page</h1>
        <p>오늘의 기온</p>
        <p>{weather?.find((el) => el.category === "T1H").obsrValue}도</p>
        <S.Button onClick={onPressNavigateBlog}>블로그 보러가기</S.Button>
      </div>
    </>
  );
};
export default HomePage;

const BlurBackGround = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  backdrop-filter: blur(10px);
`;

const UserNameForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Button = styled.button``;

const S = {
  BlurBackGround,
  UserNameForm,
  Button,
};
