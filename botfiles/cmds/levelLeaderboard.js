const fetch = require ("snekfetch");
const Discord = require ("discord.js");
const M = require ("../setup.json");

module.exports.run = async (client, msg, args) => {
	
	let lvl = args[0];
	let page = args[1];
	let host;
	if (!lvl) return msg.channel.send ("Try this command `" + M.prefix + "leveltop` `<level-id>` `<page-num>`");
	if (page){
		host = M.host + "/bot/api/leveltop.php?id=" + lvl + "&page=" + page;
		if (isNaN(page)) return msg.channel.send("Please enter a number. not a letters");
		} else {
			host = M.host + "/bot/api/leveltop.php?id=" + lvl;
			}

	fetch.get (host).then ( level => {
		let body = level.body;
		
		if (body.msg) return msg.channel.send("Level not found");
		if (!body.top) return msg.channel.send ("This not played or maybe not found!");
		
		let embed = new Discord.MessageEmbed ()
		.setTitle (":bar_chart: Leaderboard from Level " + body.levelname)
		.addField("Top " + body.topTo , body.top)
		.addField ("More Command", "`" + M.prefix + "` `leveltop` `" + lvl + "` `<page-num>`\n`" + M.prefix + "` `level` `" + lvl + "`")
		.setFooter ("Now Page = " + body.page)
		msg.channel.send ({embed : embed});
		});
	}

module.exports.help = {
	name: "leveltop"
	}
		
	