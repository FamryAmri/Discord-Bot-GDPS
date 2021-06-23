require("dotenv/config");
const bot = require("./bot");
const M = require("./setup.json");
const app = require("express")();
const status = M.statusbot;
const action = M.actionbot;
const Discord = require("discord.js");
const client =  new Discord.Client();
const fs = require("fs");
const req = require("request");
client.commands = new Discord.Collection();
const typefiles = "js";

app.get("/", (req, res) => {
	res.send("OK");
	res.end();
	});

fs.readdir("./cmds/", (err, files) => {
	if (err) console.error (err)
	let jsfiles = files.filter(f => f.split (".").pop() === typefiles);
	if (jsfiles.length <= 0) return;
    jsfiles.forEach (( f, i ) => {
	    let props = require (`./cmds/${f}`);
	    client.commands.set (props.help.name, props);
	   });
});


client.on ("ready", async () => {
	console.clear();
	//this will start. if start.bat has been execute
	if (process.argv[2] == "ide-mode"){
		app.listen(process.env.PORT || process.env.SERVER_PORT || 8080);
		}
	console.log ("Login as " + client.user.username);
	client.user.setPresence({
		activity: {
			name: `GDPS | ${M.prefix}help`,
			type: action
			},
		status: status
		});
	if (!isNaN(M["channel"]["gdpsstatus"])) bot.gdpsstatus(client, M);
	if (!isNaN(M["channel"]["ratestatus"])) bot.ratenotif(client, M);
	
	if (process.env.GENERATE_INVITE_BOT == "true"){
		try { let link = await client.generateInvite(["ADMINISTRATOR"]);
			console.log("Invite me: " + link);
			} catch(err) {
				console.log(err.stack);
				}
			}
	});
	
	
client.on ('message', async msg => {
	if(msg.author.bot) return;
	
	let msgArray = msg.content.split (" ");
	let command = msgArray[0];
	let args = msgArray.slice(1);

	if (!command.startsWith(M.prefix)) return;

	if (msg.channel.type === "text"){
		let cmd = client.commands.get(command.slice (M.prefix.length));
		if (cmd) cmd.run (client, msg, args);
	} else if (msg.channel.type === 'dm'){
		let commandDM = command.slice(M.prefix.length);
		if (commandDM == 'upload'){
			let a024 = '.';
			if (msg.author.id == M.owner) a024 = ', please edit in setup.json and restart the bot';
			if (M.gdpsup.turn == "Off") return msg.channel.send(`This command has been blocked${a024}`);
			let uri = M.host + `/${M.gdpsup.directory}/`;
			if (!M.gdpsup.gdps) uri = M.gdpsup.directory;
			let attach = msg.attachments;
			let url = attach.first().url;
			let spliter = url.split('.')
			let slash = url.split('/')
			let filetype = spliter[spliter.length - 1]
			let title = slash[slash.length - 1].slice(0, 1 - (filetype.length + 2))
			
			// json post ready
			let requesting = {
				title: title,
				discord: process.env.GDPS_KEY,
				url: url,
				filetype: filetype,
				size: attach.first().size
			}
			req.post(uri + 'stuff.php', {
    			form: requesting
			},(err, res, body) => {
    			if (res.statusCode !==200) return msg.channel.send('Error: script not found/installed');
    			return msg.channel.send(body);
			});
		} else if (commandDM == 'ping') return msg.channel.send('Pong!');
	}
	});
	
client.login(process.env.BOT_TOKEN);
