const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("pong!"),
	async execute(interaction) {
		interaction.reply({
			content: "pong!",
			ephemeral: true
		});
	}
}
