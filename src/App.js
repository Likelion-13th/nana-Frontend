import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Cookies, CookiesProvider } from 'react-cookie';
import Home from './pages/home/home';
import MyPage from './pages/Mypage/Mypage';
import Diffuser from './pages/ProductPage/Diffuser';
import Perfume from './pages/ProductPage/Perfume';
import New from './pages/ProductPage/New';
import Footer from './components/Footer';
import Header from './components/Header';
import ToolBar from './components/ToolBar';

function App() {
  return (
    <CookiesProvider>
     <Router>
        <Header/>
        <ToolBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/mypage" element={<MyPage/>} />
          <Route path="/diffuser" element={<Diffuser/>} />
          <Route path="/perfume" element={<Perfume/>} />
          <Route path="/new" element={<New/>} />
        </Routes>
        <Footer/>
      </Router>
    </CookiesProvider>
  );
}

export default App;
