const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("tempo")
		.setDescription("o tempo atual de uma cidade aleatória"),
	async execute(interaction) {
        const embed = new MessageEmbed()
        .setTitle(`This is an embed.`)
        .setDescription(`This is the description`)
        .setTimestamp();
        interaction.channel.send({embeds: [embed]});
	}
}
 