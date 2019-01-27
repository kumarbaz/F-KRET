const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class UserInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pre-test',
			aliases: [],
			group: 'bilgi',
			memberName: 'pre-test',
			description: 'Responds with detailed information on a user.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS'],
		});
	}

	run(msg, { member }) {
		const preEnabled = this.client.provider.get(msg.guild.id, 'preEnabled', []);
		const embed = new Discord.RichEmbed()
			.setColor('RANDOM')
            .addField('Premium ;', preEnabled ? 'Açık' : 'Kapalı')
			return msg.embed(embed);
	}
};