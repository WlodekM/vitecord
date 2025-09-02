// console.log(require, 'a')
console.log(process.env)
if (!process.env)
	process.env = {}
const { Client } = await import("discord.js-selfbot-v13");

export default new Client();
