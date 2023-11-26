

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './login.css';
import { Link } from 'react-router-dom'; // Importe o Link para navegação interna
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";
import { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    const navigate = useNavigate();

    // Função que é executada quando o formulário é submetido para fazer o login no sistema
    async function handleLogin(e) {
        e.preventDefault();

        // verifica se os campos email e password foram preenchidos para fazer o login
        if (email !== "" && password !== "") {
        // faz o login no sistema com o email e password informados
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
            // navegar para /admin
            // se o login foi realizado com sucesso, redireciona para a rota /admin da aplicação
            // replace: true é utilizado para substituir a rota atual pela rota /admin
            toast.success("Login feito com sucesso");

            //Armazenar o usuario no local storage
            onAuthStateChanged(auth, (user) => {
                //se tem user logado no sistema
                if (user) {
                  const userData = {
                    uid: user.uid,
                    email: user.email,
                  };
        
                  // localStorage.setItem é utilizado para armazenar o objeto userData no localStorage do navegador do usuário
                  // JSON.stringify é utilizado para converter o objeto userData em uma string JSON
                  // O objeto userData é armazenado no localStorage do navegador do usuário com a chave @detailUser
                  localStorage.setItem("@detailUser", JSON.stringify(userData));
        
                  setLoading(false);
                  setSigned(true);
                }
            });

            navigate("/home", { replace: true });
            })
            .catch(() => {
            // se ocorreu algum erro ao fazer o login, exibe uma mensagem de erro
            toast.warn("Erro ao efetuar o login");
            });
        } else {
        // caso os campos email e password não tenham sido preenchidos, exibe uma mensagem de erro
        toast.warn("Preencha todos os campos!");
        }
    }
    return (
        <div className='body-login'>
            <div className="login-container light">
                <h2>Login</h2>
                <form>
                    <label htmlFor="username">E-mail</label>
                    <input type="text"
                           name="username" 
                           id="username"
                           placeholder="Digite seu email" 
                           onChange={(e) => setEmail(e.target.value)}
                           required />

                    <label htmlFor="password">Senha:</label>
                    <input type="password" 
                           id="password" 
                           name="password" 
                           placeholder="Digite sua senha"
                           onChange={(e) => setPassword(e.target.value)}
                           //required 
                        />
                    <button type="submit" onClick={handleLogin}>Entrar</button>
                    <div>
                        <p>
                            <br></br>
                            Você não tem conta? {' '}
                            <Link to="/registro" >
                                Cadastre-se  
                            </Link>
                        </p> 
                    </div>
                    
                </form>
            </div>
        </div>
        
    );
}

export default Login;
