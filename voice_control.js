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
                window.location = "https://ca357.koltunm.com/";
            }
        },
        "balance current": function() {
            if (STATE > 0) {
                var change = getChange($("#current-amount").text());
                speak("Balance of the current account is " + change.euros + " euro, and " + change.cents + " cents.");
            }
        },
        "select current": function() {
            if (STATE > 0) {
                gotoDetail();
                speak("Current Selected.");
            }
        },
        "select saving": function() {
            if (STATE > 0) {
                speak("Unfortunately, the current account is only supported at this moment.");
            }
        },
        "select credit": function() {
            if (STATE > 0) {
                speak("Unfortunately, the current account is only supported at this moment.");
            }
        },
        "get BIC": function() {
            if (STATE > 1) {
                speak("Your BIC number is ");
                speakSlow($("#detail-bic").text());
            }
        },
        "BIC current": function() {
            if (STATE > 0) {
                speak("Your BIC number is ");
                speakSlow($("#detail-bic").text());
            }
        }

    };

    annyang.addCommands(commands);
    annyang.start();
}

function getChange(string) {
    var float = parseFloat(string);
    var euros = Math.trunc(float);
    var cents = Math.round((Math.abs(float) - euros) * 100)
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
    msg.rate = 0.3; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.lang = 'en-US';
    msg.text = message;
    window.speechSynthesis.speak(msg);
}
