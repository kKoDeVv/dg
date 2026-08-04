//const encText = document.getElementById("msg");
const encKey = document.getElementById("keyInput");
const checkBox = document.getElementById("switchCheckBox")
//const encOutput = document.getElementById("encOutput");
//const decText = document.getElementById("decText");
//const decKey = document.getElementById("keyToDec");
//const decOutput = document.getElementById("decOutput");
var usrWantsEnc = true;
checkBox.checked = true;
encKey.disabled = false;



function switchEncrypt() {
    if (usrWantsEnc) {
        checkBox.checked = false;
        usrWantsEnc = false;
        encKey.disabled = true;
    }
    else{
        checkBox.checked = true;
        usrWantsEnc = true;
        encKey.disabled = false;
    }
}



var ascii = [];
for (var i = 32; i <= 126; i++)
{
    ascii += String.fromCharCode( i );
}

function enc(plainText) {
    var plainKey = encKey.value;

    var numedText = [];
    var numedKey = [];
    for (let i of plainText) {
        numedText.push(ascii.indexOf(i));
    }
    for (let i of plainKey) {
        numedKey.push(ascii.indexOf(i));
    }

    var encNumedText = [];
    var lenNumedKey = numedKey.length;
    var key = 0;
    for (let i of numedText) {
        if (key == lenNumedKey) {
            key = 0;
        }
        if (i + numedKey[key] <= 94) {
            encNumedText.push(i + numedKey[key]);
        }
        else {
            encNumedText.push(i + numedKey[key] - 94);
        }
        key += 1;
    }

    var encTextList = []
    for (let i of encNumedText) {
        encTextList.push(ascii[i]);
    }

    var encTextOutput = ""
    for (let i of encTextList) {
        encTextOutput += i
    }

    return(encTextOutput);
}



function dec(id, plainKey) {
    plainText = document.getElementById("message" + id).innerHTML;
    console.log("message" + id)

    var numedText = [];
    var numedKey = [];
    for (let i of plainText) {
        numedText.push(ascii.indexOf(i));
    }
    for (let i of plainKey) {
        numedKey.push(ascii.indexOf(i));
    }

    var decNumedText = [];
    var lenNumedKey = numedKey.length;
    var key = 0;
    for (let i of numedText) {
        if (key == lenNumedKey) {
            key = 0;
        }
        if (i - numedKey[key] >= 0) {
            decNumedText.push(i - numedKey[key]);
        }
        else {
            decNumedText.push(i - numedKey[key] + 94);
        }
        key += 1;
    }

    var decTextList = []
    for (let i of decNumedText) {
        decTextList.push(ascii[i]);
    }

    var decTextOutput = ""
    for (let i of decTextList) {
        decTextOutput += i
    }

    document.getElementById("decOutput" + id).innerHTML = decTextOutput;
}