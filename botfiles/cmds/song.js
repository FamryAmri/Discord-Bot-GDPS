const Discord = require ("discord.js");
const fetch = require ("snekfetch");
const M = require ("../setup.json");

module.exports.run = async (client, msg, args) => {
	let sms = await msg.channel.send ("Searching, Please wait");
	fetch.get (`${M.host}` + '/bot/api/song.php').then ( s => {
		let body = s.body;
		let id = args[0];
		sms.delete ();
		let entry = body.find (post => post.id === id) || body.find (post => post.name === id);
		if (!id) return msg.channel.send ("Give me the `Song ID` or `Song Name`");
		if (!entry) return msg.channel.send ("This song is not exist");

		let embed = new Discord.MessageEmbed ()
		.setTitle("Information Song")
		.setDescription ("ID Song: **" + entry.id + "**\n" + "Name: **" + entry.name + "**\n" + "Size: **" + entry.size + "**\n" + entry.download )
		.addField ("Stats Of Song" , "This song is **" + entry.Info + "**" )
		msg.channel.send ({ embed : embed});
	});
}
	
module.exports.help = {
	name: "song"
}