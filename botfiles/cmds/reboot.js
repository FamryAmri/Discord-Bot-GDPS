const M = require ("../setup.json");

module.exports.run = async (client, msg, args) => {
	
	let owo = msg.author.id == M.owner;
	if (!owo) return;
	msg.channel.send('See You Again ;)').then((m) => {
        client.destroy().then(() => {
          client.login(process.env.BOT_TOKEN).then (() => {
          	m.edit('Hello, I am Back!');
          });
        });
      });
     }
     
module.exports.help = {
	name: "boot"
	}