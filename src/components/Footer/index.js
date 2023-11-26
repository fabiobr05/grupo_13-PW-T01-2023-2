
import React from 'react';
import './Footer.css';


import {Whatsapp , Facebook , Instagram} from '@styled-icons/boxicons-logos';


function Footer(){
    return (
      <footer>
        <div id="footer_content">
            <div></div>
            <ul className="footer-list">
              <li>
                  <h6>Principais Temas</h6>
              </li>
              <li>
                  <a href="/jogo/filmes" className="footer-link">Filmes</a>
              </li>
              <li>
                  <a href="/jogo/geografia" className="footer-link">Geografia</a>
              </li>
              <li>
                  <a href="/jogo/matematica" className="footer-link">Matematica</a>
              </li>
              <li>
                <a href="/jogo/financas" className="footer-link">Finanças</a>
              </li>
            </ul>
            
            <ul className="footer-list">
                <li>
                    <h6>Outros</h6>
                </li>
                <li>
                    <a href="/jogo/esportes" className="footer-link">Esportes e Atletas</a>
                </li>
                <li>
                    <a href="jogo/celebridades" className="footer-link">Celebridades e Famosos</a>
                </li>
                <li>
                    <a href="/jogo/animais" className="footer-link">Animais e Vida Selvagem</a>
                </li>
                <li>
                  <a href="/jogo/saude" className="footer-link">Saúde e Bem-Estar</a>
              </li>
              <li>
                  <a href="/jogo/religiao" className="footer-link">Religião e Espiritualidade</a>
              </li>
            </ul>
  
            <div id="footer_contacts">
              <p>Siga-nos nas redes sociais</p>
  
              <div id="footer_social_media">
                  <a href="https://www.instagram.com/fabiobr05/" className="footer-link" id="instagram">
                  <Instagram size={'70%'} />
                  </a>
  
                  <a href="https://www.facebook.com/fabio.batistarodrigues.1" className="footer-link" id="facebook">
                    <i className="fa-brands fa-facebook-f"></i>
                    <Facebook size={'70%'} />
                  </a>
  
                  <a href="https://wa.me/67998844330" className="footer-link" id="whatsapp">
                    <Whatsapp size={'70%'} />
                  </a>
              </div>
            </div>
        </div>
  
        <div id="footer_copyright">
            &#169
            Powered By Fabio B. Rodrigues
        </div>
      </footer>
    );
  }

export default Footer;