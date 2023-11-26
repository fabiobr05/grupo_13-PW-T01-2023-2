// Importando dependencias e componentes para o arquivo App.js que será o arquivo principal da aplicação
import RoutesApp from "./routes";
// Importando o componente ToastContainer do react-toastify para ser utilizado na aplicação e estilizando o componente
// https://www.npmjs.com/package/react-toastify
import { ToastContainer } from "react-toastify";
// Importando o arquivo de estilização do componente ToastContainer do react-toastify
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <RoutesApp />
    </div>
  );
}

export default App;