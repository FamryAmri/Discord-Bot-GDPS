const Discord = require ("discord.js");
const fetch = require ("snekfetch");
const M = require ("../setup.json");
const http = M.host + "/bot/api/leaderboard.php";

module.exports.run = async (client, msg, args) => {
	
	let page = Number(args[1]);
	let type = args[0];
	
	if (!type) return msg.channel.send ("Try this command `" + M.prefix + "leaderboard` `stars` `1`");
	if (!page) return msg.channel.send ("Please input page `1` for first page");
	if (isNaN(!type)) return msg.channel.send ("Invalid ID");
	
	fetch.get (http + "?in=" + type + "&page=" + page).then( r => {
	     let body = r.body;
	if (!body) return msg.channel.send ("Please use `stars` or `demon`");
	if (!body.top) return msg.channel.send ("Page leaderboard `" + type + "` is not found");
	
	let embed = new Discord.RichEmbed ()
	.setTitle("Leaderboards of " + body.type )
	.addField ("Top " + body.topTo , body.top)
	.addField ( "__For Next Page__ ", "`" + M.prefix + "leaderboard " + type + " <page-num> `")
	.setFooter ("Now Page = " + body.page)
	msg.channel.send ({embed: embed});
	});
}
module.exports.help = {
	name: "leaderboard"
	}