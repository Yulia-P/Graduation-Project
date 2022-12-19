import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import {Link} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch, useSelector} from 'react-redux';
// import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import {fetchRemovePosts, fetchLikes} from '../../redux/slices/posts';
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  Like,
  commentsCount,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if(window.confirm('Вы дествительно хотите удалить стаью?')){
      dispatch(fetchRemovePosts(id));
    }
  };

  const onClikLike = () =>{
    if(window.confirm('Вы оценили статью')){
    dispatch(fetchLikes(id));
    window.location.reload();  
  }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li className={styles.Like}>
                <IconButton onClick={onClikLike} color = "primary">
                  <FavoriteIcon/>
                </IconButton>
              <span>{Like}</span>
            </li>
            <li className={styles.Comment}>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
