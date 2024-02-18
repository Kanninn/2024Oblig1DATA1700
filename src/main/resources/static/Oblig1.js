
// denne funksjonen skjekker om tallet som er satt inn er et tall (isNan) og skriver ut feilmeldig, som blir tatt bort dersom  feilen opphees.
function validerAntall(input){
    if (isNaN(input.value)){
        input.setCustomValidity("Skriv inn et tall");//Skriver feilmelding
    }
    else {
        input.setCustomValidity("");//Tar bort feilmeldigen dersom tall er skrebet inn
    }
}
//Denne funksjonen sjekker valider om fronavnet har mer en en bokstav, her kunne man også sjekket etter tall med "if (/\d/.test(inn)) {" men det er noen navn eller kallenavn som innheolder tall, så jeg bestmete meg mot det
var fornavnet ="";
function validerFornavn(input){

    var inn = document.getElementById("fornavn").value;

    if (inn.length > 1){
        fornavnet = inn;
    }
}
// denne funksjonenn sjekker det samme som den over, om det er mer enn 1 bokstav i navnet
function validerEtternavn(input){

    var inn = document.getElementById("etternavn").value;

    if (inn.length > 1){
        fornavnet = inn;
    }
}

//---------------------------Epost-------------------------------------
var epostFeil ="";//innitialiserer epostFeil som global variabel, slik at den kan bli sett av alle deler av programmet
document.getElementById("epost").addEventListener("blur", function () {//kobler ellementet epost og blur gjør at funksjoen først går når man har forlatt innput feltet
    var input = this.value;
    var feilmelding = document.getElementById("feil-melding");
//
    var regex = /@/;//her brukes regex til å teste for om det er et alfakrøll i infputten fra brukern
    if (!regex.test(input)){
        if (!feilmelding){
            feilmelding = document.createElement("div");
            feilmelding.id = "feil-melding";
            feilmelding.textContent="bruk en riktig epost";
            feilmelding.style.color="red";
            feilmelding.style.fontSize="12px";
            this.parentNode.appendChild(feilmelding);
            epostFeil = "1";//dersom regex testen er positiv vil alt dette skje, med feilmelding og oppdatering av variablen
        }
    } else{
        if (feilmelding){
            feilmelding.remove();
            epostFeil="0";
        }
    }

});
//--------------------------------Telefon------------------------------------------------------------
var telefonFeil="";//Golobal variabel initialiseres
document.getElementById("telefon").addEventListener("blur", function (){//samme som i epost
    var input = this.value;
    var feilmelding = document.getElementById("feil-melding")
//her brukes regex for å teste om det er minst 8 tall i inpuetet, siden alle norske mobilnummre har minst 8 tall
    var regex = /^\d{8}$/
    if (!regex.test(input)){
        if (!feilmelding){
            feilmelding = document.createElement("div");
            feilmelding.id = "feil-melding";
            feilmelding.textContent="Bruk et riktig mobilnummer";
            feilmelding.style.color="orange";
            feilmelding.style.fontSize="12px";
            this.parentNode.appendChild(feilmelding);
            telefonFeil ="1";//dersom regex testen er positiv vil alt over skje
        }
    } else{
        if (feilmelding){
            feilmelding.remove();//dersom brukern retter opp feilen vil feilmeldingen går bort
            telefonFeil="0"
        }
    }
});
//-------------------------------------------------Biletter---------

var bilettsammling = []; //arrayet som lagrer bilett objektene

//funksjonen henter det brukeren skrev inn og mellom lagrer det i "inn" variablene
function leggeTilBiletter(){
    var innFilm = document.getElementById("valg").value;
    var innantall = document.getElementById("antall").value;
    var innFornavn = document.getElementById("fornavn").value;
    var innEtternavn = document.getElementById("etternavn").value;
    var innEpost = document.getElementById("epost").value;
    var innTelefon = document.getElementById("telefon").value;

    /* Sjekker om alle feltene har noe i seg, for å fange opp dersom brukeren har glemt å fylle inn et felt, da kommer en egen feilmelding fra hvis det er fylt inn feil
    * dette funkjer ganske likt på alle, man skekker om "inn" variablen er lik noe den ikke er med === og setter så en feil melding eller ingen ting */


    if (innFilm ==="-Velg en Film-"){
        document.getElementById("errorValg").textContent="Velg en Film";
        return;
    } else {
        document.getElementById("errorValg").textContent="";
    }

    if (innantall=== "" || innantall <=0){
        document.getElementById("error1").textContent = "Ugyldig antall biletter";
        return;
    } else {
        document.getElementById("error1").textContent="";
    }
    if (innFornavn=== ""){
        document.getElementById("error2").textContent = "Dette feltet kan ikke være tomt";
        return;
    } else {
        document.getElementById("error2").textContent="";
    }
    if (innEtternavn=== ""){
        document.getElementById("error3").textContent = "Dette feltet kan ikke være tomt";
        return;
    } else {
        document.getElementById("error3").textContent="";
    }

//gjennom å ogaå sjekke om det er en epostfeil i telefonfeilen slik det er gjort her, holder det å skrive inn enten en epost eller mobilnummer og man må ikke ha begge, siden man kun trenger en måte å kontakte kjøoeren på
    if (innEpost=== "" || epostFeil==="1"){
        if (innTelefon=== ""){
            document.getElementById("error4").textContent = "Skriv inn riktig info eller fyll ut";
            return;
        } else {
            document.getElementById("error4").textContent="";
        }
    } else {
        document.getElementById("error4").textContent="";
    }

//samme som ved sjekken over
    if (innTelefon=== "" || telefonFeil==="1"){
        if (innEpost=== ""){
            document.getElementById("error5").textContent = "Skriv inn riktig info eller fyll ut";
            return;
        } else {
            document.getElementById("error5").textContent="";
        }
    } else {
        document.getElementById("error5").textContent="";
    }


//lopprettet objektet og setter inn alle verdiene som brukeren har satt inn
    var biletten = {
        bfilm : innFilm,
        bantall : innantall,
        bfornavn : innFornavn,
        betternavn : innEtternavn,
        bepost : innEpost,
        btelefon : innTelefon
    };
    bilettsammling.push(biletten)
    //"pusher" objektet til arrayet slik at billeten lagres

    skrivUtBilett();
}

//funksjonen kobbles til arrayut og bruker en forEach funksjon for å printe ut hvert elemet i objektet
function skrivUtBilett(){
        var inhold = document.getElementById("arrayut");
        var utTekst ="";

        bilettsammling.forEach(function (biletten, index){
            utTekst += "Bilett " + (index + 1) + ": " + biletten.bfilm +" " + biletten.bantall +" "+ biletten.bfornavn +" "+ biletten.betternavn +" "+ biletten.bepost +" "+ biletten.btelefon + "<br>";
        });
        inhold.innerHTML = utTekst;//teksten skrives ut i arrayut feltet
}


//-----------------------------Slette bilettene-----------------------------------------
//dersom knappen blir trykket og fuksjonen settes igang vil bilettsammling arrayet blir satt opp på nytt(tømt) og arrayut diven vil blå tømt for tekst
function SletteBilettene(){
    bilettsammling = [];
    arrayut.textContent="";
}
//ved merge ble denne fuknsjonen duplisert litt usikker på hvorfor, hvis du kan lese dette ble problemt løst.



