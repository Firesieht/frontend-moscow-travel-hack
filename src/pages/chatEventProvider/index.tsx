import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActiveEventContext } from "../AiGid";

export const ChatEventProvider:React.FC = () =>{
    const {activeEvent, setActiveEvent} = React.useContext(ActiveEventContext) as any;
    let {event} = useParams();
    let {chatID} = useParams()
    console.log(event)
    let navigate = useNavigate()
    
    useEffect(()=>{
        setActiveEvent(event)
        navigate('/chat/'+chatID)
    })

    
    return <div>GПРИВЕТ</div>
}