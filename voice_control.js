/*

The code here is horrible and should not be taken
as an example. It had been written only for demostrating purposes.


*/



if ('speechSynthesis' in window) {
    console.log("speechSynthesis is supported.");
} else {
    $("#unsupported").show(0);
    console.log("speechSynthesis is NOT supported.");
}

const VOICES = window.speechSynthesis.getVoices();

if (annyang) {
    var commands = {
        "logout": function() {
            if (STATE > 0) {
                speak("Logging out. Good bye");
                setTimeout(function(){
                    window.location = "https://ca357.koltunm.com/";
                }, 1300);
            } else {
                speak("Please log in first.");
            }
        },
        "help": function() {
            if (STATE > 0) {
                speak("To select an account, use the command SELECT. For example, SELECT CURRENT.");
                speak("To obtain specific information, either select the account, or, use command GET, followed by a name of the account and, desired piece of information. For example, GET CURRENT BALANCE. or, GET SAVING IBAN.");
            } else {
                speak("Please log in first.");
            }
        },
        "list commands": function() {
            if (STATE > 0) {
                speak("Select. Get. Logout. Commands List. And Help");
            } else {
                speak("Please log in first.");
            }
        },
        "get current balance": function() {
            if (STATE > 0) {
                var change = getChange($("#current-amount").text());
                speak("Balance of the current account is " + change.euros + " euro, and " + change.cents + " cents.");
            }
        },
        "get current bic": function() {
            if (STATE > 0) {
                speak("Your current BIC number is ");
                speakSlow(join($("#detail-bic").text()));
            }
        },
        "get current BIC": function() {
            if (STATE > 0) {
                speak("Your current BIC number is ");
                speakSlow(join($("#detail-bic").text()));
            }
        },
        "get current account number": function() {
            if (STATE > 0) {
                speak("Your current account number is ");
                speakSlow(join($("#detail-accnum").text()));
            }
        },
        "get current IBAN": function() {
            if (STATE > 0) {
                speak("Your current IBAN number is ");
                speakSlow(join($("#detail-iban").text()));
            }
        },
        "get current iban": function() {
            if (STATE > 0) {
                speak("Your current IBAN number is ");
                speakSlow(join($("#detail-iban").text()));
            }
        },
        "get current overdraft": function() {
            if (STATE > 0) {
                var change = getChange($("#detail-overdraft").text());
                speak("Your current overdraft is " + change.euros + " euro.");
            }
        },
        "get current last transaction": function() {
            if (STATE > 0) {
                var change = getChange($("#trans1-amount").text());
                speak("Your last transaction was " + $("#trans1-name").text() + " of " + change.euros + " euro, and " + change.cents + " cents.");
            }
        },
        "get balance": function() {
            if (STATE > 1) {
                var change = getChange($("#current-amount").text());
                speak("Balance of the current account is " + change.euros + " euro, and " + change.cents + " cents.");
            }
        },
        "get BIC": function() {
            if (STATE > 1) {
                speak("Your current BIC number is ");
                speakSlow($("#detail-bic").text());
            }
        },
        "get account number": function() {
            if (STATE > 1) {
                speak("Your current account number is ");
                speakSlow($("#detail-accnum").text());
            }
        },
        "get IBAN": function() {
            if (STATE > 1) {
                speak("Your current IBAN number is ");
                speakSlow($("#detail-iban").text());
            }
        },
        "get overdraft": function() {
            if (STATE > 1) {
                speak("Your current overdraft is " + $("#detail-overdraft").text() + " euro.");
            }
        },
        "get last transaction": function() {
            if (STATE > 1) {
                var change = getChange($("#trans1-amount").text());
                speak("Your last transaction was " + $("#trans1-name").text() + " of " + change.euros + " euro, and " + change.cents + " cents.");
            }
        },
        "get saving balance": function() {
            if (STATE > 0) {
                var change = getChange($("#saving-amount").text());
                speak("Balance of the saving account is " + change.euros + " euro, and " + change.cents + " cents.");
            }
        },
        "get credit balance": function() {
            if (STATE > 0) {
                var change = getChange($("#credit-amount").text());
                speak("Balance of the credit account is " + change.euros + " euro, and " + change.cents + " cents.");
            }
        },
        "select current": function() {
            if (STATE > 0) {
                gotoDetail();
                speak("Current Account Selected.");
            }
        },
        "select saving": function() {
            if (STATE > 0) {
                speak("Unfortunately, at this moment, only the current account is supported.");
            }
        },
        "select credit": function() {
            if (STATE > 0) {
                speak("Unfortunately, at this moment, only the current account is supported.");
            }
        }
    };

    annyang.addCommands(commands);
    annyang.start();
}

function join(string) {
    var ret = "";
    for (var i = 0; i < string.length; i++) {
        ret += string[i] + ", ";
    }
    return ret;
}
function getChange(string) {
    var float = parseFloat(string);
    var euros = Math.trunc(float);
    console.log(euros);
    var cents = Math.round((Math.abs(float) - Math.abs(euros)) * 100)
    return {
        euros: euros,
        cents: cents
    }
}
function speak(message) {
    var msg = new SpeechSynthesisUtterance();
    msg.voice = VOICES[4];
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 0.9; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.lang = 'en-US';
    msg.text = message;
    window.speechSynthesis.speak(msg);
}
function speakSlow(message) {

    var msg = new SpeechSynthesisUtterance();
    msg.voice = VOICES[4];
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 0.45; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.lang = 'en-US';
    msg.text = message;
    window.speechSynthesis.speak(msg);
}
