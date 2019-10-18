import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
//import uuid from 'uuid';
import axios from 'axios';
import './App.css';

class App extends Component {
    state = {
        todos: []
    }

    componentDidMount() {
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
        SELECT ?cho ?date ?title ?type ?pic WHERE {
            ?cho dc:title ?title .
            ?cho dct:created ?date .
            ?cho edm:isShownBy ?pic .
            ?cho dc:type ?type .
            FILTER (!REGEX (?type, "Foto"))
            FILTER (!REGEX (?type, "Negatief"))
            FILTER (!REGEX (?type, "foto"))
            FILTER (!REGEX (?type, "Dia"))
            FILTER (!REGEX (?type, "Repronegatief"))
            FILTER (!REGEX (?type, "Lichtbeeld"))
            FILTER (!REGEX (?type, "negatief"))
            FILTER (!REGEX (?type, "kleurendia"))
            FILTER (xsd:integer(?date))
            FILTER langMatches(lang(?title), "ned")
        } LIMIT 250
        `
        const runQuery = (url, query) => {
          // Call the url with the query attached, output data
          fetch(url+"?query="+ encodeURIComponent(query) +"&format=json")
          .then(res => res.json())
          .then(json => {
          json.results.bindings.map(data => (
            delete data.title["xml:lang"]
          ));

          let result = json.results.bindings;
          let unique = [];
          for(let i=0; i<result.length; i++){
            if(unique.includes(json.results.bindings[i].title.value)) {
                delete json.results.bindings[i];
            } else {
                unique.push(json.results.bindings[i].title.value);
            }
          }
          
          console.log(json.results.bindings);
          this.setState({ todos: json.results.bindings });
          })
        }
        runQuery(url, query);
    }

    // Toggle Complete
    markComplete = (id) => {
        this.setState( { todos: this.state.todos.map(todo => {
            if(todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo;
        }) });
    }

    // Delete Todo
    delTodo = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
    }
    
    // Add Todo
    addTodo = (title) => {
        axios.post('https://jsonplaceholder.typicode.com/todos', {title, completed: false})
        .then(res => this.setState({ todos: [...this.state.todos, res.data] }))
    }
    
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header />
                        <Route exact path="/" render={props => (
                            <React.Fragment>
                                <AddTodo addTodo={this.addTodo} />
                                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
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
