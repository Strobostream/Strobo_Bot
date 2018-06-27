(function() {
	var colors = ['rouge', 'orange', 'jaune', 'vert', 'cyan', 'bleu', 'violet', 'rose'];
	
	function isInTable(item,table)
	{
		var isIncluded = false;
		for (i=0; i<table.length; i++)
		{
			if (item == table[i]) 
			{
				isIncluded = true;
				break;
			}
		}
		return isIncluded;
	}
	
	
	$.bind('command', function(event) {
		var command = event.getCommand(),
			sender = event.getSender(),
			args = event.getArgs();
			
			if (command.equalsIgnoreCase('couleur')) {
				if (args.length == 1 && isInTable(args[0], colors))
					{
						$.say(sender + ' a changé la couleur de fond en ' + args[0]);
						return;
					}
				else 
					{
						$.say($.whisperPrefix(sender) + 'Usatilisation: !couleur + une des couleurs suivantes :  rouge, orange, jaune, vert, cyan, bleu, violet, rose.');
						$.returnCommandCost(sender, command);
					}

				}
			});
	
	$.bind('initReady', function() {
        $.registerChatCommand('./custom/color.js', 'couleur', 7);
    });
}) ();