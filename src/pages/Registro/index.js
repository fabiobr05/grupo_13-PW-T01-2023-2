

import React from 'react';
import { /*useEffect,*/ useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
import './registro.css';

import { Link } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Registro() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Função que é executada quando o formulário é submetido para cadastrar um novo usuário no sistema
    async function handleRegister(e) {
        e.preventDefault();

        // verifica se os campos email e password foram preenchidos
        if (email !== "" && password !== "") {
        // cria um novo usuário no sistema
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success("Cadastro feito com sucesso!");
            // se o usuário foi criado com sucesso, redireciona para a rota /admin da aplicação
            navigate("/login", { replace: true });
            })
            .catch(() => {
            // se ocorreu algum erro ao criar o usuário, exibe uma mensagem de erro
            toast.warn("Erro ao efetuar o cadastro");
            toast.warn("Verifique se o usuário já foi criado");
            });
        } else {
        // Caso os campos email e password não tenham sido preenchidos, exibe uma mensagem de erro
        toast.warn("Preencha todos os campos!");
        }
    }
    return (
        <div className='body-login'>
            <div className="login-container light">
                <h2>Cadastre-se</h2>
                <form>
                    <label htmlFor="username">Seu melhor e-mail:</label>
                    <input type="text"
                           name="email" 
                           id="email"
                           placeholder="Digite seu email" 
                           onChange={(e) => setEmail(e.target.value)}
                           //required
                        />
                    <label htmlFor="password">Crie sua senha:</label>
                    <input type="password" 
                           id="password" 
                           name="password" 
                           placeholder="Digite sua senha"
                           onChange={(e) => setPassword(e.target.value)} 
                           //required 
                        />
                    <button type="submit" onClick={handleRegister}>
                        Cadastrar
                    </button>
                    <div>
                        <p>
                            <br></br>
                            Você já tem conta? {' '}
                            <Link to="/login" >
                                Acesse aqui 
                            </Link>
                        </p> 
                    </div>
                </form>
            </div>
        </div>
        
    );
}

export default Registro;
