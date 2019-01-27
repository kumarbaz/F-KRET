const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'modlog-kapat',
			aliases: [],
			group: 'ayarlar',
			memberName: 'modlog-kapat',
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
			const db = this.client.provider.get(msg.guild.id, 'modlogsEnable', []);
            if (db === false) return msg.reply('Mod-Log Zaten Devredışı Bırakılmış.');
            else this.client.provider.set(msg.guild.id, 'modlogsEnable', false).then(() => msg.reply('Mod-Log Devredışı Bırakıldı.'));
	}
};