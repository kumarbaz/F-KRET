const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { list } = require('../../util/Util');
const grups = ['Admin', 'Ayarlar', 'Bilgi', 'Mod', 'Müzik', 'Oyun'];

module.exports = class ServerInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yardım2',
			aliases: [],
			group: 'bilgi',
			memberName: 'yardım2',
			description: 'Responds with detailed information on the server.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'grup',
					prompt: `Bir Grup Gir Lütfen. ${list(grups, 'yada')}`,
					type: 'string',
				}
			]
		});
	}

	async run(msg, args) {
		if(args.grup === "Admin") {
			const AdminK = new Discord.RichEmbed()
			.setColor('RANDOM')
			.setDescription('Admin Komutları')
			.setFooter('Yardım Komutu')
			msg.channel.sendEmbed(AdminK);

		} else {
			if(args.grup === "Mod") {
			const ModK = new Discord.RichEmbed()
			.setColor('RANDOM')
			.setDescription('Mod Komutları')
			.setFooter('Yardım Komutu')
			msg.channel.sendEmbed(ModK);
			
			} else {
			if(args.grup === "Ayarlar") {
			const AyarlarK = new Discord.RichEmbed()
			.setColor('RANDOM')
			.setDescription('Ayarlar Komutları')
			.setFooter('Yardım Komutu')
			msg.channel.sendEmbed(AyarlarK);
				}
			}
		}
	}
};