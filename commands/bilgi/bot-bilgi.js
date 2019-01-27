const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { version } = require('../../package');
const { duration } = require('../../util/Util');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'istatistik',
			aliases: ['i', 'bot-bilgi', 'bb'],
			group: 'bilgi',
			memberName: 'istatistik',
			description: 'Responds with detailed bot information.',
			guarded: true,
			clientPermissions: ['EMBED_LINKS']
		});
	}

	run(msg) {
		const embed = new Discord.RichEmbed()
			.setColor('RANDOM')
			.addField('❯ Sunucular', this.client.guilds.size, true)
			.addField('❯ Shard Sayısı', this.client.options.shardCount, true)
			.addField('❯ Botun Sunucusu', `[Tıkla](https://discord.gg/fDDYpyx)`, true)
			.addField('❯ RAM Kullanımı', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
			.addField('❯ Çalışma Süresi', duration(this.client.uptime), true)
			.addField('❯ Versiyon', `v${version}`, true)
			.addField('❯ Node Versiyon', process.version, true)
			.addField('❯ Kütüphane',
				'[discord.js](https://discord.js.org)[-commando](https://github.com/discordjs/Commando)', true)
			.addField('❯ Kullanıcı Sayısı', this.client.users.size, true)
			.addField('❯ Grup Sayısı', this.client.registry.groups.size)
			.addField('❯ Komut Sayısı', this.client.registry.commands.size)
		return msg.embed(embed);
	}
};