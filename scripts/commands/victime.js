//Autoload function
(function() {
	//command setup
	$.bind('command', function(event){
		var command = event.getCommand();
        var sender = event.getSender();
        var arguments = event.getArguments();
        var args = event.getArgs();
		
		
		//!lucky command settings
		if(command.equalsIgnoreCase('victime')){
			var name;
			var check = true;
			var message;
			var choosenArray = [];
			var amount = args[0];
			
			if(amount == undefined){
				amount = 1;
			}
			for(var i = 0; i < amount; i++){
				var count = 20; //Set trys befor break
				do{
					name = $.username.resolve($.randElement($.users)[0]);
					switch(true){
							//No Admin, Mod, Bot or Owner will be choosen
							case $.isAdmin(name):
							case $.isMod(name):
							case $.isBot(name):
							case $.isOwner(name):
								break;
							default:
								//make sure a Chatuser exists only once in Array list.
								var index = choosenArray.findIndex(function(nameExist){
									return nameExist == name;
								});
								if(index == -1){
									choosenArray.push(name);
								}
								else{
									break;
								}
								check = false;
								break;
					}
					
					//Break while if trys (count) reach 0
					//This happens if just Admin, Mod, Bot or Owner will be in chat
					count--;
					if(count == 0){
						break;
					}
				}while(check)
			}
			
			if(choosenArray.length == 0){
				message = "Aucune victime n'a été choisie!"; 
			}
			else{
				for(var i = 0; i < choosenArray.length; i++){
					if(i == 0){
						message = " - "+choosenArray[i];
					}
					else{
						message += " & "+choosenArray[i];
					}
					
				}
				
				var messageStart;
				switch(choosenArray.length){
					case 1:
						messageStart = "La nouvelle victime est :  ";
						break;
					default:
						messageStart = "Les nouvelle victimes sont :  ";
						break;
				}
				
				message = messageStart+message;
			}
			
			$.say(message);
		}
	});

	//register chat command
	$.bind('initReady', function(){
		$.registerChatCommand('./commands/victime.js', 'victime', 1);
	});
})();
