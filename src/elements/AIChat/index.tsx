import { App, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backend } from "../../consts";
import { AIChatIE, MessageIE } from "../../types";
import { Button } from "../Button";
import { ClientMessage } from "../ClientMessage";
import { GigachatMessage } from "../GigachatMessage";
import { RusPassHeader } from "../Header";
import { Input } from "../Input";
import { SearchInput } from "../SearchInput";
import './styles.css'
import { MyMap } from "../map";
import  { ActiveEventContext } from "../../pages/AiGid";

export const AIChat:React.FC = () =>{
    const [chatData, setChatData] = useState<AIChatIE>()
    let { chatID } = useParams();
    const queried = useRef(false);
    const [activeDay, setActiveDay] = useState(0);
    const {activeEvent, setActiveEvent} = React.useContext(ActiveEventContext) as any;
    const [messages, setMessages] = useState([])
    const navigate = useNavigate()
    const { message, notification, modal } = App.useApp();

    useEffect(()=>{
    
       if (!queried.current) {
          queried.current = true;
          backend.get('conversation/' + chatID?.toString() + '/').then((data) => {
            console.log(data.data)
            setChatData(data.data as any)
            if (data.data.places_info.length > 0){
                setActiveEvent(data.data.places_info[activeDay].places[0].header as string)
            }
               let flag = true
                let reversed = data.data.messages.reverse()
                let l_msg = reversed.map((value:any, index:number)=>{
                    let date = new Date(Date.parse(value.date_created))
                    if (value.role == 'user'){
                        return  <ClientMessage text={value.content.toString()} date={date.getHours()+':'+date.getMinutes()} /> 
                    } else if (value.role == 'function' && flag){
                        flag = false
                        return <GigachatMessage image={data.data.image} text={'Фото маршрута'} date={date.getHours()+':'+date.getMinutes()}/>
                    }else if ((value as any).content.name == undefined){
                        if (index < reversed.length-1 && reversed[index+1].content?.name != undefined ){
                            return <GigachatMessage addToPlaner={true} text={value.content.toString().replaceAll('\n', '<br></br>')} date={date.getHours()+':'+date.getMinutes()}/>

                        }else{
                            return <GigachatMessage text={value.content.toString().replaceAll('\n', '<br></br>')} date={date.getHours()+':'+date.getMinutes()}/>
  
                        }
                    }
                }) as any
                let l_msg_reversed = l_msg.reverse()
                setMessages(
                    l_msg_reversed
                )
          })
       }

       chatData?.places_info?.forEach((day, index)=>{
            day.places.forEach((place, placeIndex)=>{
                if (place.header == activeEvent){
                    setActiveDay(index)
                }
            })
       })
    })



    const onSendMessage = (msg:string) =>{
        let now = new Date()

        setMessages([...messages, <ClientMessage text={msg} date={now.getHours().toString()+":"+now.getMinutes()} />] as any)

        

        backend.post('/conversation/create_message',{
            content: msg,
            conversation_id: chatID
          }).then((data) => {
        
                let flag = true
                let reversed = data.data.messages.reverse()
                let l_msg = reversed.map((value:any, index:number)=>{
                    let date = new Date(Date.parse(value.date_created))
                    if (value.role == 'user'){
                        return  <ClientMessage text={value.content.toString()} date={date.getHours()+':'+date.getMinutes()} /> 
                    } else if (value.role == 'function' && flag){
                        flag = false
                        return <GigachatMessage image={data.data.image} text={'Фото тура'} date={date.getHours()+':'+date.getMinutes()}/>
                    }else if ((value as any).content.name == undefined){
                        return <GigachatMessage text={value.content.toString().replaceAll('\n', '<br></br>')} date={date.getHours()+':'+date.getMinutes()}/>
                    }
                }) as any
                let l_msg_reversed = l_msg.reverse()
                console.log(l_msg, l_msg_reversed)
                setMessages(
                    l_msg_reversed
                )
                setChatData(data.data as any)
          })
    }

    const listRef = useRef(null);
    useEffect(() => {
        (listRef.current as any).lastElementChild?.scrollIntoView()
    }, [messages]);
    
    const onNextEventClick = () => {
        if (chatData?.places_info != undefined){
            chatData?.places_info[activeDay].places.forEach((value, index)=>{
                if (value.header == activeEvent && chatData?.places_info != undefined){
                    setActiveEvent(chatData?.places_info[activeDay].places[(index+1)%chatData?.places_info[activeDay].places.length].header)
                    // navigate(chatData?.places_info[activeDay].places[(index+1)%chatData?.places_info[activeDay].places.length].header)
                }
            }) 
        }
    }

    const onBackEventClick = () => {
        if (chatData?.places_info != undefined){
            chatData?.places_info[activeDay].places.forEach((value, index)=>{
                if (value.header == activeEvent && chatData?.places_info != undefined){
                    setActiveEvent(chatData?.places_info[activeDay].places[(index-1) < 0? chatData?.places_info[activeDay].places.length-Math.abs(index-1): (index-1)].header)
                    // navigate(chatData?.places_info[activeDay].places[(index-1) < 0? chatData?.places_info[activeDay].places.length-Math.abs(index-1): (index-1)].header)

                }
            }) 
        }
    }
    const onBuyEventClick = (event:string)=>{
        message.info('Спасибо за покупку билета в(на): \n' + event)
        setTimeout(()=>window.location.replace('https://russpass.ru/my/tickets?category=ALL&status=RELEVANT'), 1000 )
    }
    
    console.log('CREATE ROUTE',  chatData?.places_info == undefined ||  chatData?.places_info.length == 0? [{cords:[37.6156, 55.7522], title:'Москва', description:'Москва'}]
    :
    chatData?.places_info[activeDay].places.map((value, index)=>{
        return {
            cords: [ value.long, value.lat] as number[],
        title: value.header,
        description: value.header,
    }

    })
    )

    return <div className="mainAiChatWrapper">
        <RusPassHeader></RusPassHeader>
        <div className="AiChatWrapper">
            <div className="AiChat">
                <div className="AiChatHeader">
                    <img src='/icons/cat.svg'></img>
                    <h2>{chatData?.name}</h2>
                </div>
                <div ref={listRef} className="aiChatMessages">
                    {
                       (messages.reverse() as any)
                    }
                </div>
                <SearchInput onSend={(msg)=>onSendMessage(msg)}></SearchInput>
        </div>

        <div className="mapOverlay">
            <div className="mapPrefs">
                <div className="daysChoice">

                   <div className="arrowsMapWrapper">
                        <div className="mapArraw" onClick={()=>onBackEventClick()}><img className="" src='/icons/arrow.svg'/></div>
                        <div className="mapArraw" onClick={()=>onNextEventClick()}><img className="reversedArrow" src='/icons/arrow.svg'/></div>
                   </div>

                   <div className="arrowsMapWrapper">
                        {   chatData?.places_info == undefined? <></>:
                            chatData?.places_info.map((value, index)=>{
                                return value.day == -1 || value.day == -2? <></> :<div className={ index == activeDay? "DayActive":'Day'} onClick={()=>{setActiveDay(index); setActiveEvent((chatData?.places_info as any)[index].places[0].header)}}>
                                    День {index+1}
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="EventMapCard">
                        <img className="mockMapCard" src="/icons/mockMapCard.png"></img>
                        <div className="cardMapTextWrapper">
                            {activeEvent}
                            <img src='/icons/text.svg'></img>
                        </div>
                </div>
                <Button className="buyEventBtn" onClick={()=>onBuyEventClick(activeEvent)} >Купить</Button>
            </div>
            {
                chatData == undefined? <Spin></Spin> : <MyMap
                    routeCreate={
                        chatData.places_info == undefined || chatData.places_info[0].day == -1 || chatData.places_info[0].day == -2 ? false:true
                    }
                    points={
                        chatData?.places_info == undefined ||  chatData?.places_info.length == 0? [{cords:[37.6156, 55.7522], title:'Москва', description:'Москва'}]
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
            }
            
        </div>
       
        </div>
        
    </div> 
}