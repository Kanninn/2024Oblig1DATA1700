
function validerAntall(input){
    if (isNaN(input.value)){
        input.setCustomValidity("Skriv inn et tall");//Skriver feilmelding
    }
    else {
        input.setCustomValidity("");//Tar bort feilmeldigen dersom tall er skrebet inn
    }
}