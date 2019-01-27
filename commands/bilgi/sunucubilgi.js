const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const filterLevels = ['Off', 'No Role', 'Everyone'];
const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'];

module.exports = class ServerInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sunucu-bilgi',
			aliases: ['sb', 'server-info', 'guild-info'],
			group: 'bilgi',
			memberName: 'server',
			description: 'Responds with detailed information on the server.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS']
		});
	}

	async run(msg) {
		if (!msg.guild.members.has(msg.guild.ownerID)) await msg.guild.members.fetch(msg.guild.ownerID);
		const preEnabled = this.client.provider.get(msg.guild.id, 'preEnabled', []);
		const embed = new Discord.RichEmbed()
			.setColor('RANDOM')
			.setThumbnail(msg.guild.iconURL)
			.addField('❯ Ad', msg.guild.name, true)
			.addField('❯ ID', msg.guild.id, true)
			.addField('❯ Bölge', msg.guild.region.toUpperCase(), true)
			.addField('❯ Kurulduğu Tarih', msg.guild.createdAt.toDateString(), true)
			.addField('❯ Premium Durumu', preEnabled ? 'Aktif' : 'Kapalı', true)
			.addField('❯ Doğrulama Seviyesi', verificationLevels[msg.guild.verificationLevel], true)
			.addField('❯ Sahibi', msg.guild.owner.user.tag, true)
			.addField('❯ Üye Sayısı', msg.guild.memberCount, true)
			.addField('❯ Rol Sayısı', msg.guild.roles.size, true)
			.addField('❯ Kanal Sayısı', msg.guild.channels.size, true);
		return msg.embed(embed);
	}
};