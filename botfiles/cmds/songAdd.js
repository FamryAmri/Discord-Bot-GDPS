const Discord = require("discord.js");
const req = require("request-promise");
const fetch = require("snekfetch");
const config = require("../setup.json");

module.exports.run = async (client, msg, args) => {
	let url = args[0];
	if (!args[0]) return msg.channel.send("url soundcloud only");
	let key = "dc467dd431fc48eb0244b0aead929ccd";
	let json = await req({uri: `https://api.soundcloud.com/resolve?url=${url}&client_id=${key}`, method: "GET", json: true});
	//console.log(json);
	if (json["errors"]) return msg.channel.send(json["errors"]);
	let link = `${json["stream_url"]}?client_id=${key}`;
	req({
		uri: config.host + "/bot/api/songAdd.php?" + `link=${link}&name=${json["title"]}&author=${json["user"]["username"]}`,
		method: "GET"
		}).then (result => {
			msg.channel.send(`**Song added in**: ${result}`);
			}).catch(err => {
				console.log(err);
				if (err) return msg.channel.send("something when wrong");
				});
	}
	
module.exports.help = {
	name: "songAdd"
	}