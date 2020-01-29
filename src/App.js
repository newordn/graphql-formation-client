import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost'
import {gql} from 'apollo-boost'
const client = new ApolloClient({
  uri: 'http://graphql-formation-api.herokuapp.com/'
})
let phone=""
let password=""
async function connexion(phone,mot_de_passe){
  console.log(mot_de_passe)
  try{
 const result = await client.mutate({
   variables: {
  phone,mot_de_passe
},
    mutation: gql`
    mutation connexionPrismaMutation($phone:String, $mot_de_passe:String){
      connexionPrisma(phone:$phone,mot_de_passe:$mot_de_passe){
      token
      user{
        noms
      }
    }
  }
    `
  })
  alert("Bienvenu "+ result.data.connexionPrisma.user.noms)
}
catch(e){
  console.log(e)
  alert("L'utilisateur n'est pas inscrit ")
}
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form style={{backgroundColor:'white',width:400,padding:10,borderRadius:16}}>
        <div>
        <input onChange={e=>{phone=e.target.value}} placeholder="Votre numero de telephone"/>
        </div>
        <div>
        <input  onChange={e=>{password=e.target.value}}  type="password" placeholder="Mot de passe"/>
        </div>
        <button onClick={()=>connexion(phone,password)} type="button" style={{backgroundColor:'blue',color:'white'}}>Connexion</button>
      </form>   
      </header>
      
    </div>
  );
}

export default App;
