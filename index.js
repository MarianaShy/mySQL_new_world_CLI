

//import modules

const readline = require("readline");

const commandsController =  require("./controller")


// Display instructions on how to use each command

function instructions () {
	console.log('\x1b[33m', "                    Commands:");
	console.log('\x1b[38;2;255;165;0mcapital    <country>\x1b[0m \x1b[38;2;255;255;0m  ------------------------  \x1b[0m \x1b[38;2;173;216;230mGet the capital of the country;\x1b[0m');
	console.log('\x1b[38;2;255;165;0mlang       <region>\x1b[0m \x1b[38;2;255;255;0m   ------------------------  \x1b[0m \x1b[38;2;173;216;230mList all the languages spoken in the region;\x1b[0m');
	console.log('\x1b[38;2;255;165;0mspoken     <language>\x1b[0m \x1b[38;2;255;255;0m ------------------------  \x1b[0m \x1b[38;2;173;216;230mNumber of cities in which language is spoken;\x1b[0m');
	console.log('\x1b[38;2;255;165;0mcountries  <country>\x1b[0m \x1b[38;2;255;255;0m  ------------------------  \x1b[0m \x1b[38;2;173;216;230mFind countries with the same official language or in the same continent as a given country;\x1b[0m');

 }
 
instructions()

// call readline
 const rl = readline.createInterface(
	{input: process.stdin, 
	output: process.stdout});



rl.setPrompt("Your command: ");
rl.prompt();




//set functions to commands
rl.on("line", (input) => {
	let [command, ...arguments] = input.trim().split(" ");
	command = command.toUpperCase()
	

	try{
		if (command === "END") process.exit(0)
		else if (command === "COMMANDS") instructions()
		else {	
			commandsController(command, arguments)
		}
	}
	catch(error){
		console.error(error);
	}
} );



module.exports = instructions;