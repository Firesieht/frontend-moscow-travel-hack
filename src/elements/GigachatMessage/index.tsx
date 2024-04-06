import React from "react";
import { GigachatMessageIE } from "../../types";
import './styles.css'
import { App } from 'antd';

export const GigachatMessage:React.FC<GigachatMessageIE> = (props) =>{
    const { message, notification, modal } = App.useApp();

    const onLike = () =>{

    }

    const onDislike = () =>{

    }

    const onShare = () =>{

    }

    const onCopy = () =>{
        message.info('Сообщение скопировано!')
        navigator.clipboard.writeText(props.text)
    }

    return <div className='messageContent' ref={props.ref}>
            <img src='/icons/corner.svg' className="corner"></img>

            <div className="messageCard">
                <div className="messageBox">
                    <div dangerouslySetInnerHTML={{ __html: props.text }} >
                            {/* {props.text} */}
                        
                        
                    </div>
                    <div className="messageIconsWrapper">
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