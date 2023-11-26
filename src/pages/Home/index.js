import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link para navegação interna

import './home.css';
import 'bootstrap/dist/css/bootstrap.css';
import {db } from "../../services/firebaseConnection";
// import 'bootstrap/dist/js/bootstrap.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo
        ,faEarthAmericas
        ,faSquareRootVariable
        ,faSackDollar
        ,faMusic 
        } from '@fortawesome/free-solid-svg-icons';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";

const calcularRanking = (respostasObjeto) => {
  const ranking = {};

  for (const respostaId in respostasObjeto) {
    if (Object.hasOwnProperty.call(respostasObjeto, respostaId)) {
      const resposta = respostasObjeto[respostaId];
      const { email, tema, acertou } = resposta;

      if (!ranking[email]) {
        ranking[email] = {};
      }

      if (!ranking[email][tema]) {
        ranking[email][tema] = { acertos: 0, erros: 0 };
      }

      // Verifica se a resposta está correta e atualiza os acertos/erros
      if (acertou) {
        ranking[email][tema].acertos++;
      } else {
        ranking[email][tema].erros++;
      }
    }
  }

  // Converter o objeto em um array para poder ordenar
  const usuariosArray = Object.entries(ranking).map(([email, temas]) => ({ email, temas }));

  // Classificar o array por tema e pontuação de acertos mais alta
  usuariosArray.sort((a, b) => {
    const temaA = Object.keys(a.temas)[0];
    const temaB = Object.keys(b.temas)[0];
    const acertosA = a.temas[temaA].acertos;
    const acertosB = b.temas[temaB].acertos;

    // Ordenar por acertos mais altos e, em caso de empate, por ordem alfabética do email
    if (acertosA !== acertosB) {
      return acertosB - acertosA;
    } else {
      return a.email.localeCompare(b.email);
    }
  });

  // Agrupar usuários por tema
  const usuariosPorTema = {};

  usuariosArray.forEach(({ email, temas }) => {
    const tema = Object.keys(temas)[0];
    if (!usuariosPorTema[tema]) {
      usuariosPorTema[tema] = [];
    }
    usuariosPorTema[tema].push({ [email]: temas[tema] });
  });
  

  return usuariosPorTema;
};

// Componente para a seção de abertura
function ContentHome() {

  const [tarefas, setTarefas] = useState([]);
  const [user, setUser] = useState({});
  const [ranking, setRanking] = useState({});

  useEffect(() => {
    // Função que carrega as tarefas do usuário logado no sistema
    async function loadTarefas() {
      // localStorage.getItem é utilizado para recuperar o objeto userData do localStorage do navegador do usuário
      // JSON.parse é utilizado para converter a string JSON em um objeto JavaScript novamente e armazenar na variável data o objeto userData
      const userDetail = localStorage.getItem("@detailUser");
      // setUser é utilizado para armazenar o objeto userData na variável user
      setUser(JSON.parse(userDetail));

      // Verifica se o usuário está logado utilizando o objeto user retornado pelo localStorage.getItem
      if (userDetail) {
        const data = JSON.parse(userDetail);
        // collection é utilizado para acessar a coleção tarefas do banco de dados Firestore do Firebase
        const tarefaRef = collection(db, "questoes");
        // query é utilizado para realizar uma consulta na coleção tarefas do banco de dados Firestore do Firebase
        // para recuperar as tarefas do usuário logado no sistema
        const q = query(
          tarefaRef,
          orderBy("created", "desc"),
          where("userUid", "==", data?.uid)
        );

        // onSnapshot é utilizado para recuperar os dados da consulta realizada na coleção tarefas do banco de dados Firestore do Firebase
        // e atualizar a variável tarefas com os dados retornados da consulta
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            });
          });

          setTarefas(lista);
        });
      }
    }

    loadTarefas();
  }, []);

  return (
    <div className='content-home'>
      <div className="container">
        <div className="text-center pt-3">
          <div className="row">
            <div className="col">
              <div className="ml-auto text-start">
                <button type="button" className="btn btn-outline-light px-4">Quiz Time</button>
              </div>
              <h1 style={{ textAlign: 'left', paddingTop: '4%', color: 'aliceblue' }}>Está Pronto?</h1>
              <p className="pt-3" style={{ textAlign: 'justify', color: 'aliceblue' }}>
                Bem-vindo ao nosso Quizz Time! Teste seu conhecimento em uma ampla variedade de assuntos e desafie sua mente. Divirta-se enquanto aprende!
              </p>
              <div className="text-start pt-4">
                <Link to="/temas" className="btn btn-primary p-3 px-5">
                  Começar!
                </Link>
              </div>
            </div>
            <div className="col">
              <img src="/team_svg.svg" alt="Team discuting the project (content team)" width="100%" height="100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

function ContentRanking() {
  const [ranking, setRanking] = useState({});

  useEffect(() => {
    // Função que carrega as tarefas do usuário logado no sistema
    async function loadQuestoes() {
      

      const questoesRef = collection(db, "questoes");
      //Query para rankeamento
      const ranking = query(
        questoesRef,
        orderBy("created", "desc")
        //where("userUid", "==", data?.uid)
      );
      
      const unsub = onSnapshot(ranking, (snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            userUid: doc.data().userUid,
            email: doc.data().email,
            id: doc.id,
            tema: doc.data().tema,
            // resposta: doc.data().resposta,
            // correta: doc.data().correta,
            acertou: doc.data().acertou,
          });
        });

        setRanking(lista);
        // console.log(lista);
      });

      
    }

    loadQuestoes();
  }, []);

  const rankingCalculado = calcularRanking(ranking);
  console.log(rankingCalculado);


  return (
    <div className="secao2 light">
      <div className="container">
        <div className="row cabecalho-ranking ">
          <div className="col">
            <div className="row">
              <div className="col">
                <div className="icon-Filmes">
                  <div className="icon">
                  <FontAwesomeIcon icon={faVideo} />
                  </div>
                </div>
              </div>
              <div className="col text-ranking">
                <div className="col">3400+</div>
                Filmes
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                <div className="icon-Geografia">
                  <div className="icon">
                    <FontAwesomeIcon icon={faEarthAmericas} />
                  </div>
                </div>
              </div>
              <div className="col text-ranking">
                <div className="col">240+</div>
                Geografia
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                <div className="icon-Matematica">
                  <div className="icon">
                  <FontAwesomeIcon icon={faSquareRootVariable} />
                  </div>
                </div>
              </div>
              <div className="col text-ranking">
                <div className="col">240+</div>
                Matemática
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                <div className="icon-Financas">
                  <div className="icon">
                    <FontAwesomeIcon icon={faSackDollar}/>
                  </div>
                </div>
              </div>
              <div className="col text-ranking">
                <div className="col">240+</div>
                Finanças
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                <div className="icon-Musica">
                  <div className="icon">
                    <FontAwesomeIcon icon={faMusic} />
                  </div>
                </div>
              </div>
              <div className="col text-ranking">
                <div className="col">240+</div>
                Musica
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Linha --> */}
        <hr className="light"/>
        <h1 className="text-center pb-3">Ranking</h1>
        <h4 className="text-center pt-4 pb-5">Top Usuários com mais jogos/acertos feitos na plataforma</h4>
        <div className="container d-flex justify-content-center">
          {/* Laço para percorrer as chaves (temas) do ranking calculado */}
          {Object.keys(rankingCalculado).map((tema, index) => (
            <div className="square-ranking text-ranking" key={index}>
              <h3 class="title-square">{tema}</h3>
              {/* Laço para percorrer os usuários do tema */}
              {rankingCalculado[tema].slice(0,5).map((userStats, userIndex) => (
                <div key={userIndex}>
                  {/* Laço para percorrer os dados de cada usuário */}
                  {Object.entries(userStats).map(([email, { acertos, erros }], entryIndex) => (
                    <div key={entryIndex}>
                      <p>Usuario: {email.split('@')[0]}</p>
                      <p>Acertos: {acertos}</p>
                      {/* <p>Erros: {erros}</p> */}
                    </div>
                  ))}
                  <hr></hr>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Home() {
    return (
      <div>
        <ContentHome />
        <ContentRanking />
      </div>
    );
  }

export default Home;