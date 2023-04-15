import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Login from './pages/Login';
import SetAvatar from './pages/SetAvatar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/" element={<Chat/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/SetAvatar" element={<SetAvatar/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
