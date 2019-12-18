const M = require("./setup.json");
const status = M.statusbot;
const action = M.actionbot;
const Discord = require("discord.js");
const client =  new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
const typefiles = "js";
console.log ("Logining");

fs.readdir("./cmds/", (err, files) => {
	if (err) console.error (err)
	let jsfiles = files.filter(f => f.split (".").pop() === typefiles);
	if (jsfiles.length <= 0) {
		return;
		
}
        jsfiles.forEach (( f, i ) => {
        let props = require (`./cmds/${f}`);
        client.commands.set (props.help.name, props);
   });
});


client.on ("ready", async () => {
	console.log ("Done, Login as " + client.user.username + " with token (" + M.token + ")");
	client.user.setStatus(status);
	client.user.setPresence({
		game: {
		name: 'GDPS | ' + M.prefix + 'help',
		type: action
		}
	});
	
//Remove (/*) and (*/) to generate invite bot

	/*try { let link = await client.generateInvite(["ADMINISTRATOR"]);
		console.log("Invite me: " + link);
		} catch(err) {
			console.log(err.stack);
			}*/
	});
	
	
client.on ('message', async msg => {
	if(msg.author.bot) return;
	if (msg.channel.type === "dm") return;
	
	let msgArray = msg.content.split (" ");
	let command = msgArray[0];
	let args = msgArray.slice(1);

if (!command.startsWith(M.prefix)) return;

let cmd = client.commands.get(command.slice (M.prefix.length));
if (cmd) cmd.run (client, msg, args);
	
});
	
client.login(M.token);