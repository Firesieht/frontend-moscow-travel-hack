import { Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { backend } from "../../consts";
import { AIChatIE, MessageIE } from "../../types";
import { Button } from "../Button";
import { ClientMessage } from "../ClientMessage";
import { GigachatMessage } from "../GigachatMessage";
import { RusPassHeader } from "../Header";
import { Input } from "../Input";
import { SearchInput } from "../SearchInput";
import './styles.css'
import parse from 'html-react-parser';
import { MyMap } from "../map";
import { title } from "process";

export const AIChat:React.FC = () =>{
    const [chatData, setChatData] = useState<AIChatIE>()
    let { chatID } = useParams();
    const queried = useRef(false);
    const [activeDay, setActiveDay] = useState(0)
    useEffect(()=>{
 
    //    const dataLoad = async () =>{
    //       // // const favorites = await backend.get('user/favorite')
    //       // // const events = await backend.get('recommendations/recommendations/')
    //       // return {
    //       //    favorites, events
    //       // }
    //    }
 
       if (!queried.current && localStorage.getItem('token') != null) {
          queried.current = true;
          backend.get('conversation/' + chatID?.toString() + '/').then((data) => {
            console.log(chatData)
            setChatData(data.data as any)
          })
       }
 
      
    })

    const onSendMessage = (msg:string) =>{
        let now = new Date()
        console.log(now, Date.parse(now.toISOString()))

        setChatData({
            ...chatData,
                messages: [...chatData?.messages as MessageIE[], {
                    content:msg,
                    date_created: now.toDateString(),
                    role:'user'
                }] as MessageIE[]
            } as AIChatIE
        )

        backend.post('/conversation/create_message',{
            content: msg,
            conversation_id: chatID
          }).then((data) => {
            setChatData(data.data as any)
          })
    }

    const listRef = useRef(null);
    useEffect(() => {
        (listRef.current as any).lastElementChild?.scrollIntoView()
    }, [chatData?.messages]);



    console.log(chatData)
    return<div className="mainAiChatWrapper">
        <RusPassHeader></RusPassHeader>
        <div className="AiChatWrapper">
            <div className="AiChat">
                <h2>{chatData?.name}</h2>
                <div   ref={listRef} className="aiChatMessages">
                    {
                        chatData == undefined? <Spin/>:
                        chatData?.messages.map((value, index)=>{
                        
                        if ((value as any).content.name != undefined){
                            return <></>
                        }
                        let date = new Date(Date.parse(value.date_created))
                        return  value.role == 'user'? 
                            <ClientMessage text={value.content.toString()} date={date.getHours()+':'+date.getMinutes()} /> 
                            :
                            <GigachatMessage text={value.content.toString()} date={date.getHours()+':'+date.getMinutes()}/>
                        })
                    }
                </div>
                <SearchInput onSend={(msg)=>onSendMessage(msg)}></SearchInput>
        </div>
        <MyMap 
            points={
                chatData?.places_info == undefined? [{cords:[37.6156, 55.7522], title:'Москва', description:'Москва'}]
                :
                chatData?.places_info[activeDay].places.map((value, index)=>{
                    return {
                        cords: [ value.long, value.lat] as number[],
                    title: value.header,
                    description: value.header,
                }

                })
            }
                
            ></MyMap>
        </div>
        
    </div> 
}