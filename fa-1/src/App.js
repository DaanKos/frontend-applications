// Necessary stuff gets imported, like react and react-router-dom for easy routing
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Objects from './components/Objects';
import About from './components/pages/About';
import Tutorial from './components/pages/Tutorial';
import './App.css';

class App extends Component {
    // The state contains 2 arrays, 1 for all objects, 1 for the 2 objects the user sees
    // It contains 2 "disabled triggers", which are being used for disabling and enabling buttons on the game page
    // It contains the current message, which is shown to the user on the game page and reflects their last answer in the game
    // It contains both the currentscore and highscore, which are retrieved from and written to the session and localstorage
    state = {
        selectedobjects: [],
        objects: [],
        answerButtonDisabled: false,
        nextButtonDisabled: false,
        currentMessage: "Wachtend op je antwoord...",
        currentScore: 0,
        highScore: 0,
    }

    // This function retrieves the currentscore and highscore from the session and localstorage and sends them to their state equivalants
    // After performing these actions, it enables the next button which allows the user to navigate to the next question
    updateScoring = () => {
        let sessionStorageScore = sessionStorage.getItem("CurrentScore");
        let localStorageScore = localStorage.getItem("HighScore");
        this.setState({ currentScore: sessionStorageScore });
        this.setState({ highScore: localStorageScore })
        this.setState({ nextButtonDisabled: false });
    }

    // This function fires after the user has given the right answer
    // It retrieves the currentscore from the sessionstorage, adds 1 point, and pushes it back to the session storage
    // If the currentscore is higher than the highscore, it sends the currentscore to the highscore in the local storage
    // After performing these actions, it fires the updateScoring and disableButtons functions
    rightAnswerGiven = () => {
        this.setState({ currentMessage: "Je antwoord is helemaal goed!" });
        let currentScoreValue = sessionStorage.getItem('CurrentScore');
        currentScoreValue = Number(currentScoreValue) + 1;
        sessionStorage.setItem('CurrentScore', currentScoreValue);
        let highScoreValue = localStorage.getItem('HighScore');
        if (highScoreValue < currentScoreValue){
            localStorage.setItem('HighScore', currentScoreValue);
        }
        this.updateScoring();
        this.setState({ answerButtonDisabled: true });
    }

    // This function fires after the user has given the wrong answer
    // It retrieves the currentscore from the sessionstorage, sets it to 0, and pushes it back to the session storage
    // After performing these actions, it fires the updateScoring and disableButtons functions
    wrongAnswerGiven = () => {
        this.setState({ currentMessage: "Je antwoord is helaas fout!" });
        let currentScoreValue = sessionStorage.getItem('CurrentScore');
        currentScoreValue = 0;
        sessionStorage.setItem('CurrentScore', currentScoreValue);
        this.updateScoring();
        this.setState({ answerButtonDisabled: true });
    }

    // This function fires once, on componentWillMount
    // It retrieves data from the NMVW database and filters the data, after which the retrieved objects get sent to an array in the state
    // After performing these actions, it fires the pushNextObjects function
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
           } LIMIT 1000
          `
            // Call the url with the query attached, output data
            fetch(url+"?query="+ encodeURIComponent(query) +"&format=json")
            .then(res => res.json())
            .then(json => {
            
            // Set the url for the "This image is protected by copyright" picture as a const
            const copyrightPic ="http://collectie.wereldculturen.nl/cc/imageproxy.ashx?server=localhost&port=17581&filename=images/CopyRightImage.jpg";
            
            // Put the received data in a let named results
            let results = json.results.bindings;
            
            // Create an empty array, the final filtered data will be pushed to this array
            let itemArray = [];
            
            // The following piece of code was inspired by Giovanni Kaaijk, from https://github.com/GiovanniKaaijk/frontend-applications/blob/master/my-app/src/App.js
            // I have edited the code to fit my needs
            // It loops through the received data and pushes their "date" property to an empty array
            // If the item in the current loop cycle has a "date" property that's already in the previously mentioned array, the item gets deleted
            let unique = [];
            for(let i=0; i<results.length; i++){
              if(unique.includes(results[i].date.value)) {
                console.log("Will delete item from array - duplicate date");  
                results.splice([i], 1);
              } else {
                  unique.push(results[i].date.value);
              }
            }

            // This loops through all remaining results and deletes the items from which the image url matches with the copyrightPic url
            for(let i=0; i<results.length; i++){
                if((results[i].pic.value) === copyrightPic) {
                    results.splice([i], 1)
                    console.log("Deleted item from array - Copyright image");
                }
            }
  
            // The following piece of code was inspired by Kyle Bot, from https://github.com/kylebot0/frontend-applications/blob/master/client/src/app.js
            // This code pushes all remaining results to the itemArray but randomizes the order
            // This needs to be done so the items shown to the user will be randomized
            for(let i=0; i < results.length; i++){
                var item = results[Math.floor(Math.random() * results.length)];
                itemArray.push(item);
            }

            // The items in the itemArray get pushed to the "objects" array in state
            this.setState({ objects: itemArray })

            // Fires pushNextObjects funtion
            this.pushNextObjects();
            })
        
    }

    // This object pushes 2 objects from the "objects" array in the state to the "selectedobjects" array in the state
    // It also removes the 2 pushed objects from the "objects" array
    // After performing these actions, it enables the answer buttons, changes the current message and disables the next question button
    pushNextObjects = () => {
        this.state.selectedobjects.splice(0, 2);
        for(let i=0; i < 2; i++){
        this.state.selectedobjects.push(this.state.objects[i]);
        this.state.objects.splice([i], 1);
        this.setState(this.state)
        console.log(this.state.selectedobjects);
        console.log(this.state.objects);
        this.setState({ answerButtonDisabled: false });
        this.setState({ currentMessage: "Wachtend op je antwoord..." });
        this.setState({ nextButtonDisabled: true });
        }
    }

    // This code fires once
    // It fires the runQuery function to retrieve data and updateScoring function to show the current and high scores
    // After performing these actions, it disables the next question button
    componentWillMount(){
        this.runQuery();
        this.updateScoring();
        this.setState({ nextButtonDisabled: true });
    }
    
    // This code renders the application
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header />
                        <Route exact path="/" component={Tutorial} />
                        <Route path="/het-spel" render={props => (
                            <React.Fragment>
                                <div className="objectsWrap">
                                <Objects objects={this.state.selectedobjects} rightAnswerGiven={this.rightAnswerGiven} wrongAnswerGiven={this.wrongAnswerGiven} answerButtonDisabled={this.state.answerButtonDisabled} />
                                </div>
                                <div className="messageWrap">
                                <p>{ this.state.currentMessage }</p>
                                </div>
                                <div className="nextButtonWrap"> 
                                <button disabled={this.state.nextButtonDisabled} onClick={this.pushNextObjects}>Volgende vraag</button>
                                </div> 
                                <div className="scoringWrap"> 
                                <div><p>Je huidige score:</p><p>{this.state.currentScore}</p></div>
                                <div><p>Je hoogste score:</p><p>{this.state.highScore}</p></div>
                                </div>
                            </React.Fragment>
                        )} />
                        <Route path="/info" component={About} />
                    </div>
                </div>
            </Router>
        ); 
    }
}

export default App;