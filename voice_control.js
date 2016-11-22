if (annyang) {
    var commands = {
        "tell a joke": function() {
            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            msg.voice = voices[4]; // Note: some voices don't support altering params
            msg.voiceURI = 'native';
            msg.volume = 1; // 0 to 1
            msg.rate = 0.8; // 0.1 to 10
            msg.pitch = 2; //0 to 2
            msg.text = 'Adrian is a dope!';
            msg.lang = 'en-US';
            window.speechSynthesis.speak(msg);
        }
    };

    annyang.addCommands(commands);
    annyang.start();
}
