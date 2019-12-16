const Discord = require ("discord.js");
const fetch = require ("snekfetch");
const M = require ("../setup.json");
const prefix = M.prefix;

module.exports.run = async (client, msg, args) => {
	let users = args [0];
	let page = Number(args[1]);
	
	if (!users) return msg.channel.send ("Please input `accountID`and `Playername`");
	if (!page) return msg.channel.send ("Please input page 1 for the first page");
	
	fetch.get(M.host + "/bot/api/levelby.php?users=" + users + "&page=" + page).then ( r => {
		let body = r.body;
		
		if (!body.levels) return msg.channel.send ("That level is not available in page " + page);
		
		let embed = new Discord.RichEmbed ()
		.setTitle (body.users + "'s Levels")
		.setDescription (body.levels)
		.addField ("__More Command__", "**For next page** \n `" + prefix + "levelby " + users + " <page-num>`\n**For Check Level**\n`" + prefix + "level <id>`")
		msg.channel.send ({embed : embed});
	});
}
		
module.exports.help = {
	name: "levelby"
	}