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
keycard = new Discord.Collection();
const typefiles = "js";

function pass_session (id, pass, timexpire=30){
	keycard.set(id, pass);
	setTimeout (()=>{
		keycard.delete(id);
		console.log(keycard);
	}, timexpire * 1000);
}

//main function for gauntlets
async function setupG (uri, keycard){
	//check setup done
	req.get(`${uri}/bot/api/gauntlets.php?doing=1&keycard=${keycard}`, (err, res, body)=>{
		if (body == '-1') return;
	});
}

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
			} else if (commandDM == 'gauntlet'){
				let query = ''
				let lvls = ''
				let gaurun = false;
				
				if (args[0] == 'setup'){
					if (!args[1]) return msg.channel.send('Input password (`space` are not needed)');
					gaurun = true;
					query += `doing=1`
					query += `&keycard=${msg.author.id}`
				} else if (args[0] == 'add') {
					let idsgau = '';
					let type = [false, "Fire", "Ice", "Poison", "Shadow", "Lava", "Bonus", "Chaos", "Demon", "Time", "Crystal", "Magic", "Spike", "Monster", "Doom", "Death"];
					type.slice(1).forEach((str, index) => {
						idsgau += `${index + 1} = ${str}\n`
					});
					//idsgau.slice(0, idsgau.length - 1);
					if (!args[1]) return msg.channel.send('```'+idsgau+'```\nExample: `' + M.prefix + 'gauntlet '+args[0]+' <gauntlet id> <lvls>(1,2,3,4,5)`');
					if (!type[args[1]]) return msg.channel.send('Invalid ID');
					query += 'doing=3&'
					gaurun = true;
					query += `keycard=${keycard.get(msg.author.id) || "0"}&`
					query += `gauntid=${args[1]}&`
					lvls = args[2].split(',');
					query += `l1=${lvls[0]}&`
					query += `l2=${lvls[1]}&`
					query += `l3=${lvls[2]}&`
					query += `l4=${lvls[3]}&`
					query += `l5=${lvls[4]}`
					// console.log(query);
				} else if (args[0] == 'forgotpass') {
					return msg.channel.send('forgot password? please delete verify files at ' + `||${M.host}/bot/api/verify||\n and setup`)
				} else if (args[0] == 'changepass') {
					if (!args[1]) return msg.channel.send('Input password (`space` are not needed)');
					gaurun = true;
					query += 'doing=5&'
					query += `keycard=${keycard.get(msg.author.id) || "0"}&`
					query += `keycard1=${args[1]}`;
				} else if (args[0] == 'update') {
					let idsgau = '';
					let type = [false, "Fire", "Ice", "Poison", "Shadow", "Lava", "Bonus", "Chaos", "Demon", "Time", "Crystal", "Magic", "Spike", "Monster", "Doom", "Death"];
					type.slice(1).forEach((str, index) => {
						idsgau += `${index + 1} = ${str}\n`
					});
					//idsgau.slice(0, idsgau.length - 1);
					if (!args[1]) return msg.channel.send('```'+idsgau+'```\nExample: `' + M.prefix + 'gauntlet '+args[0]+' <gauntlet id> <level1=id,level5=id>`');
					if (!type[args[1]]) return msg.channel.send('Invalid ID');
					query += 'doing=4&'
					query += `gauntid=${args[1]}&`
					query += `query=${args[2]}&`
					query += `keycard=${keycard.get(msg.author.id) || "0"}`
				} else if (args[0] == 'show') {
					query +='doing=2&'
				} else if (args[0] == 'login'){
					if (args[1] == 'help') return msg.channel.send(`Example:\`\ ${M.prefix}gauntlet login <password> <time session in seconds: Optional>\`\ `);
					pass_session(msg.author.id, args[1], args[2] || 30);
					console.log(keycard);
					return msg.channel.send('Login session ready');
				} else {
					let helpgau = '__**HELP SECTIONS**__\n'
					//if (args[0] !=='help') helpgau += `\`\ ${M.prefix}gauntlet ${args[0]} \`\ is not found`
					helpgau +='use this command with gauntlet cmd\n`add,setup,login,<allcmd> help`'
					helpgau += '\nExample: `' + M.prefix + 'gauntlet add help`'; 
					return msg.channel.send(helpgau);
				}
				
				if (!keycard.has(msg.author.id)) return msg.channel.send('Your session login is end or not ready, please login with `' + `${M.prefix}gauntlet login <password>\`\ `);
				if (!gaurun) return;
				req.get(`${M.host}/bot/api/gauntlets.php?${query}`, (err, res, body)=>{
					console.log(body);
					if (body == '-1') return msg.channel.send("INFO: Setup is not ready, use this command for setup `" + `${M.prefix}gauntlet setup\`\ `);
					if (body == '-2') return msg.channel.send("INFO: You are not allowed to use it (Invalid)");
					if (body == '-3') return msg.channel.send("INFO: Added success");
					if (body == '-4') return msg.channel.send("INFO: Updated success");
					if (body == '-5') return msg.channel.send("INFO: Not exists");
					if (body == '-6') return msg.channel.send("INFO: Already exists");
					if (body == '-7') return msg.channel.send("INFO: success change password");
				});
			} else if (commandDM == 'ping') return msg.channel.send('Pong!');
		}	
	});
	
client.login(process.env.BOT_TOKEN);
