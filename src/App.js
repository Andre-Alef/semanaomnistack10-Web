import React, { useState ,useEffect} from 'react';
import api from './services/api';
import './global.css'
import './App.css'
import './sidebar.css'
import './main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'
// Componente : Bloco isolado de HTML, CSS e Js, o qual não interfere o restante da aplicação
// Estado : Informações mantidas pelo componente (Rever: imutabilidade)
// Propriedade : Informações que um componente pai passa para um componente filho

//import Header from './Header'

 

function App() {
  const [devs, setDevs] = useState([]);

  

    useEffect(() =>{
      async function loadDevs(){
        const response = await api.get('/devs')
        setDevs(response.data)
      }
      loadDevs()
    },[])
    
    async function handleAddDev(data){
      
      const response = await api.post('/devs',data)
     
      setDevs([...devs,response.data])
    }
  return (
            <div id="app">
              <aside>
                <strong>Cadastrar</strong>
              <DevForm onSubmit={handleAddDev} />
              </aside>
              <main>
                  <ul>
                    {devs.map(dev => (
                     <DevItem key={dev._id} dev={dev}/>
                    ))}
                    
                  </ul>
              </main>
            </div>
    );
}

export default App;
