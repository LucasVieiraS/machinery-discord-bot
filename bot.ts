require("dotenv").config();
const fs = require("fs");
const Database = require("./config/Database.ts"); //tsc bot.ts

const db = new Database();
db.connect();

const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS
	]
});

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

interface Commands {
	//id: string;
}

const commands: Commands[] = [];      


client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	let convertedJSON = command.data.toJSON();
	commands.push(convertedJSON);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs
	.readdirSync("./src/events")
	.filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, commands));
	} else {
		client.on(event.name, (...args) => event.execute(...args, commands));
	}
}

client.login(process.env.TOKEN);