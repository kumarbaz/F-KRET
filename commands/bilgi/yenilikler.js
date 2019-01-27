const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class ServerInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yenilikler',
			aliases: [],
			group: 'bilgi',
			memberName: 'yenilikler',
			description: 'Responds with detailed information on the server.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS']
		});
	}

	async run(msg) {
		const embed = new Discord.RichEmbed()
			.setColor('RANDOM')
            .addField('❯ Yenilikler 29.05.2018', `\n+ h!modlog-ayarla Yapıldı\n+ h!küfür-engelle Aktif Oldu\n+ Bazı Küçük Şeyler Türkçeleştirildi\n+ h!zamanlıyıcı Eklendi\n+ h!oylama Eklendi\n+ Komutları Tanıtmak ve Botu Tanıtmak İçin YT Kanal Açıldı\n+ Bazı Oyunlar Eklendi`)
            .setFooter('Hype Yenilikler')
		return msg.embed(embed);
	}
};