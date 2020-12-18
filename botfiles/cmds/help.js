const M = require ("../setup.json");
const prefix = M.prefix;

module.exports.run = async (client, msg, args) => {
	let command = args[0];
	let owo = msg.author.id == M.owner;
	
	let title = "**__HELP COMMANDS__**\n\n";
	let titleown = "**__HELP OWNER COMMANDS__**\n\n";
	let reboot = "**__" + prefix + "reboot__**\n" + "**To:** reboot the bot\n";
	let shut = "**__" + prefix + "shut__**\n" + "**To:** shut down the bot\n";
	let users = "**__" + prefix + "users__**\n" + "**To:** check user's profile\n" + "**howto:** `" + prefix + "users <playername> or <ID>`\n\n";
	let leveltop = "**__" + prefix + "leveltop__**\n" + "**To:** check leaderboard from level\n" + "**howto:** `" + prefix + "leveltop <levelID> <page>`\n\n";
	let level = "**__" + prefix + "level__**\n" + "**To:** check level information\n" + "**howto:** `" + prefix + "level <levelID> or <levelName>` \n\n";
	let leveldaily = "**__" + prefix + "dailylevel__**\n" + "**To:** check daily level\n" + "**Howto:** `" + prefix + "dailylevel`\n\n";
	let levelweekly = "**__" + prefix + "weeklylevel__**\n" + "**To:** check weekly level\n" + "**Howto:** `" + prefix + "weeklylevel`\n\n";
	let levelby = "**__" + prefix + "levelby__**\n" + "**To:** check level from player\n" + "**Howto:** `" + prefix + "levelby <playername> or <ID> <page>`\n\n";
	let levelsearch = "**__" + prefix + "levelsearch__**\n" + "**To:** for search levels from GDPS \n" + "**Howto:** `" + prefix + "levelsearch <query> <page>`\n\n";
	let song = "**__" + prefix + "song__**\n" + "**To:** check song information\n" + "**howto:** `" + prefix + "song <songID>` \n\n";
	let songadd = "**__" + prefix + "songAdd__**\n" + "**To:** insert song into this gdps\n" + "**howto:** `" + prefix + "songAdd <url-soundcloud>` \n\n";
	let board = "**__" + prefix + "leaderboard__**\n" + "**To:** check Top Player with type of `demon`, `coins`, `gold.coins`, `CP`, and also `stars`\n" + "**howto:** `" + prefix + "leaderboard <type> <page>`\n\n";
	let ping = "**__" + prefix + "ping__**\n" + "**To:** Pong!\n" + "**howto:** `" + prefix + "ping`\n\n";
	let about = "**__" + prefix + "about__**\n" + "**To:** check about this bot\n" + "**howto:** `" + prefix + "about`\n\n";
	
	if (command == "level") return msg.channel.send ( level + "For Example:\n```" + prefix + "level unnamed_0```");
	if (command == "users") return msg.channel.send ( users + "For Example:\n```" + prefix + "users RobTop\n" + prefix + "users 1```");
	if (command == "leveltop") return msg.channel.send (leveltop + "For Example:\n```" + prefix + "leveltop 1 1```");
	if (command == "leaderboard") return msg.channel.send (board + "For Example:\n```" + prefix + "leaderboard stars 1```")
	if (command == "song") return msg.channel.send ( song + "For Example:\n```" + prefix + "song 1```");
	if (command == "levelsearch") return msg.channel.send ( levelsearch + "For Example:\n```" + prefix + "levelsearch 1 test for the check```")
	if (command == "levelby") return msg.channel.send ( levelby + "For Example:\n```" + prefix + "RobTop 1```");
	if (command == "weeklylevel") return msg.channel.send ( levelweekly );
	if (command == "dailylevel" ) return msg.channel.send ( leveldaily );
	if (command == "about" ) return msg.channel.send ( about );
	if (command == "ping" ) return msg.channel.send ( ping );
	if (owo && args[0] == "owner") return msg.author.send ( titleown + reboot + shut );
	
	msg.channel.send ( title + users + leveltop + level + leveldaily + levelweekly + levelsearch + levelby + song + songadd + board + ping + about + "Use `" + prefix + "help <commands>` to view example for using command");
	}
	
module.exports.help = {
	name: "help"
	}