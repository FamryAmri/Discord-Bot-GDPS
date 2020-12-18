module.exports.run = async (client, msg, args) => {
	let from = msg.createdTimestamp;
	let m = await msg.channel.send ("pinging");
	m.edit("Pong, my ping is " + `${"`"}${m.createdTimestamp - from}ms${"`"}`);
	}
	
module.exports.help = {
	name: "ping"
	}