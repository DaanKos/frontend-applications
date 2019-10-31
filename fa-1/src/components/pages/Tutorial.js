import React from 'react';
import { Link } from 'react-router-dom';

function Tutorial() {
    return (
        <React.Fragment>
        <div className="explainpageWrap">
           <h1>Uitleg</h1>
           <p>Leuk dat je het "Welk object is ouder?" spel wilt spelen! Op deze pagina wordt de werking van het spel kort uitgelegd, na het lezen van de uitleg kun je starten met het spel!.</p>
           <ol>
            <li>Er komen 2 objecten tevoorschijn. Bekijk de foto's goed, welk van deze objecten is het oudst?</li>
            <li>Denk je dat je het weet? Klik dan bij dit object op de "Dit object is ouder!" knop!</li>
            <li>Heb je het goed? Gefeliciteerd, je huidige score is omhoog gegaan!</li>
            <li>Heb je het fout? Jammer, je huidige score gaat terug naar 0.</li>
            <li>Klik op "Volgende vraag" om naar de volgende vraag te gaan!</li>
            <li>Probeer je high score te verbreken, veel succes!</li>
           </ol>
           <Link className="explainpageLink" to="/het-spel">Start het spel!</Link>
        </div>
        </React.Fragment>
    )
}

export default Tutorial;