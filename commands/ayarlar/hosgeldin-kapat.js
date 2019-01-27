const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hoşgeldin-kapat',
			aliases: [],
			group: 'ayarlar',
			memberName: 'hoşgeldin-kapat',
			description: 'Log kanalını kapatmanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 60
			}
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
        const db = this.client.provider.get(msg.guild.id, 'hosGeldinK', []);
            if (db === false) return msg.reply('Hoşgeldin zaten devredışı bırakılmış.');
            else this.client.provider.get(msg.guild.id, 'hosGeldinK', false).then(() => msg.reply('Hoşgeldin devredışı bırakıldı.'));
	}
};