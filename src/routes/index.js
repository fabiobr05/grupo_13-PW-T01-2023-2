// Importando o React e o componente de rotas do react-router-dom para o arquivo de rotas
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importando as páginas que serão utilizadas nas rotas do arquivo de rotas
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Erro from "../pages/Erro";
import Temas from "../pages/Temas";
import Jogo from "../pages/Jogo";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Private from "./Private";
import PontuacaoJogador from "../pages/PontuacaoJogador";
// import { useState } from "react";
// Função que irá exportar as rotas da aplicação para serem utilizadas no arquivo App.js
function RoutesApp() {
  //check localStorage for an acess token
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/temas" element={<Temas />} />
        <Route 
          path="/jogo/:tema" 
          element={
            <Private>
              < Jogo/>
            </Private>
          } 
        />
        <Route 
          path="/pontuacaoJogador" 
          element={
            <Private>
              < PontuacaoJogador/>
            </Private>
          } 
        />
        <Route path="/login" element={< Login/>} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Erro />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default RoutesApp;