import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
// import Todos from './components/Todos';
// import AddTodo from './components/AddTodo';
import Objects from './components/Objects';
import About from './components/pages/About';
// import uuid from 'uuid';
// import axios from 'axios';
import './App.css';

class App extends Component {
    state = {
        objects: []
    }

    runQuery = () => {
            //Github CMDA
          const url ="https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-17/sparql"
          //Note that the query is wrapped in es6 template strings to allow for easy copy pasting
          const query = `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX dc: <http://purl.org/dc/elements/1.1/>
          PREFIX dct: <http://purl.org/dc/terms/>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          PREFIX edm: <http://www.europeana.eu/schemas/edm/>
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>
          SELECT ?cho ?date ?title ?typeLabel ?pic WHERE {
              <http://hdl.handle.net/20.500.11840/termmaster15122> skos:narrower* ?visual .
          ?cho dc:title ?title .
              ?cho dct:created ?date .
              ?cho edm:isShownBy ?pic .
              ?cho edm:object ?type .
          MINUS {?cho edm:object ?visual .}
          FILTER (xsd:integer(?date))
              FILTER langMatches(lang(?title), "ned")
          ?type skos:prefLabel ?typeLabel .
          } LIMIT 500
          `
            // Call the url with the query attached, output data
            fetch(url+"?query="+ encodeURIComponent(query) +"&format=json")
            .then(res => res.json())
            .then(json => {
            json.results.bindings.map(data => (
              delete data.title["xml:lang"]
            ));
              
            let results = json.results.bindings;
            let itemArray = [];
            let unique = [];
            for(let i=0; i<json.results.bindings.length; i++){
              if(unique.includes(json.results.bindings[i].title.value)) {
                  delete json.results.bindings[i];
              } else {
                  unique.push(json.results.bindings[i].title.value);
              }
            }
            
            let filteredResults = results.filter(function (el) {
              return el != undefined;
            });
  
            for(let i=0; i < filteredResults.length; i++){
                var item = filteredResults[Math.floor(Math.random() * filteredResults.length)];
                itemArray.push(item);
            }
  
            itemArray = itemArray.slice(1, 3);
  
            console.log(itemArray)
            this.setState({ objects: itemArray });
            })
        
    }

    componentDidMount() {
        this.runQuery();
    }

    // // Toggle Complete
    // markComplete = (id) => {
    //     this.setState( { todos: this.state.todos.map(todo => {
    //         if(todo.id === id) {
    //             todo.completed = !todo.completed
    //         }
    //         return todo;
    //     }) });
    // }

    // // Delete Todo
    // delTodo = (id) => {
    //     axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    //     .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
    // }
    
    // // Add Todo
    // addTodo = (title) => {
    //     axios.post('https://jsonplaceholder.typicode.com/todos', {title, completed: false})
    //     .then(res => this.setState({ todos: [...this.state.todos, res.data] }))
    // }
    
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header />
                        <Route exact path="/" render={props => (
                            <React.Fragment>
                                <Objects objects={this.state.objects} />
                                <button onClick={this.runQuery} >Volgende</button> 
                            </React.Fragment>
                        )} />
                        <Route path="/about" component={About} />
                    </div>
                </div>
            </Router>
        ); 
    }
}

export default App;
