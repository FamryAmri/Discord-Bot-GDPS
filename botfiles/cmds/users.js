const Discord = require ('discord.js');
const fetch = require ('snekfetch');
const M = require('../setup.json');

module.exports.run = async (client, msg, args) => {
	let sms = await msg.channel.send ("Searching, Please wait");
	
	let query = msg.content.slice((M.prefix + "users").length + 1);
		fetch.get(M.host + "/bot/api/accounts.php?ID=" + query).then( ac => {
			let acc = ac.body;
		sms.delete ();
		if (!query) return msg.channel.send ("Give me the `AccountID` or `Playername`");
		if (acc.msg) return msg.channel.send ("Sorry, Not Found");
		
		let embed = new Discord.MessageEmbed()
		.setAuthor ("Stats of " + acc.user)
		.setDescription (
acc.stars + "\n" + acc.demon + "\n" + acc.S_Coins + "\n" + acc.CP )
        .addField ("Social", acc.ytURL + "\n" + acc.twitter + "\n" + acc.twitch )
        .addField ( "__Ban Stats__",  "Leaderboard Ban: " + acc.Ban + "\n" + "CP Ban: "  + acc.cpBanned, true)
        .addField ("__Other Stats__" , "Admin Server: **" + acc.Admin + "**\nModerator: **" + acc.stat + "**" + acc.mod , true)
		.setFooter ("AccountID: " + acc.id + " | Registered at: " + acc.register)
		msg.channel.send({embed: embed});
	});
}
		
module.exports.help = {
	name: "users"
	}