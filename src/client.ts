// console.log(require, 'a')
console.log(process.env)
if (!process.env)
	process.env = {}
const { Client, Constants } = await import("discord.js-selfbot-v13");
const client = new Client();
client.on(Constants.Events.DEBUG, console.log)
// client.on(Constants.Events.DEBUG, console.log)
export default client;
