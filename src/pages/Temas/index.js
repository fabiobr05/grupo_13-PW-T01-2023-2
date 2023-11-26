

// import { Link } from "react-router-dom";
import "./temas.css";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom';

function Temas() {





    return (
        <div className="theme">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <div className="square-theme ">
                            <ul className="buttons-list">
                                <li>
                                    <Link role="button"  to="/jogo/filmes" className="btn p-3 px-5 rounded-pill new-buttons">
                                        Filmes
                                    </Link>
                                </li>
                                <li>
                                    <Link role="button" to="/jogo/geografia" className="btn p-3 px-5 rounded-pill new-buttons" >
                                        Geografia
                                    </Link>
                                </li>
                                <li>
                                    <Link role="button"  to="/jogo/matematica" className="btn p-3 px-5 rounded-pill new-buttons" >
                                        Matematica
                                    </Link>
                                </li>
                                <li>
                                    <Link role="button" to="/jogo/musica" className="btn p-3 px-5 rounded-pill new-buttons" >
                                        Música
                                    </Link>
                                </li>
                                <li>
                                    <Link role="button" to="/jogo/financas" className="btn p-3 px-5 rounded-pill new-buttons" >
                                        Finanças
                                    </Link>
                                </li>
                                <li>
                                    <Link role="button" to="/jogo/esportes" className="btn p-3 px-5 rounded-pill new-buttons" >
                                        Esportes e Atletas
                                    </Link>
                                </li>
                                <li>
                                    <Link role="button" to="/jogo/celebridades" className="btn p-3 px-5 rounded-pill new-buttons" >
                                        Celebidades e Famosos
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Temas;