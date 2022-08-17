const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

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
                let lang = "pt_br"
                let city = interaction.options.getString("cidade") || "New York";
                await axios
                .get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${process.env.WEATHERTOKEN}`
                )
                .then(response => {
                    let apiData = response;
                    let currentTemp = Math.ceil(apiData.data.main.temp)
                    let maxTemp = apiData.data.main.temp_max;
                    let minTemp = apiData.data.main.temp_min;
                    let humidity = apiData.data.main.humidity;
                    let wind = apiData.data.wind.speed;
                    let icon = apiData.data.weather[0].icon
                    let country = apiData.data.sys.country
                    city = apiData.data.name
                    let pressure = apiData.data.main.pressure;
                    let cloudness = apiData.data.weather[0].description;
                    embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Está ${currentTemp}\u00B0 C em ${city} - ${country}`)
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
                    interaction.reply({embeds: [embed]});
                }).catch(err => {
                    console.log(err);
                    interaction.reply(`Adicione uma cidade válida.`)
                })
	}
}
 