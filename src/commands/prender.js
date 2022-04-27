const { SlashCommandBuilder } = require("@discordjs/builders");
const Canvas = require("canvas");
const Discord = require("discord.js");

const dim = {
    height: 300,
    width: 300
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("prender")
		.setDescription("Prenda o meliante")
		.addUserOption((user) => 
			user
			.setName("pessoa")
			.setDescription("Pessoa a ser presa")
			.setRequired(true)	
		),
		
	async execute(interaction) {
		const user = interaction.options.getUser("pessoa");
		const userAvatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;

		const canvas = Canvas.createCanvas(dim.width, dim.height);
        const ctx = canvas.getContext("2d");

		const backPrison = await Canvas.loadImage('./src/img/back-prison.png');
        ctx.drawImage(backPrison, 0, 0);

		const avatar = await Canvas.loadImage(userAvatar);
        ctx.drawImage(avatar, 20, 20);

		const prison = await Canvas.loadImage('./src/img/prison.png');
        ctx.drawImage(prison, 0, 0);

		const img = new Discord.MessageAttachment(canvas.toBuffer(), "prison.png");

		interaction.reply({
			content: `${user} foi de beise`,
			files: [img],
			ephemeral: false,
		});
	},
};
