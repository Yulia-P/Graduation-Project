import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
// import axios from '../axios';
import {fetchPosts} from '../redux/slices/posts';
import { Post } from '../components/Post';
// import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const {posts} = useSelector(state => state.posts);
  const isPostsLoading = posts.status === 'loading';
  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {( isPostsLoading ? [...Array(5)]: posts.items).map((obj, index) => 
          isPostsLoading ? (
            <Post key = {index} isLoading={true} />
          ):  ( 
          <Post
              id={obj.id}
              title={obj.Title}
              // imageUrl={obj.ImageU}
              imageUrl={obj.ImageU ? `http://localhost:8082${obj.ImageU}` : ' '}
              user={{
                avatarUrl: obj.User.avatarUrl,
                fullName: obj.User.username}}
              createdAt={obj.DatePub}
              commentsCount={3}
              Like={obj.Like}
              isEditable = {userData?.user.id===obj.User.id}
          />
          ))}
        </Grid>
        {/* <Grid xs={4} item>
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid> */}
      </Grid>
    </>
  );
};
