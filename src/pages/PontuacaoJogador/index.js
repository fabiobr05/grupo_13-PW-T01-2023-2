import React from 'react';
import { Link } from "react-router-dom";
import "./pontuacaoJogador.css";
import { useState, useEffect } from "react";
import {db } from "../../services/firebaseConnection";
import DonutChart from '../../components/DonutChart';
// import { signOut } from "firebase/auth";
//import { Pie } from '@nivo/pie';
import {
    // addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    // doc,
    // deleteDoc,
    // updateDoc,
  } from "firebase/firestore";




// Função que irá renderizar a página de erro 404
// quando o usuário tentar acessar uma rota que não existe ou não foi criada
function PontuacaoJogador() {

    
    const [questoes, setQuestoes] = useState([]);

    // Carrega as tarefas do usuário logado no sistema ao acessar a rota /admin da aplicação e ao atualizar a página
    useEffect(() => {
        // Função que carrega as tarefas do usuário logado no sistema
        async function loadQuestoes() {
        // localStorage.getItem é utilizado para recuperar o objeto userData do localStorage do navegador do usuário
        // JSON.parse é utilizado para converter a string JSON em um objeto JavaScript novamente e armazenar na variável data o objeto userData
        const userDetail = localStorage.getItem("@detailUser");
        // setUser é utilizado para armazenar o objeto userData na variável user
        //setUser(JSON.parse(userDetail));

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
            /*const unsub =*/ onSnapshot(q, (snapshot) => {
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                id: doc.id,
                email:doc.data().email,
                tema: doc.data().tema,
                pergunta: doc.data().pergunta,
                resposta: doc.data().resposta,
                correta: doc.data().correta,
                });
            });

            setQuestoes(lista);
            });
        }
        }

        loadQuestoes();
    }, []);

    console.log(questoes);
    let acertos = 0;
    let erros = 0;
    for (let i = 0; i < 5/*questoes.length*/; i++) {
        if (questoes[i]?.resposta === questoes[i]?.correta) {
            acertos += 1;
        } else {
            erros += 1;
        }
    }
    // setAcertos(acertos_n);
    // setErros(erros_n);
    console.log(erros);
    console.log(acertos);

    const dataNew = [
      {
        id: "erros",
        label: "erros",
        value: erros, // Substitua o valor fixo pelo valor calculado dinamicamente da variável 'erros'
        color: "red",
      },
      {
        id: "acertos",
        label: "acertos",
        value: acertos, // Substitua o valor fixo pelo valor calculado dinamicamente da variável 'acertos'
        color: "blue",
      },
    ];

  return (
    <div className="principal">
      <h5>Sua pontuação!</h5>
      <div>
        <p className='pontuacao'>Total de acertou: {acertos}</p>
        <p className='pontuacao'>Total de errou: {erros}</p>
        <div /*className="chart-container" style={{ width: "300px", height: "300px" }}*/>
          <DonutChart data={dataNew} />
        </div>
      </div>
      <div>
          <h3>Questões feitas anteriormente</h3>
          {questoes.map((questao, index) => (
            <div key={index}>
              <p>Pergunta {(index + 1)}:</p>
              <p>Tema: {questao.tema}</p>
              <p>Pergunta: {questao.pergunta}</p>
              <p>Resposta: {questao.resposta}</p>
              <p>Correta: {questao.correta}</p>
              <hr></hr>
            </div>
          ))}
        </div>
      <Link to="/">Volte a pagina inicial</Link>
    </div>
  );
}

export default PontuacaoJogador;