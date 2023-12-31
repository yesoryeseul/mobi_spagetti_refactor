import axios from "axios";
import { useEffect, useState } from "react";
import { DialLogState, useDiaLogStore } from "../contexts/DialogProvider";
import { useSearchParams } from "react-router-dom";
import PageNation from "../components/pagenation/Pagenation";
import { FetchApi } from "../apis/api";

const LIMIT_TAKE = 10;
const PostListPage = () => {
  const [params] = useSearchParams();
  const [postList, setPostList] = useState([]);
  const [, setDiaLogAttribute] = useDiaLogStore();

  const fetchPostList = async () => {
    try {
      const response = await FetchApi.fetchData({
        url: "posts",
        params: {
          take: params.get("take") ?? LIMIT_TAKE,
        },
      });
      setPostList(response.data.Posts);
    } catch (error) {
      console.error("Error fetching post detail:", error);
    }
  };

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      alert("로그인이 필요합니다");
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    fetchPostList();
  }, [params]);

  // async 안의 async?
  const onClickPost = async (postId) => {
    await setDiaLogAttribute({
      type: DialLogState.CONFIRM,
      text: "정말로 페이지를 이동하겠습니까",
      isOpen: true,
      onConfirm: async () => {
        await setDiaLogAttribute({
          text: "정말로 이동해버린다요!",
          onConfirm: async () => {
            window.location.href = `/post-detail/${postId}`;
          },
        });
      },
      onCancel: () => {
        setDiaLogAttribute({ isOpen: false });
      },
    });
  };

  return (
    <table>
      <caption>Post List Page</caption>
      <tr>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
      </tr>
      {postList.map((post) => (
        <tr key={post.id} onClick={() => onClickPost(post.id)}>
          <td>{post.title}</td>
          <td>{post.content}</td>
          <td>{post.User.nickName}</td>
        </tr>
      ))}
      <PageNation endpoint="posts" />
    </table>
  );
};
export default PostListPage;
