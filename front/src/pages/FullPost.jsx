import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [comments, setComments] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const { id } = useParams();
  console.log(id);
  React.useEffect(() => {
    axios
      .get(`/Articles/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Ошибка при получении статьи");
      });
    axios
      .get(`/Ratings/${id}`)
      .then((res) => {
        setComments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Ошибка при получении статьи");
      });
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Post isLoading={isLoading} isFullPost />{" "}
      </>
    );
  }

  return (
    <>
      <Post
        id={data.id}
        title={data.Title}
        // imageUrl={data.ImageU}
        imageUrl={`http://localhost:8082${data.ImageU}`}
        user={{
          avatarUrl: data.User.avatarUrl,
          fullName: data.User.username,
        }}
        createdAt={data.DatePub}
        commentsCount={3}
        Like={data.Like}
        isFullPost
      >
        <ReactMarkdown children={data.Text} />
      </Post>
      {comments === [] ? (
        <></>
      ) : (
        <CommentsBlock items={comments} isLoading={false}>
          <Index id={id}/>
        </CommentsBlock>
      )}
    </>
  );
};
