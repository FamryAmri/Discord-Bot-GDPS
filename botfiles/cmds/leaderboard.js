const Discord = require ("discord.js");
const fetch = require ("snekfetch");
const M = require ("../setup.json");
const http = M.host + "/bot/api/leaderboard.php";

module.exports.run = async (client, msg, args) => {
	
	let page = args[1];
	let type = args[0];
	
	if (!type) return msg.channel.send ("Try this command `" + M.prefix + "leaderboard` `stars` `1`");
	if (page){
		if (isNaN(page)) return msg.channel.send ("Please enter a number. not a letters");
		}
	//if (isNaN(!type)) return msg.channel.send ("Invalid ID");
	
	let fetchhost;
	if (page){
		fetchhost = http + "?in=" + type + "&page=" + page;
		} else {
			fetchhost = http + "?in=" + type;
			}
	
	fetch.get (fetchhost).then( r => {
    let body = r.body;
	if (!body) return msg.channel.send ("Please use `stars` or `demon`");
	if (!body.top) return msg.channel.send ("Page leaderboard `" + type + "` is not found");
	
	let embed = new Discord.MessageEmbed ()
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