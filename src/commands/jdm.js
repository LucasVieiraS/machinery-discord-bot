const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("jdm")
		.setDescription("get a random jdm post."),
	async execute(interaction) {
        const embed = new MessageEmbed()
        .setTitle(`Testing`)
        .setDescription(`This is the description`)
        .setTimestamp();
        interaction.channel.send({ content: `String / Message to send`, embeds: [embed]});
	}
}
 