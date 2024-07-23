import './App.css';
import Register from "./Components/Register";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatArea from "./Components/ChatArea";
import Sidebar from "./Components/Sidebar";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/chat/:id' element={<div className='chat-container'> <Sidebar /> <ChatArea /></div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

