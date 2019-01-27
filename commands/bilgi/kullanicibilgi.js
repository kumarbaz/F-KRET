const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class UserInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kullanıcıbilgi',
			aliases: ['kbilgi', 'kullanıcıb', 'user-info'],
			group: 'bilgi',
			memberName: 'kullanıcıbilgi',
			description: 'Responds with detailed information on a user.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'member',
					prompt: 'Which user would you like to get information on?',
					type: 'member',
					default: ''
				}
			]
		});
	}

	run(msg, { member }) {
		if (!member) member = msg.member;
		const embed = new Discord.RichEmbed()
			.setColor(member.displayHexColor)
			.setThumbnail(member.user.displayAvatarURL)
			.addField('❯ Ad', member.user.tag, true)
			.addField('❯ ID', member.id, true)
			.addField('❯ Discord\'a Girdiği Tarih', member.user.createdAt.toDateString(), true)
			.addField('❯ Sunucuya Girdiği Tarih', member.joinedAt.toDateString(), true)
			.addField('❯ Sunucudaki Nickname', member.nickname || 'Yok', true)
			.addField('❯ Bot mu?', member.user.bot ? 'Evet' : 'Hayır', true)
		return msg.embed(embed);
	}
};