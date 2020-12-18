const Discord = require ("discord.js");
const fetch = require ("snekfetch");
const M = require ("../setup.json");

module.exports.run = async (client, msg, args) => {
	let id = msg.content.slice((M.prefix + "level ").length);
	let sms = await msg.channel.send ("Searching, Please wait");
	fetch.get ( M.host + '/bot/api/level1.php?ID=' + id ).then( B => {
		let search = B.body;
		sms.delete ();
		let none = "1970-01-01";
		if (search.msg) return msg.channel.send ("Sorry, this level is not found");
		if (search == "undefined") return msg.channel.send ("Sorry this level cannot find");

	let data = search.desc;
	let text = Buffer.from (data, "base64").toString ();
	
		fetch.get(M.host + "/bot/api/song.php?ID=" + search.songId).then ( P => {
			let songId = search.songId;
			let noSong = new Discord.MessageEmbed ()
		.addField ( search.name + ' By ' + search.creator , 'Description: ' + "\n" + `**${text}**` + "\n")
		.addField ("Stat of level: ", search.coins + "\n" + search.stars + "\n" + search.DL + "\n" + search.likes + "\n" + search.length )
        .addField ("Song Info", "\n\n\n" + `
__**${search.creator}**__ just set the **Normal Song**` + "\n\n")
        .addField ("Information", `
ID Level: **${search.id}**` + "\n" + `Level: **${search.unlisted}**` + "\n" +`Object: **${search.objects}**` + "\n" + `Pass: **${search.pass}**` + "\n" + `Level Version: **${search.ver}**`) 
.setThumbnail (`http://famrygd.5v.pl/img/${search.diff}${search.dmn}${search.auto}${search.F}${search.E}${search.dmns}.png`)
.setFooter ("Created at " + search.create + " | Updated at " + search.UP )
if (JSON.stringify(P.body) == "{}") return msg.channel.send ({embed: noSong});
		let embed = new Discord.MessageEmbed ()
		.addField ( search.name + ' By ' + search.creator , 'Description: ' + "\n" + `**${text}**` + "\n" )
		.addField ("Stat of level: ", search.coins + "\n" + search.stars + "\n" + search.DL + "\n" + search.likes + "\n" + search.length )
        .addField ('Song Info', `
ID: **${search.songId}**` + "\n" + `Song Name: **${P.body.name}**` + "\n" + `Size: **${P.body.size}**` + "\n" + P.body.download )
        .addField ("Information", `
ID Level: **${search.id}**` + "\n" + `Level: **${search.unlisted}**` + "\n" +`Object: **${search.objects}**` + "\n" + `Pass: **${search.pass}**` + "\n" + `Level Version: **${search.ver}**`) 
        .setThumbnail (`http://famrygd.5v.pl/img/${search.diff}${search.dmn}${search.auto}${search.F}${search.E}${search.dmns}.png`)
        .setFooter ("Created at " + search.create + " | Updated at " + search.UP )
		msg.channel.send (embed);
		});
	});
}
module.exports.help = {
	name: "level"
	}