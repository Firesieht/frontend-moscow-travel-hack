import { Button, Input } from "antd";
import React, { useState } from "react";
import './styles.css'


export  interface SearchInputIE{
    onSend: (msg:string) =>void
}

export const SearchInput:React.FC<SearchInputIE> = (props) =>{
    const [msg, setMsg] = useState<string>('')

    const onSend = () => {
        if (msg != ''){
            props.onSend(msg)
            setMsg('')
        }

    }

    return <div className="searchInputWrapper">
            <Input onPressEnter={()=>onSend()} className="searchInput"  placeholder="Расскажи о своих планах" value={msg} onChange={(e)=>setMsg(e.target.value)}></Input>
            <Button className="searchButton"  onClick={()=>onSend()}>отправить</Button>
        </div>
}