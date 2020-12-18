const Discord = require("discord.js");
const fetch = require ("request-promise");
const M = require ("../setup.json");
const package = JSON.parse(require("fs").readFileSync("./package.json", "utf8"));

module.exports.run = async (client, msg, args) => {
	let about = await fetch({
		uri: `https://raw.githubusercontent.com/FamryAmri/Discord-Bot-GDPS/master/about`,
		method: "GET"
		});
	let embed = new Discord.MessageEmbed();
	embed.setTitle("About this bot");
	embed.setDescription("```" + about + "```\n**Version**: " + package.version + " | **Made by**: [FamryAmri](http://github.com/FamryAmri/Discord-Bot-GDPS)");
	msg.channel.send(embed);
	}
		
module.exports.help = {
	name: "about"
	}