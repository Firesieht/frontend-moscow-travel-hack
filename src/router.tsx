import {
    createBrowserRouter, createHashRouter, Route, Routes
} from 'react-router-dom'
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { DefaultPage } from './pages/DefaultPage';
import { AiGid } from './pages/AiGid';
import { ChatEventProvider } from './pages/chatEventProvider';



export const AppRoutes = () => {
    return (
      <Routes>
        <Route path={'login'} element={<Login />} />
        <Route path={'register'} element={<Register />} />
        
       <Route path='chat/:chatID' element={<AiGid/>}>
         <Route path='/chat/:chatID/:event' element={<ChatEventProvider/>}></Route>
       </Route>


        <Route element={<DefaultPage />}>
          <Route path='/' element={<Main/>}></Route>
        </Route>
       
      </Routes>
    );
  };

