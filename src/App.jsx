import Naav from './components/Naav'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Book from './components/Book'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Cart from './components/Cart'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Naav />
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Menu />
              <About />
              <Book />
            </>
          }
        />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Book />} />
         <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
