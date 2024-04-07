import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import { RusPassHeader } from "../../elements/Header";
import './styles.css'


export interface DefaultPageIE{
    footer?:boolean,
    header?:boolean,
    whiteCard?:boolean
}
export const DefaultPage:React.FC<DefaultPageIE> = (props) =>{
    
    return  <div className='mainWrapper'>
         {props.header == false? <></>:<RusPassHeader></RusPassHeader>}

            
                    <Outlet></Outlet>
                    
           
            {
                props.footer == false? <></>:
                <>
                    <a href='https://1drv.ms/w/s!AuaFmGWFNV5Np0OhMmVtxPXlG2Ob?e=f7NDCp'>Документация</a>
                    <div className='mainIconWrapper'>
                        <img className='mainIcon' src='/icons/yt.svg'></img>
                        <img className='mainIcon' src='/icons/vk.svg'></img>
                        <img className='mainIcon' src='/icons/dz.svg'></img>
                        <img className='mainIcon' src='/icons/tg.svg'></img>
                        <img className='mainIcon' src='/icons/ok.svg'></img>
                    </div>
                </>
            }
          

            <div className='grey'>© 2024 A project of the Government of Moscow</div>
    </div>

}