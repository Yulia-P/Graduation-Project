import React, {useCallback, useEffect} from 'react';
import {getComment, removeComment} from "../redux/features/comment/commentSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import {useParams} from "react-router-dom";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";
import Moment from "react-moment";

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
    // const removeCommentAdmHandler = () => {
    //     try {
    //         dispatch(removeCommentAdm(cmt.id))
    //         toast('Комментарий был удален')
    //         window.location.reload();
    //         // navigate('/')
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // useEffect(() => {
    //     if (status) {
    //         toast(status)
    //     }
    // }, [status])



    return (
        <div className={'flex flex-col break-all gap-3 mt-2 bg-green-100'}>
            <div className={' flex flex-wrap'}>
                <div className={'flex text-xl text-lime-900 ml-3 opacity-50'}>{cmt.User.username}</div>
                {user?.id === cmt.commentator || user?.role === "admin" ?  (
                    <button
                        onClick={removeCommentHandler}
                        className={'flex flex-wrap justify-center gap-2 ml-5 mt-1.5 text-xl text-lime-900 opacity-50'}>
                        <AiFillDelete />
                    </button>
                ): null
                }
            </div>
            <div className={'flex flex-col text-lime-900 ml-2 mb-1 text-3xl'}>
                <ReactMarkdown children={cmt.comment} />
            </div>

            {/*<div className={'flex text-gray-300 text-[20px]'}>*/}
            {/*    {cmt.comment}*/}
            {/*</div>*/}



        </div>
    )
}