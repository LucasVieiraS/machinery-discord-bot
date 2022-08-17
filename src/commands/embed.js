const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');
const { axios } = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("tempo")
		.setDescription("o tempo atual de uma cidade aleatória")
		.addStringOption((option) =>
			option
				.setName("cidade")
				.setDescription("Temperatura na cidade citada")
				.setRequired(true)
		),
	async execute(interaction) {
                let city = interaction.options.getString("cidade") || "New York";
                axios
                .get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHERTOKEN}`
                )
                .then(response => {
                    let apiData = response;
                    let currentTemp = Math.ceil(apiData.data.main.temp)
                    let maxTemp = apiData.data.main.temp_max;
                    let minTemp = apiData.data.main.temp_min;
                    let humidity = apiData.data.main.humidity;
                    let wind = apiData.data.wind.speed;
                    let author = message.author.username
                    let profile = message.author.displayAvatarURL
                    let icon = apiData.data.weather[0].icon
                    let cityName = args
                    let country = apiData.data.sys.country
                    let pressure = apiData.data.main.pressure;
                    let cloudness = apiData.data.weather[0].description;
                    message.channel.send(exampleEmbed(currentTemp, maxTemp, minTemp, pressure, humidity, wind, cloudness, icon, author, profile, cityName, country));
                }).catch(err => {
                    message.reply(`Enter a vailid city name`)
                })
                embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(`There is ${temp}\u00B0 C in ${cityName}, ${country}`)
		.addFields(
                        [
                        {name: `Temperatura Máxima:`, value: `${maxTemp}\u00B0 C`},
                        {name: `Temperatura Mínima:`, value: `${minTemp}\u00B0 C`},
                        {name: `Umidade:`, value: `${humidity} %`},
                        {name: `Velocidade do Vento:`, value: `${wind} m/s`},
                        {name: `Pressão:`, value: `${pressure} hpa`},
                        {name: `Nebulosidade:`, value: `${cloudness}`}
                        ]
                )
		.setThumbnail(`http://openweathermap.org/img/w/${icon}.png`)
                await interaction.reply({embeds: [embed]});
	}
}
 