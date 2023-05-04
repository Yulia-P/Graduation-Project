import React from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import { AiFillLike, AiOutlineMessage} from "react-icons/ai";
// import {useSelector} from "react-redux";

export const ArticleItem = ({articles}) => {

    // const { comments } = useSelector((state) => state.comment)


    if(!articles){
        return(
            <div className={'text-xl text-center text-white py-10'}>
                Загрузка...
            </div>
        )
    }

    return (
        <Link to={`/${articles.id}`}>
            <div className={'flex flex-col basis-1/4 flex-grow'}>

                <div className={articles.image_url ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
                    {articles.image_url && (
                        <img src={`http://localhost:8082${articles.image_url}`} className={'object-cover w-gull'}/>
                    )}
                </div>

                <div className={'flex justify-between items-center pt-2'}>
                    <div className={'text-xl text-white opacity-50'}>{articles.User.username}</div>
                    <div className={'text-xs text-white opacity-50'}>
                        <Moment date={articles.date_of_pub} format={'D MMM YYYY'}/></div>
                </div>

                <div className={'text-white text-3xl'}>{articles.title}</div>

                <div className={'flex gap-3 items-center mt-2'}>
                    <div className={'flex items-center justify-center gap-2 text-xs text-white opacity-50'}>
                        <AiFillLike/> <span>{articles.likes}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}