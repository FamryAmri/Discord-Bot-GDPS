const M = require ("../setup.json");

module.exports.run = async (client, msg, args) => {
	
	let owo = msg.author.id == M.owner;
	if (!owo) return;
	msg.reply (`Good Bye :)`).then(m => {
        client.destroy();
      });
  }

module.exports.help = {
	name: "shut"
	}