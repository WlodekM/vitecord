// console.log(require, 'a')
console.log(process.env)
if (!process.env)
	process.env = {}
const { Client, Constants } = await import("discord.js-selfbot-v13");
const client = new Client();
//TODO: probably make a proxy for gateway
console.log(client.ws.gateway)
client.on(Constants.Events.DEBUG, console.log)
// client.on(Constants.Events.DEBUG, console.log)
export default client;
