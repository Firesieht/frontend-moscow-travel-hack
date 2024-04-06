

export interface GigachatMessageIE{
    text: string,
    date: string,
    ref?:any,
}

export interface ClientMessageIE{
    text: string,
    date: string,
    ref?:any,

}

export interface MessageIE{
    content: string, 
    role:string,
    date_created: string

}

export interface PlaceIE{
    header:string,
    lat:Number,
    long:Number
}

export interface PlaceInfoIE{
    day:Number,
    places:PlaceIE[]
}

export interface AIChatIE{
    id:string,
    name:string, 
    created:string,
    messages: MessageIE[]
    places_info?: PlaceInfoIE[]

}