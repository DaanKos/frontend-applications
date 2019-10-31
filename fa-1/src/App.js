import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Objects from './components/Objects';
import About from './components/pages/About';
// This commented piece of code is from a tutorial (https://www.youtube.com/watch?v=sBws8MSXN7A) I followed, and will be removed soon
// import uuid from 'uuid';
// import axios from 'axios';
import './App.css';

class App extends Component {
    state = {
        selectedobjects: [],
        objects: [],
        currentScore: 0,
        highScore: 0,
    }

    updateScoring = () => {
        let sessionStorageScore = sessionStorage.getItem("CurrentScore");
        let localStorageScore = localStorage.getItem("HighScore");
        this.setState({ currentScore: sessionStorageScore });
        this.setState({ highScore: localStorageScore })
    }

    runQuery = () => {
          // The following piece of code was written by user Razpudding (Laurens), from https://codepen.io/Razpudding/pen/LKMbwZ
          // I have edited the code to fit my needs and use my own endpoint
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
          SELECT * WHERE {
            <https://hdl.handle.net/20.500.11840/termmaster14188> skos:narrower* ?type .
            ?cho dc:title ?title .
            ?cho dct:created ?date .
            BIND (xsd:gYear(?date) AS ?year)
            FILTER (?year > xsd:gYear("1500"))
            ?cho edm:isShownBy ?pic .
            ?cho edm:object ?type .
            FILTER langMatches(lang(?title), "ned")
            ?type skos:prefLabel ?typeLabel .
           } LIMIT 200
          `
            // Call the url with the query attached, output data
            fetch(url+"?query="+ encodeURIComponent(query) +"&format=json")
            .then(res => res.json())
            .then(json => {
            
            const copyrightPic ="http://collectie.wereldculturen.nl/cc/imageproxy.ashx?server=localhost&port=17581&filename=images/CopyRightImage.jpg";
            let results = json.results.bindings;
            console.log(results.length);
            console.log(results);
            let itemArray = [];
            
            // The following piece of code was inspired by Giovanni Kaaijk, from https://github.com/GiovanniKaaijk/frontend-applications/blob/master/my-app/src/App.js
            // I have edited the code to fit my needs
            let unique = [];
            for(let i=0; i<results.length; i++){
              if(unique.includes(results[i].date.value)) {
                console.log("Will delete item from array - duplicate date: ", results[i].date.value);  
                results.splice([i], 1);
                console.log("Have delted item from array - it was not ", results[i].date.value);
              } else {
                  unique.push(results[i].date.value);
                  console.log("Pushed value: ", results[i].date.value, " in round ", [i]);
              }
            }
            console.log(results.length);

            for(let i=0; i<results.length; i++){
                if((results[i].pic.value) === copyrightPic) {
                    results.splice([i], 1)
                    console.log("Deleted item from array - Copyright image")
                }
            }

            console.log(results.length);
  
            // The following piece of code was inspired by Kyle Bot, from https://github.com/kylebot0/frontend-applications/blob/master/client/src/app.js
            for(let i=0; i < results.length; i++){
                var item = results[Math.floor(Math.random() * results.length)];
                itemArray.push(item);
            }
  
            console.log(itemArray);

            this.setState({ objects: itemArray })
            this.pushNextObjects();
            })
        
    }


    pushNextObjects = () => {
        this.state.selectedobjects.splice(0, 2);
        console.log("Deleted first 2 entries");
        for(let i=0; i < 2; i++){
        this.state.selectedobjects.push(this.state.objects[i]);
        this.state.objects.splice([i], 1);
        this.setState(this.state)
        console.log(this.state.selectedobjects);
        }
    }

    componentWillMount(){
        this.runQuery();
        this.updateScoring();
    }

    // This commented piece of code is from a tutorial (https://www.youtube.com/watch?v=sBws8MSXN7A) I followed, and will be removed soon
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
                                <div className="objectsWrap">
                                <Objects objects={this.state.selectedobjects} updateScoring={this.updateScoring}/>
                                </div>
                                <button onClick={this.pushNextObjects}>Volgende</button> 
                                <div><p>Current score: </p><p>{this.state.currentScore}</p></div>
                                <p></p>
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
