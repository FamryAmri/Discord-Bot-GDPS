const Discord = require ("discord.js");
const fetch = require ("snekfetch");
const M = require ("../setup.json");
const prefix = M.prefix;

module.exports.run = async (client, msg, args) => {
	let users = msg.content.slice((prefix + "levelby " + args[0]).length + 1);
	let page = args[0];
	
	if (isNaN(page)) return msg.channel.send("Please enter a number. not a letters");
	if (!users) return msg.channel.send ("Please input `accountID`and `Playername`");
	
	fetch.get(M.host + "/bot/api/levelby.php?users=" + users + "&page=" + page).then ( r => {
		let body = r.body;
		
		if (!body.levels) return msg.channel.send ("That level is not available in page " + page + "\nor maybe didnt have yet");
		
		let embed = new Discord.MessageEmbed ()
		.setTitle (body.users + "'s Levels")
		.setDescription (body.levels)
		.addField ("__More Command__", "**For next page** \n `" + prefix + "levelby " + users + " <page-num>`\n**For Check Level**\n`" + prefix + "level <id>`")
		msg.channel.send ({embed : embed});
	});
}
		
module.exports.help = {
	name: "levelby"
	}