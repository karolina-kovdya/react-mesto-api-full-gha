import { Routes, Route, Link } from "react-router-dom"; 

function Navbar(props) {
  return (
    <section className={`${props.isOpen ? 'navbar_opened' : 'navbar'}`} onClick={props.onClose}>
        <div className="navbar__container" onClick={e => e.stopPropagation()}>
          <Routes>
            <Route
              path="/"
              element={
                <div className="navbar__user">
                  <p className="navbar__email">{props.userEmail}</p>
                  <Link to="sign-in" className="navbar__link_exit" onClick={props.onSignOut}>Выйти</Link></div>
              }
            />
           </Routes>
        </div>
    </section>
  );
}

export default Navbar;
