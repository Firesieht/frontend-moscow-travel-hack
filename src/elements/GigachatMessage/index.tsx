import React, { useEffect, useState } from "react";
import { GigachatMessageIE } from "../../types";
import './styles.css'
import { App } from 'antd';
import { BASE_URL } from "../../consts"; 
import { Button } from "../Button";

export const GigachatMessage:React.FC<GigachatMessageIE> = (props) =>{
    const { message, notification, modal } = App.useApp();

    const onLike = () =>{

    }

    const onDislike = () =>{

    }

    const onShare = () =>{

    }

    const onAddToPlanerClick = () =>{
        message.info('Маршрут добавлен в планирощик! \n')
        setTimeout(()=>window.location.replace('https://hl.russpass.ru/U8C'), 1000 )
    }


    const onCopy = () =>{
        message.info('Сообщение скопировано!')
        navigator.clipboard.writeText(props.text)
    }

    return <div className='messageContent' ref={props.ref}>
            <img src='/icons/corner.svg' className="corner"></img>
            <div className="messageCard">
                <div className="messageBox">
                    {
                        props.image == undefined? <></>:
                            <img className="messageImage" src={BASE_URL+props.image}></img>
                    }
                    <div dangerouslySetInnerHTML={{ __html: props.text }} >
                            {/* {props.text} */}
                    </div>
                    <div className="messageIconsWrapper">
                            {props.addToPlaner == true? 
                            <Button onClick={()=>onAddToPlanerClick()} className="addToPlanerBtn">Добавить в планировщик</Button>
                            :<></>}
                            <img className="messageIcon" onClick={()=>onCopy()} src='/icons/copy.svg'></img>
                            <img className="messageIcon" onClick={()=>onShare()} src='/icons/share.svg'></img>
                            <div className="likeDislikeWrapper">
                                <img className="messageIcon" onClick={()=>onLike()} src='/icons/like.svg'></img>
                                <img className="messageIcon" onClick={()=>onDislike()} src='/icons/dislike.svg'></img>
                            </div>
                    </div>
                </div>
               
            </div>
            <div className="messageDate">{props.date}</div>
    </div>

}