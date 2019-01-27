const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class UserInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ayarlar',
			aliases: [],
			group: 'bilgi',
			memberName: 'ayarlar',
			description: 'Responds with detailed information on a user.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS'],
		});
	}

	run(msg, { member }) {
		//veri
        const vt1 = this.client.provider.get(msg.guild.id, 'logsChannel', []);
        const vt2 = this.client.provider.get(msg.guild.id, 'girisRol', []);
        const vt3 = this.client.provider.get(msg.guild.id, 'linkEngel', []);
        const vt4 = this.client.provider.get(msg.guild.id, 'reklamEngel', []);
		const vt5 = this.client.provider.get(msg.guild.id, 'hosGeldin', []);
		const vt6 = this.client.provider.get(msg.guild.id, 'modlogsChannel', []);
        //data
		const db1 = this.client.provider.get(msg.guild.id, 'girisRolK', []);
		const db2 = this.client.provider.get(msg.guild.id, 'modlogsEnable', []);
		const db3 = this.client.provider.get(msg.guild.id, 'logsEnable', []);
		const db4 = this.client.provider.get(msg.guild.id, 'hosGeldinK', []);

		//<@&id>
		//<#id>

		const embed = new Discord.RichEmbed()
            .setTitle('Ayarlarınız ;')
			.addField('❯ Otorol Rolü', db1 ? `**Açık** (<@&${vt2}>)` : `**Kapalı** (h!otorol-ayarla)`)
			.addField('❯ Log Kanalı', db3 ? `**Açık** (<#${vt1}>)` : `**Kapalı** (h!log-ayarla)`)
			.addField('❯ Mod-Log Kanalı', db2 ? `**Açık** (<#${vt6}>)` : `**Kapalı** (h!modlog-ayarla)`)
			.addField('❯ Hoşgeldin Kanalı', db4 ? `**Açık** (<#${vt5}>)` : `**Kapalı** (h!hoşgeldin-ayarla)`)
			.addField('❯ Link Engelleme Durumu', vt3 ? '**Açık**' : '**Kapalı**')
			.addField('❯ Reklam Engelleme Durumu', vt4 ? '**Açık**' : '**Kapalı**')
		return msg.embed(embed);
	}
};