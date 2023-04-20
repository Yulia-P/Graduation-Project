import React from "react";
import { AiFillLike, AiOutlineMessage} from 'react-icons/ai'
import Moment from "react-moment";
import {Link} from "react-router-dom";

export const ArticleItem = ({articles}) => {

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
                    <div className={'text-xs text-white opacity-50'}>{articles.User.username}</div>
                    {/*<div className={'text-xs text-white opacity-50'}> USER</div>*/}
                    <div className={'text-xs text-white opacity-50'}>
                        <Moment date={articles.date_of_pub} format={'D MMM YYYY'}/></div>
                </div>

                <div className={'text-white text-xl'}>{articles.title}</div>

                <p className={'text-white opacity-60 text-xs pt-4'}>{articles.text}</p>

                <div className={'flex gap-3 items-center mt-2'}>
                    <button className={'flex items-center justify-center gap-2 text-xs text-white opacity-50'}>
                        <AiFillLike/> <span>{articles.like}</span>
                    </button>
                    <button className={'flex items-center justify-center gap-2 text-xs text-white opacity-50'}>
                        <AiOutlineMessage/> <span>{articles.comments?.length || 0}</span>
                    </button>
                </div>
            </div>
        </Link>
    )
}