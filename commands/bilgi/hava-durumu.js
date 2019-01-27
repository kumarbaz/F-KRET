const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const Discord = require('discord.js');

module.exports = class WeatherCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hava-durumu',
			aliases: ['yahoo-weather'],
			group: 'bilgi',
			memberName: 'hava-durumu',
			description: 'Responds with weather information for a specific location.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'location',
					prompt: 'What location would you like to get the weather of?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { location }) {
		try {
			const { body } = await snekfetch
				.get('https://query.yahooapis.com/v1/public/yql')
				.query({
					// eslint-disable-next-line max-len
					q: `select * from weather.forecast where u='f' AND woeid in (select woeid from geo.places(1) where text="${location}")`,
					format: 'json'
				});
			if (!body.query.count) return msg.say('Could not find any results.');
			const data = body.query.results.channel;
			const embed = new Discord.RichEmbed()
				.setColor(0x0000FF)
				.setAuthor(data.title, 'https://i.imgur.com/B9MMbtB.png', 'https://www.yahoo.com/news/weather')
				.setURL(data.link)
				.setTimestamp()
				.addField('❯ City', data.location.city, true)
				.addField('❯ Country', data.location.country, true)
				.addField('❯ Region', data.location.region, true)
				.addField('❯ Condition', data.item.condition.text, true)
				.addField('❯ Temperature', `${data.item.condition.temp}°F`, true)
				.addField('❯ Humidity', data.atmosphere.humidity, true)
				.addField('❯ Pressure', data.atmosphere.pressure, true)
				.addField('❯ Rising', data.atmosphere.rising, true)
				.addField('❯ Visibility', data.atmosphere.visibility, true)
				.addField('❯ Wind Chill', data.wind.chill, true)
				.addField('❯ Wind Direction', data.wind.direction, true)
				.addField('❯ Wind Speed', data.wind.speed, true);
			return msg.embed(embed);
		} catch (err) {
			return msg.say(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};