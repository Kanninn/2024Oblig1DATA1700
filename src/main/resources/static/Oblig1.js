
function validerAntall(input){
    if (isNaN(input.value)){
        input.setCustomValidity("Skriv inn et tall");//Skriver feilmelding
    }
    else {
        input.setCustomValidity("");//Tar bort feilmeldigen dersom tall er skrebet inn
    }
}

var fornavnet ="";
function validerFornavn(input){

    var inn = document.getElementById("fornavn").value;

    if (inn.length > 1){
        fornavnet = inn;
    }
}
function validerEtternavn(input){

    var inn = document.getElementById("etternavn").value;

    if (inn.length > 1){
        fornavnet = inn;
    }
}

//---------------------------Epost-------------------------------------
var epostFeil ="";
document.getElementById("epost").addEventListener("blur", function () {
    var input = this.value;
    var feilmelding = document.getElementById("feil-melding");

    var regex = /@/;
    if (!regex.test(input)){
        if (!feilmelding){
            feilmelding = document.createElement("div");
            feilmelding.id = "feil-melding";
            feilmelding.textContent="bruk en riktig epost";
            feilmelding.style.color="red";
            feilmelding.style.fontSize="12px";
            this.parentNode.appendChild(feilmelding);
            epostFeil = "1";
        }
    } else{
        if (feilmelding){
            feilmelding.remove();
            epostFeil="0";
        }
    }

});
//--------------------------------Telefon------------------------------------------------------------
var telefonFeil="";
document.getElementById("telefon").addEventListener("blur", function (){
    var input = this.value;
    var feilmelding = document.getElementById("feil-melding")

    var regex = /^\d{8}$/
    if (!regex.test(input)){
        if (!feilmelding){
            feilmelding = document.createElement("div");
            feilmelding.id = "feil-melding";
            feilmelding.textContent="Bruk et riktig mobilnummer";
            feilmelding.style.color="orange";
            feilmelding.style.fontSize="12px";
            this.parentNode.appendChild(feilmelding);
            telefonFeil ="1";
        }
    } else{
        if (feilmelding){
            feilmelding.remove();
            telefonFeil="0"
        }
    }
});
//-------------------------------------------------Biletter---------

var bilettsammling = []; //arrayet som lagrer bilett objektene

function leggeTilBiletter(){
    var innFilm = document.getElementById("valg").value;
    var innantall = document.getElementById("antall").value;
    var innFornavn = document.getElementById("fornavn").value;
    var innEtternavn = document.getElementById("etternavn").value;
    var innEpost = document.getElementById("epost").value;
    var innTelefon = document.getElementById("telefon").value;

    /* Sjekker om alle feltene har noe i seg */


    if (innFilm ==="-Velg en Film-"){
        document.getElementById("errorValg").textContent="Velg en Film";
        return;
    } else {
        document.getElementById("errorValg").textContent="";
    }

    if (innantall=== ""){
        document.getElementById("error1").textContent = "Dette feltet kan ikke være tomt";
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

//dette gjør at man kan skrive inn enten en epost eller mobilnummer og ikke må ha begge, siden man kun trenger en måte å kontakte kjøoeren på
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



    var biletten = {
        bfilm : innFilm,
        bantall : innantall,
        bfornavn : innFornavn,
        betternavn : innEtternavn,
        bepost : innEpost,
        btelefon : innTelefon
    };
    bilettsammling.push(biletten)

    skrivUtBilett();
}

function skrivUtBilett(){
        var inhold = document.getElementById("arrayut");
        var utTekst ="";

        bilettsammling.forEach(function (biletten, index){
            utTekst += "Bilett " + (index + 1) + ": " + biletten.bfilm + biletten.bantall + biletten.bfornavn + biletten.betternavn + biletten.bepost + biletten.btelefon + "<br>";
        });
        inhold.innerHTML = utTekst;
}
