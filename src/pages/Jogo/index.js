

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './jogo.css';
import { useParams } from 'react-router-dom';
import { auth, db } from "../../services/firebaseConnection";
// import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { dados } from "../../Data/mockData"

import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc,
  } from "firebase/firestore";

  import { useNavigate } from "react-router-dom";

function Jogo() {

    const navigate = useNavigate();

    const { tema } = useParams();
    const [user, setUser] = useState({});
    let [correta, setCorreta] = useState(""); // Estado para armazenar a alternativa correta
    const [alternativas, setAlternativas] = useState([]); // Estado para armazenar as alternativas
    let [pergunta, setPergunta] = useState("");
    let [perguntaId, setPerguntaId] = useState("");

    const [questionIndex, setQuestionIndex] = useState(0); // Estado para rastrear a questão atual
    //Carregando dados
    const [questions, setQuestions] = useState(dados[tema] || []);
    const handleNextQuestion = () => {
        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        } else {
            // Quando chegar à última questão, você pode reiniciar ou fazer alguma outra ação
            //alert("Parabéns, você completou todas as questões!");
            toast.success("Parabéns, você completou todas as questões!");
            // Para reiniciar, você pode fazer: setQuestionIndex(0);
            navigate("/pontuacaoJogador", { replace: true }); //Ainda vou construir essa pagina
        }
    };

    useEffect(() => {
        let alternativasLocal;
        const user = localStorage.getItem("@detailUser");
        setUser(JSON.parse(user));
        try {
            setPergunta(questions[questionIndex].pergunta);
            alternativasLocal = questions[questionIndex].alternativas;
            setCorreta(questions[questionIndex].correta); // Definindo a alternativa correta para filmes
            // Adicione cases para outros temas com conteúdo e alternativas correspondentes
        } catch (e) {
                setPergunta("Conteúdo não encontrado");
                alternativasLocal = [];
        }

        setAlternativas(alternativasLocal); // Definindo as alternativas
        setTimer(30);
    }, [tema]);

    async function handleResposta(resposta, pergunta, correta) {
        //e.preventDefault();
    
        // Verifica se o campo tarefa foi preenchido para registrar uma nova tarefa
        if (resposta === "") {
          alert("Digite sua tarefa...");
          return;
        }

        //ja verificar se a resposta é correta:
        let acertou = false
        if(resposta === correta){
            acertou = true;
        }

        // Registrar Perguntas
        try {
            const perguntaId = await addDoc(collection(db, "questoes"), {
                userUid: user?.uid,
                email: user?.email,
                pergunta: pergunta,
                resposta: resposta,
                correta: correta,
                acertou: acertou,
                created: new Date(),
                tema: tema,
            });
                // alert("Resposta Registrada");
                setPerguntaId(perguntaId.id);
                toast.success("Resposta Registrada");
        } catch (e) {
            alert("ERRO AO REGISTRAR " + e);
        }
        // addDoc é utilizado para registrar uma nova tarefa no banco de dados Firestore do Firebase
        // try { 
        //     addDoc(collection(db, "respostas"), {
        //     resposta:  resposta,
        //     // created: new Date(),
        //     userUid: user?.uid,
        //     correta: correta,
        //     perguntaId: perguntaId,
        //     // Preciso do id da tarefa
        //   });
        //   toast.success("Resposta Registrada");
        // } catch (e) {
        //     alert("ERRO AO REGISTRAR " + e);
        // }


    }

    const [contador, setContador] = useState(1);
    useEffect( () => {
        // setContador(contador + 1);
    },[contador]);

    const proximaQuestao = () => {
        setContador(contador+1);
        handleNextQuestion();
        setTimer(30);
    };
    //States para o timer
    const [timer, setTimer] = useState(30); // Tempo inicial em segundos
    //Timer de contagem regressiva
    useEffect(() => {
        // Iniciando o timer quando as perguntas mudarem
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(interval);
                toast.warn("Tempo Esgotado");
                // Lógica para o que acontece quando o tempo acaba
                setQuestionIndex(questionIndex+1);
                proximaQuestao();
                //setTimer(30);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        const handleWindowClose = (event) => {
          event.preventDefault();
          event.returnValue = '';
          const confirmationMessage = 'Tem certeza que deseja sair? Todas as respostas não enviadas serão perdidas.';
          event.returnValue = confirmationMessage;
          return confirmationMessage;
        };
      
        window.addEventListener('beforeunload', handleWindowClose);
      
        return () => {
          window.removeEventListener('beforeunload', handleWindowClose);
        };
    }, [questionIndex]);
      


    return (
        <div className="tela-jogo light">
            <div className="container" style = {{marginTop: '2%'}}>
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-row">
                            <div className="icon-game">
                                <div className="icon">
                                <i className="fa-solid fa-video"></i>
                                </div>
                            </div>
                            <div className="title col-4 d-flex justify-content-center align-items-center">
                            <h5>{tema.charAt(0).toUpperCase() + tema.slice(1)}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                </div>
                <div className="container text-center pt-3">
                    <div className="row">
                    <div className="col">
                        <h2 style={{textAlign: 'left', paddingTop:'20%', color: 'aliceblue'}}>
                            {questions[questionIndex].pergunta}
                        </h2>
                    </div>

                    {/* <!--Quadro de perguntas--> */}
                    <div className="col">
                        <div className="quiz-box">
                            <header>
                                <div className="title"> Escolha uma das alternativas</div>
                                <div className="timer">
                                    <div className="time-text">Time Left</div>
                                    <div className="timer-sec">{timer}</div>
                                </div>
                            </header>
                            <section>
                                <div className="option-list">
                                {/* {alternativas.map((option, index) => (
                                    <div className="option" key={index}>
                                        <button className='button-quizz' onClick={() => handleResposta(option)}>
                                            {option}
                                        </button>
                                    </div>
                                ))} */}
                                {questions[questionIndex].alternativas.map((option, index) => (
                                    <div className="option" key={index}>
                                        <button className='button-quizz' onClick={() => handleResposta(option
                                                                                                     ,questions[questionIndex].pergunta
                                                                                                     ,questions[questionIndex].correta)}>
                                            {option}
                                        </button>
                                    </div>
                                ))}
                                </div>
                            </section>
                            
                            {/* <!--Quiz box footer--> */}
                            <footer>
                                <div className="total-que">
                                    <span><p>{contador}</p>Of<p>5</p>Questions</span>
                                </div>
                                <button className="next-btn"
                                        onClick={() => proximaQuestao()}>
                                    Proxima Questão
                                    </button>
                            </footer>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}


export default Jogo;