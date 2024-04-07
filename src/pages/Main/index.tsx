// import {  Spin, TabsProps, Tabs } from 'antd';
import { AutoComplete, Input } from 'antd';
import react, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { backend, updateBackend } from '../../consts';
import { AIChat } from '../../elements/AIChat';
import { Button } from '../../elements/Button';
import { CatChat } from '../../elements/CatChat';
import { ClientMessage } from '../../elements/ClientMessage';
import { GigachatMessage } from '../../elements/GigachatMessage';
import { RusPassHeader } from '../../elements/Header';
import { DefaultPage } from '../DefaultPage';
import './style.css'


export const Main: react.FC = () => {
   let navigate = useNavigate()

   const [objects, setObjects] = useState([])
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
         dataLoad().then((r) => {
         })
      }
   })

   const onSearch = (text:string) =>{
      if (text != ''){
         backend.post('/search?data='+text).then((r)=>{
            setObjects(r.data as any)
         })
      }
   }

   

   return <div className='mainWrapper'> 
      <div className='banner'>
         <div>
            Спланируйте идеальное <br/>
            путешествие с RUSSPASS <br/>
            <span className='YellowText'>Москва <img src='/icons/yArrow.svg'></img></span>
         </div>
         <div className='searchFieldUnderWrapper'>
            <div className='searchMainWrapperHeader'>RUSSPASS - подскажет всё.</div>
            <div className='searchFieldWrapper'>
               <AutoComplete
                  className='searchAutoComplete'
                  popupClassName="searchAutoCompletePopup"
                  options={
                     [
                        {
                           label:'Результаты',
                           options: objects.map((value:any, index)=>{
                              return {
                                 label: value.header + '      ' + value.city,
                                 value: value.header
                              } 
                           })
                        }
                     ]
                     }
                  size="large"
               >
               <Input   onChange={(e)=>onSearch(e.target.value)} className='inputSearchField'  placeholder='Найти место или событие'></Input>
               </AutoComplete>
               <Button className='btnSearchField' onClick={()=>window.location.replace('https://russpass.ru/event/61714edb53b83e0018a78e18')}>Найти</Button>
            </div>
      </div>
      </div>


<div className='searchMainWrapper'>
      {/* <div className='searchFieldUnderWrapper'>
         <div className='searchMainWrapperHeader'>RUSSPASS - подскажет всё.</div>
         <div className='searchFieldWrapper'>
            <Input  onPressEnter={()=>onSearch()} className='inputSearchField' value={searchText} onChange={(e)=>setSearchText(e.target.value)} placeholder='Найти место или событие'></Input>
            <Button className='btnSearchField' onClick={()=>onSearch()}>Найти</Button>
         </div>
      </div> */}
      <div className='searchCardsHeader'>Места и события</div>
      <div className='searchCards'>
         <img draggable="false" className='searchCardImage' onClick={()=>window.location.replace('https://russpass.ru/event/61714edb53b83e0018a78e18')} src='/icons/mockCard.svg'/>
         <img draggable="false" className='searchCardImage' onClick={()=>window.location.replace('https://russpass.ru/event/61714edb53b83e0018a78e18')} src='/icons/mockCard1.svg'/>
         <img draggable="false" className='searchCardImage' onClick={()=>window.location.replace('https://russpass.ru/event/61714edb53b83e0018a78e18')} src='/icons/mockCard2.svg'/>
         <img draggable="false" className='searchCardImage' onClick={()=>window.location.replace('https://russpass.ru/event/61714edb53b83e0018a78e18')} src='/icons/mockCard3.svg'/>
         <img draggable="false" className='searchCardImage' onClick={()=>window.location.replace('https://russpass.ru/event/61714edb53b83e0018a78e18')} src='/icons/mockCard4.svg'/>
         <img draggable="false" className='searchCardImage' onClick={()=>window.location.replace('https://russpass.ru/event/61714edb53b83e0018a78e18')} src='/icons/mockCard5.svg'/>

         {/* {
            objects.map((value:any, index)=>{
               return <div className='searchCard'>
                  <div className='searchHeader'>{value.header}</div>
                  <div className='searchCity'>{value.city}</div>
                  <div className='searchAddress'>{value.Адрес}</div>
                  <div className='searchType'>{value.Тип}</div>
               </div>
            })
         } */}
      </div>
      <CatChat></CatChat>
   </div>
      </div>
}