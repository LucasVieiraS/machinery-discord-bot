const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');

const answers = [
        "Sim", "Não", "Acho que sim", "Acho que não", "Talvez...", "Depende.", "Será?"
]

function getRandomAnswer(){return answers[Math.floor(Math.random()*answers.length)]}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("responda")
		.setDescription("peça para que o maquinário te responda com sim, não ou talvez."),
	async execute(interaction) {
                interaction.channel.send({content: getRandomAnswer()});
	}
}
 