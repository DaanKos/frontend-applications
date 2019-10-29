# Frontend-Applications: Ontdek de collectie van het NMVW

Dit is mijn repository voor het vak Frontend-Applications. Ik heb dit vak gevolgd van 14-10-2019 t/m 29-10-2019. Het vak is een onderdeel van de tech-track van Information Design in jaar 3 van CMD aan de HvA.
![](https://i.imgur.com/JwHwQwU.png)

## Inhoud
* [Link naar de applicatie](#link-naar-de-applicatie)
* [Bekende fouten](#bekende-fouten)
* [Introductie](#introductie)
* [Doelgroep](#doelgroep)
* [Het concept](#het-concept)
* [Hoe het werkt](#hoe-het-werkt)
* [Gebruikte data](#gebruikte-date)
* [Credits](#credits)

## Link naar de applicatie
Klik hier om de applicatie te gebruiken/bekijken

## Bekende fouten
Ik ben me bewust dat deze fouten in de huidige versie van dit project zitten:
* Functionaliteit van het spel werkt niet
* Het weergeven van 2 nieuwe objecten vereist een refresh
* De styling is ondermaats
* Er zit nog oude code die niet meer gebruikt wordt in de code, dit is uitgecomment maar moet nog weg

## Introductie
Voor het vak Frontend-Applications heb ik de opdracht gekregen om aan de slag te gaan met de database van het NMVW (Nationaal Musea van Wereldkunde).
Het NMVW heeft een ontzettend grote collectie, en maar een deel hiervan wordt tentoongesteld in de musea die bij het NMVW horen. 
Deze grote collectie is online te bekijken, maar hier komen maar weinig mensen op af. Ook is deze collectie moeilijk om te ontdekken, het is vooral gericht op mensen die weten wat ze willen bekijken.
Aan mij de taak om met deze collectie aan de slag te gaan en het aantrekkelijk(er) te maken om de website van de collectie te bezoeken.

## Doelgroep
In mijn uitwerking van deze opdracht heb ik mij gericht op een jonge doelgroep, kinderen tussen de 8 en 14 jaar, maar het concept is ook leuk voor personen die buiten deze groep vallen.
Ik heb voor deze doelgroep gekozen omdat ik denk dat er weinig tot geen mensen uit deze doelgroep de huidige site van de collectie van het NMVW bezoeken. Er valt dus veel te winnen binnen deze doelgroep.

## Het Concept
In deze applicatie kan men de collectie van het NMVW op een speelse manier ontdekken.
De gebruiker start een game waarbij 2 objecten uit de database van het NMVW naast elkaar worden gezet.
Hierbij wordt een vraag gesteld, bijvoorbeeld: "Welk van deze 2 objecten is ouder?".
Wanneer de gebruiker het juiste antwoord geeft volgt een nieuwe vraag en gaat zijn score omhoog.
Heeft de gebruiker het fout, dan stopt de game en kan de gebruiker opnieuw beginnen.
Na het beantwoorden van de vraag heeft de gebruiker de mogelijkheid om een van de twee (of beide) objecten in de collectie te bekijken waardoor ze meer over het object te weten kunnen komen.

## Hoe het werkt
Wanneer de gebruiker de applicatie start, worden er 500 objecten uit de collectie database van het NMVW gehaald (meer over deze actie onder "gebruikte data").
Nadat deze objecten zijn opgehaald, krijgt de gebruiker willekeurig 2 van deze objecten voorgeschoteld.
Hierbij wordt er rekening gehouden met het feit dat beide objecten uit een ander jaar komen.
De gebruiker ziet dan alleen de naam en de foto van deze 2 objecten.
Nu is er input van de gebruiker nodig, hij klikt op het object waarvan hij denkt dat hij ouder is dan het andere object.
Wanneer de gebruiker heeft geklikt, worden de jaartallen van de 2 objecten met elkaar vergeleken en wordt er bepaald of de gebruiker het juiste antwoord heeft gegeven.
De gebruiker krijgt nu de jaartallen van de objecten te zien, en krijgt feedback over zijn gegeven antwoord.
Ook komen de links om de objecten in de collectie te bekijken beschikbaar.
Wanneer de gebruiker het juiste antwoord heeft gegeven, gaat zijn score omhoog en is er een button beschikbaar waarmee hij naar de volgende vraag kan.
Gaf de gebruiker het verkeerde antwoord, dan eindigt het spel en is er een button beschikbaar waarmee hij het spel opnieuw kan starten.

## Gebruikte data
In de applicatie wordt data opgehaald uit de collectie database van het NMVW. Hiervoor gebruik ik een SPARQL query die objecten ophaalt die aan vooraf opgestelde voorwaarden voldoen.
Die voorwaarden zijn als volgt:
* Het betreft een fysiek object, geen "foto", "negatief", "dia" etc.
* Er is een foto van het object beschikbaar
* Er is een nederlandse titel beschikbaar
* Er is een uri beschikbaar
* Het herkomstjaar is beschikbaar en is een geheel getal (bijv. "1978")

## Credits
* [Hulp van Giovanni Kaaijk](https://github.com/GiovanniKaaijk)
* [Hulp van Kyle Bot](https://github.com/kylebot0)
* [Hulp van Sjoerd Beentjes (De Voorhoede)](https://www.voorhoede.nl/nl/)
