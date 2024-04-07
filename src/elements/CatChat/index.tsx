import { Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend } from "../../consts";
import { Button } from "../Button";
import './styles.css'

export const CatChat:React.FC = () =>{
    const [opened, setOpened] = useState(false)
    let now = new Date()
    const [text, setText] = useState('')

    let navigate = useNavigate()

    const onSendClick = () =>{
        if (text != ''){
            backend.post('/conversation', {
                name: "Вопрос по туру"
              }).then((r)=>{
                backend.post('/conversation/create_message', {
                    content: text,
                    conversation_id: r.data.id.toString()
                  }).then((resp)=>navigate('/chat/'+r.data.id))
              })
        }
    }


    return <div className='ChatCatBlock'>
        {
            opened?<div className="cgatCatCard">
                <div className="chatCatClose">
                    <img src='/icons/Close.svg' onClick={()=>setOpened(false)}></img>
                </div>
                    
                    <div className="cgatCatCardHeader">
                        <img src='/icons/cat.svg'></img>
                        <div className="chatCatNameWrapper">
                            <h3>Русс</h3>
                            Ai чат гид
                        </div>
                    </div>
                    <div>
                        Привет!<br/><br/>
                        Я RUSS, ваш личный помощник в путешествиях. <br/>
                        Я могу предложить вам персонализированный маршрут, а также заняться решением ваших вопросов о путешествиях. <br/><br/>
                        Просто скажите мне, куда вы хотите отправиться и сколько времени у вас есть, и я подготовлю для вас идеальный план. 
                    </div>
                    <div className="chatCatMessageTime">{now.getHours() + ':' + now.getMinutes()}</div>
                    
                    <div className="chatCatInputWrapper">
                        <Input onPressEnter={()=>onSendClick()} value={text} onChange={(e)=>setText(e.target.value)} className="chatCatInput"  placeholder="Расскажи о своих планах"></Input>
                        <Button onClick={()=>onSendClick()} className="chatCatSendBtn"><img src='/icons/sendMessage.svg'/></Button>
                    </div>
            </div>
            :
            <img className='openChatBtn pulse' onClick={()=>setOpened(true)} src='/icons/chatCat.svg'/>
            
        }
    </div>
}