import React, {useCallback, useEffect} from 'react';
import {getComment, removeComment, removeCommentAdm} from "../redux/features/comment/commentSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import {useParams} from "react-router-dom";

export const CommentItem = ({ cmt }) => {

    // const { status } = useSelector((state) => state.comment)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const removeCommentHandler = () => {
        try {
            dispatch(removeComment(cmt.id))
            toast('Комментарий был удален')
            window.location.reload();
            // navigate('/')
        } catch (e) {
            console.log(e)
        }
    }
    const removeCommentAdmHandler = () => {
        try {
            dispatch(removeCommentAdm(cmt.id))
            toast('Комментарий был удален')
            window.location.reload();
            // navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    // useEffect(() => {
    //     if (status) {
    //         toast(status)
    //     }
    // }, [status])



    return (
        <div className={'flex items-center break-all gap-3 mt-3'}>
            {/*<div className={'text-xs text-white opacity-50'}>{cmt.User.username}</div>*/}
            <div className={'flex text-gray-300 text-[20px]'}>
                {cmt.comment}
            </div>
            {user?.id === cmt.commentator && (
                <button
                    onClick={removeCommentHandler}
                    className={'flex items-center justify-center gap-2 text-white opacity-50'}>
                    <AiFillDelete />
                </button>
            )}
            {user?.role === "admin" && (
                <button
                    onClick={removeCommentAdmHandler}
                    className={'flex items-center justify-center gap-2 text-white opacity-50'}>
                    <AiFillDelete />
                </button>
            )}

        </div>
    )
}