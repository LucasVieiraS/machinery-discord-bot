const Discord = require('discord.js');
const GuildSettings = require('../models/GuildSettings');

module.exports = {
	name: "guildMemberAdd",
	async execute(member) {
		// member.guild.channels.cache.get("849283385808912384").send(`${member.user} has joined the server!`);
		console.log(member.user);
		const guildSettings = await GuildSettings.findOne({ guild_id: member.guild.id });

		if (!guildSettings && !guildSettings.welcome_channel_id) {
			return;
		}

		const newMemberEmbed = new Discord.MessageEmbed()
			.setColor("#d81e5b")
			.setTitle("Bem-Vindo! 🤗")
			.setDescription(`${member.user} entrou no servidor! Aproveite sua estadia.`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();
		
			member.guild.channels.cache.get(guildSettings.welcome_channel_id).send({
				embeds: [newMemberEmbed] 
			})
	}
}