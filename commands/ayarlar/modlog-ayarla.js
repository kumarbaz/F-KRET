const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'modlog-ayarla',
			aliases: [],
			group: 'ayarlar',
			memberName: 'modlog-ayarla',
			description: 'Log kanalını değiştirmenizi/ayarlamanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'channel',
					prompt: 'Modlog Kanalı Hangi Kanal Olsun? (#kanalismi şeklinde yazınız)\n',
					type: 'channel'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
		var ch = await args.channel;
		if (ch.type == 'voice') return msg.reply('Sesli kanallar seçilemez!');
        if (args.channel) {
			const vt = this.client.provider.get(msg.guild.id, 'modlogsChannel', []);
			const db = this.client.provider.get(msg.guild.id, 'modlogsEnable', []);
			if (vt === args.channel.id) {
				this.client.provider.set(msg.guild.id, 'modlogsEnable', true);
				msg.channel.send(`Mod-Log Kanalı Zaten **${args.channel.name}** Olarak Ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'modlogsChannel', args.channel.id);
				this.client.provider.set(msg.guild.id, 'modlogsEnable', true);
				return msg.channel.send(`Mod-Log Olarak Ayarlanan Kanal: **${args.channel.name}**`);
			}
        }
    }
};