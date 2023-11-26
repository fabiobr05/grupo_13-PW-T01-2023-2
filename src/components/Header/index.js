import {React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link para navegação interna

import './header.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
// import { Whiteboard } from 'styled-icons/fluentui-system-filled';
// import { useNavigate } from "react-router-dom";

import { auth /*db*/ } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";
// import { UserDetail } from 'styled-icons/boxicons-solid';

// Componente para a barra de navegação
function Navbar() {

  // const navigate = useNavigate();

  async function handleLogout(e) {
    await signOut(auth);
    e.preventDefault();
    localStorage.removeItem("@detailUser");
    // Outras ações de logout
  }

  const [log, setLog] = useState(
    JSON.parse(localStorage.getItem("@detailUser")) ? true : false
  );
  
  useEffect(() => {
    setLog(JSON.parse(localStorage.getItem("@detailUser")) ? false : true);
    console.log(setLog)
  }, [log]);



  return (
    <div>
      <div className="secao1">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <Link to="/Home" className="navbar-brand">Quiz Time</Link> {/* Use Link para navegação interna */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/filmes" className="nav-link">Filmes</Link> {/* Use Link para navegação interna */}
                </li>
                <li className="nav-item">
                  <Link to="/geografia" className="nav-link">Geografia</Link> {/* Use Link para navegação interna */}
                </li>
                <li className="nav-item">
                  <Link to="/matematica" className="nav-link">Matemática</Link> {/* Use Link para navegação interna */}
                </li>
                <li className="nav-item">
                  <Link to="/financas" className="nav-link">Finanças</Link> {/* Use Link para navegação interna */}
                </li>
                <li className="nav-item">
                  <Link to="/musica" className="nav-link">Música</Link> {/* Use Link para navegação interna */}
                </li>
              </ul>
            </div>

            {log ? (
              <div className="ml-auto">
                <Link to="/login" className="btn btn-outline-light px-5">Login</Link>
              </div>
            ) : (
              <div className="ml-auto">
                <button
                  className="btn btn-outline-light px-5"
                  onClick={(e) => handleLogout(e)}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
    
    
    
  );
}

function Line() {
  return (
    <div id='line-back'>
      <div className="container">
      <hr style={{ color: 'white' }} />
      </div>
    </div>
  );
}



function Header() {
  return (
    <header>
      <Navbar />
      <Line />
    </header>
    
  );
}

export default Header;
