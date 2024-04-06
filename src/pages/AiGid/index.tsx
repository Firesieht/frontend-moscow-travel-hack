// import {  Spin, TabsProps, Tabs } from 'antd';
import react, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { backend, updateBackend } from '../../consts';
import { AIChat } from '../../elements/AIChat';
import { ClientMessage } from '../../elements/ClientMessage';
import { GigachatMessage } from '../../elements/GigachatMessage';
import { RusPassHeader } from '../../elements/Header';
import { DefaultPage } from '../DefaultPage';
import './style.css'


export const AiGid: react.FC = () => {
   let navigate = useNavigate()

   let token = localStorage.getItem('token')

   const queried = useRef(false);

   useEffect(()=>{
      updateBackend()

      const dataLoad = async () =>{
         // // const favorites = await backend.get('user/favorite')
         // // const events = await backend.get('recommendations/recommendations/')
         // return {
         //    favorites, events
         // }
      }

      if (!queried.current && localStorage.getItem('token') != null) {
         queried.current = true;
         dataLoad().then((data) => {
            
         })
      }

      if (null == localStorage.getItem('token')){
         navigate('/login')
      }

     
   })

   

   return <div>
      {/* <GigachatMessage date='17:02' text='Привет! 
Я RUSSPASS, ваш личный помощник в путешествиях. 
Я могу предложить вам персонализированный маршрут, а также заняться решением ваших вопросов о путешествиях.
Просто скажите мне, куда вы хотите отправиться и сколько времени у вас есть, и я подготовлю для вас идеальный план. '/>


   <ClientMessage date='17:03' text='Конечно, Иди НАХРЕН!'/> */}

   <AIChat></AIChat>
   </div>
}