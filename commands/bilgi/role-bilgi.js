const Command = require('../../structures/Command');
const { RichEmbed } = require('discord.js');
const { util: { permissions } } = require('discord.js-commando');

module.exports = class RoleInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rol-bilgi',
			aliases: ['role'],
			group: 'bilgi',
			memberName: 'role',
			description: 'Responds with detailed information on a role.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'role',
					prompt: 'Which role would you like to get information on?',
					type: 'role'
				}
			]
		});
	}

	run(msg, { role }) {
		const embed = new RichEmbed()
			.setColor(role.hexColor)
			.addField('❯ Ad', role.name, true)
			.addField('❯ ID', role.id, true)
			.addField('❯ Renk', role.hexColor.toUpperCase(), true)
			.addField('❯ Oluşturulduğu Tarih', role.createdAt.toDateString(), true)
			.addField('❯ Rollerden Ayrı?', role.hoist ? 'Evet' : 'Hayır', true)
			.addField('❯ Etiketlenebilir?', role.mentionable ? 'Evet' : 'Hayır', true)
		return msg.embed(embed);
	}
};