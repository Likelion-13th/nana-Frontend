import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import MyPage from './pages/Mypage/Mypage';
import Diffuser from './pages/ProductPage/Diffuser';
import Perfume from './pages/ProductPage/Perfume';
import New from './pages/ProductPage/New';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/mypage" element={<MyPage/>} />
        <Route path="/diffuser" element={<Diffuser/>} />
        <Route path="/perfume" element={<Perfume/>} />
        <Route path="/new" element={<New/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
