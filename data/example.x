actor Console {
	Hashtable commands;
	string currentDrive;
	
	onStart() {
		currentDrive = "ram0";
		commands = new Hashtable();
		commands.add("help", new HelpCommand());
		commands.add("cls", new ClearScreenCommand());
		commands.add("changes", new ChangelogCommand());
		commands.add("charmap", new CharmapCommand());
		commands.add("hello", new HelloCommand());
		commands.add("reboot", new RebootCommand());
		commands.add("tasks", new TasksCommand());
		commands.add("ruben", new RubenCommand());
		
		write("$CR$$CR$$FG,GREEN$$TX+CX,\"ttOS " + VERSION + "\"$$FG,BLACK$$CR$");
		write("$FG,GREEN$$TX+CX,\"Copyright (C) 2016-2018, Dennis Seller\"$$FG,BLACK$$CR$");
		
		writePrompt();
	}
	
	@receive(ConsoleCommand msg) {
		if (msg.line.length > 0)
		{
			if (msg.line.startsWith("eval")) {
				var spaceIdx = msg.line.find(" ");
				if (spaceIdx != null) {
					var cmd2 = msg.line.substring(spaceIdx + 1);
					X.Evaluate(cmd2);
				}
				
				return;
			}
		
			var cmd = commands.get(msg.line);
			if (cmd == null) {
				write("$FG,RED$Command '" + msg.line + "' not recognized.\n $FG$");
			} else {
				cmd.run(this);
			}
		}
		
		writePrompt();
	}
	
	writePrompt() { write("$FG,LGRAY$" + currentDrive + "> $FG,BLACK$"); }
	
	write(var txt) {
		LogHelper.log("Console", txt);
	}
}
