//Create text to speech object.
var TTS = {
    speak: function(inputText){//Define function getting & playing TTS
	var speechText = "<voice>" + inputText;
	$.panelsocketserver.alertImage(speechText);
    }
};

//Adding text to speech to PhantomBot
(function(){
    var currency = null;
    //Define function calling tts.
    function speak(textToSpeak){
	TTS.speak(textToSpeak);
    }
    /**
     * @event command
     */
    $.bind('command',function(event){
    	//Define cost of shouting and current amount of currency:
	    var sender = event.getSender().toLowerCase(),
	    	cost = $.getSetIniDbNumber('tts', 'cost', 5),
	    	points_sender = $.inidb.get('points', sender);

    	if (points_sender >= cost) {
			var sender = event.getSender(),
				command = event.getCommand(),
				concatedArgs = "",
				allArgs = event.getArgs();

			concatedArgs +=  sender + ": ";
	        for (i = 0; i < allArgs.length; i++){
	            concatedArgs += allArgs[i].replace(",", "") + " ";
	        }
		    inputText = concatedArgs;
			//Check command.
			if (command.equalsIgnoreCase('tts')){
				$.inidb.decr('points', sender, cost);
				speak(inputText);
			}
	    } else {
	    	currency = $.getPointsString(points_sender);

	    	$.say(sender+' Sorry but you don\'t have enough '+currency+' for text to speech.');
	    }

	    if (command.equalsIgnoreCase('ttscost')) {
            var action = parseInt(allArgs[0]);
            if (!isNaN(action)) {
                $.setIniDbNumber('tts', 'cost', action)
                chance = action;
                $.say('tts cost has been set to '+action);
            }
        }
    });
	//Register command.
	$.bind('initReady',function(){
	    if($.bot.isModuleEnabled('./systems/speakSystem.js')){
			$.registerChatCommand('./systems/speakSystem.js','tts',7);
			$.registerChatCommand('./systems/speakSystem.js','ttscost',7);
	    }
	});
})();
