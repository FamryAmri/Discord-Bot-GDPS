const fetch = require ("snekfetch");
const Discord = require ("discord.js");
const M = require ("../setup.json");
const prefix = M.prefix;

module.exports.run = async (client, msg, args) => {
	let level = msg.content.slice((prefix + "levelsearch " + args[0]).length + 1);
	let page = args[0];
	
	if (!page) return msg.channel.send ("Please input page 1 for first page!");
	if (!level) return msg.channel.send ("Please input search query to find level");
	
	fetch.get (M.host + "/bot/api/lvlquery.php?query=" + level + "&page=" + page).then ( lvl => {
		let find = lvl.body;
		
		if (!find.query) return msg.channel.send ("Your search query is not found");
		let embed = new Discord.MessageEmbed ()
		.setTitle (":mag_right: Search Query for " + level)
		.setDescription (find.query)
		.addField ("__More Commands__", "**For next page**\n`" + prefix + "levelsearch <query> <page-num>`\n" + "**For Check Level**\n`" + prefix + "level <id>`")
		msg.channel.send ({embed : embed});
	});
}

module.exports.help = {
	name: "levelsearch"
	}