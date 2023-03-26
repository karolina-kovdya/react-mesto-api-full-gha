import { Routes, Route, Link } from "react-router-dom";

function Header({userEmail, onSignOut, onNavbar, isOpen}) {
  return (
    <header className="header">
      <div className="header__logo" alt="логотип"></div>
      <Routes>
        <Route 
          path="/sign-up" 
          element={<Link to="/sign-in" className="header__link">Войти</Link>} 
        />
        <Route 
          path="/sign-in" 
          element={<Link to="/sign-up" className="header__link">Регистрация</Link>} 
        />
        <Route 
          path="/" 
          element={
            <>
            {isOpen ? <div className="header__burger-close" onClick={onNavbar}/> : 
            <div className="header__burger-btn" onClick={onNavbar}>
              <span className="header__burger-line" />
              <span className="header__burger-line" />
              <span className="header__burger-line" />
            </div> 
            }
            <div className="header__user"><p className="header__email">{userEmail}</p>
            <Link to="sign-in" className="header__link header__link_exit" onClick={onSignOut}>Выйти</Link></div>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
