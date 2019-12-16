const fetch = require ("snekfetch");
const Discord = require ("discord.js");
const M = require ("../setup.json");

module.exports.run = async (client, msg, args) => {
	
	let lvl = args[0];
	let page = Number (args[1]);
	let host = M.host + "/bot/api/leveltop.php?id=" + lvl + "&page=" + page;
	if (!lvl) return msg.channel.send ("Try this command `" + M.prefix + "leveltop` `<level-id>` `<page-num>`");
	if(!page) return msg.channel.send ("Please input page `1` for first page");

	fetch.get (host).then ( level => {
		let body = level.body;
		
		if (!body.top) return msg.channel.send ("This not played or maybe not found!");
		
		let embed = new Discord.RichEmbed ()
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
		
	