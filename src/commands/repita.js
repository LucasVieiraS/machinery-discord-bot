const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("repita")
		.setDescription("Repete a mensagem enviada")
		.addStringOption((option) =>
			option
				.setName("message")
				.setDescription("A mensagem a ser repetida")
				.setRequired(true)
		),
	async execute(interaction) {
		interaction.reply({
			content: interaction.options.getString("message"),
			ephemeral: true,
		});
	},
};
