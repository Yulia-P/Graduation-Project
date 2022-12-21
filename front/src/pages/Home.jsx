import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { fetchPosts } from "../redux/slices/posts";
import { fetchComments } from "../redux/slices/comments";
import { Post } from "../components/Post";
import { CommentsBlock } from "../components/CommentsBlock";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts } = useSelector((state) => state.posts);
  const isPostsLoading = posts.status === "loading";
  const { comments } = useSelector((state) => state.comments);
  console.log(comments);
  const isCommentLoad = comments.status === "loading";
  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  console.log('userData'+userData);

  React.useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj.id}
                title={obj.Title}
                // imageUrl={obj.ImageU}
                imageUrl={
                  obj.ImageU ? `http://localhost:8082${obj.ImageU}` : " "
                }
                user={{
                  avatarUrl: obj.User.avatarUrl,
                  fullName: obj.User.username,
                }}
                createdAt={obj.DatePub}
                commentsCount={3}
                Like={obj.Like}
                isEditable={userData?.user.id === obj.User.id}
                isAdmin={userData?.user.role === "admin"}
                isUser={userData?.user.role === "user"}
              />
            )
          )}
        </Grid>

        <Grid xs={4} item>
          {comments.items.length < 0 ? (
            <CommentsBlock isLoading={true} />
          ) : (
            <CommentsBlock items={comments.items} isLoading={false} />
          )}
        </Grid>
      </Grid>
    </>
  );
};
