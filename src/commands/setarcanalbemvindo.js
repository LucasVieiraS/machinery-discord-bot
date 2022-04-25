const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const GuildSettings = require("../models/GuildSettings");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setarcanalbemvindo")
		.setDescription("Seta o canal de bem-vindo.")
		.addChannelOption(option => option
			.setName("bem-vindo")
			.setDescription("O canal a de bem-vindo")
			.setRequired(true)
		),
	async execute(interaction) {
		
		// Check for admin permissions
		if (!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
			interaction.reply("Você não tem permissão de rodar esse comando.");
			return;
		}

		GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err);
				interaction.reply("Um erro ocorreu ao tentar rodar o comando.");
				return;
			}

			if (!settings) {
				settings = new GuildSettings({
					guild_id: interaction.guild.id,
					welcome_channel_id: interaction.options.getChannel("bem-vindo").id
				});
			} else {
				settings.welcome_channel_id = interaction.options.getChannel("bem-vindo").id;
			}

			settings.save(err => {
				if (err) {
					console.log(err);
					interaction.reply("Um erro ocorreu ao tentar rodar o comando.");
					return;
				}

				interaction.reply(`O canal de bem-vindo foi setado para ${interaction.options.getChannel("bem-vindo")}`);
			})
		})

	}
}