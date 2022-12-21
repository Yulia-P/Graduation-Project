import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useState } from "react";

export const Index = ({id}) => {
  const [text, setText] = useState("")
  const handleCommentAdd = async () => {
    const commentRequest = await fetch(`http://localhost:8082/Ratings/${id}`, {
      method: "POST",
      headers: {"Content-Type":"application/json",
    "Authorization" : `Bearer ${localStorage.accessToken}`},
      body:JSON.stringify({
        Comment: text
      })
    })
    const comment = await commentRequest.json();
    if(commentRequest.ok){
      return alert(comment.message)
    }
    return alert(comment[0].msg)
  } 
  
  return (
    <>
      <div className={styles.root}>
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            onChange={(e) => {setText(e.target.value)}}
          />
          <Button variant="contained" onClick={handleCommentAdd}>Отправить</Button>
        </div>
      </div>
    </>
  );
};
