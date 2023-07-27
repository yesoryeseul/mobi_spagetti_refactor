import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import usePrev from "../hooks/usePrev";
import { FetchApi } from "../apis/api";
import PageNation from "../components/pagenation/Pagenation";

const LIMIT_TAKE = 20;
const PostDetailPage = () => {
  const [params] = useSearchParams();
  const [postDetail, setPostDetail] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const { isPrev: isOpenCommentList, toggle } = usePrev();

  const fetchPostDetail = async () => {
    try {
      const response = await FetchApi.fetchData({ url: "post" });
      setPostDetail(response.data); // Use
    } catch (error) {
      console.error("Error fetching post detail:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await FetchApi.fetchData({
        url: "comments",
        params: {
          take: params.get("take") ?? LIMIT_TAKE,
        },
      });
      setCommentList(response.data.Comments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      alert("로그인이 필요합니다");
      window.location.href = "/";
    }
    fetchPostDetail();
  }, []);

  useEffect(() => {
    if (!isOpenCommentList) return;
    fetchComments();
  }, [isOpenCommentList, params]);

  return (
    <div>
      <h1>Post Detail Page</h1>
      <div>
        <p>제목: {postDetail.title}</p>
        <p>내용: {postDetail.content}</p>
        <button onClick={toggle}>
          {!isOpenCommentList ? "댓글 보기" : "댓글 숨기기"}
        </button>
        {isOpenCommentList && (
          <>
            {commentList.map((comment) => (
              <div key={comment.id}>
                <p>{comment.content}</p>
                <p>{comment.User.nickName}</p>
              </div>
            ))}
            <PageNation endpoint="comments" />
          </>
        )}
      </div>
    </div>
  );
};
export default PostDetailPage;
