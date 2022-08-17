const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');

const answers = [
        "Sim", "Não", "Acho que sim", "Acho que não", "Talvez...", "Depende.", "Será?"
]

function getRandomAnswer(){return answers[Math.floor(Math.random()*answers.length)]}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("responda")
		.setDescription("Peça para que o maquinário te responda."),
	async execute(interaction) {
		await interaction.reply(getRandomAnswer())
        //interaction.channel.send({content: getRandomAnswer()});
	}
}
 