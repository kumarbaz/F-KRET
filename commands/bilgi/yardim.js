const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class ServerInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yardım',
			aliases: [],
			group: 'bilgi',
			memberName: 'yardım',
			description: 'Responds with detailed information on the server.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS']
		});
	}

	async run(msg) {
		if (!msg.guild.members.has(msg.guild.ownerID)) await msg.guild.members.fetch(msg.guild.ownerID);
		const embed = new Discord.RichEmbed()
			.setColor('RANDOM')
			.addField('❯ Bilgi', `h!yardım ❤ Komutları Gösterir\nh!sunucubilgi ❤ Sunucu Bilgisini Gösterir\nh!kullanıcıbilgi ❤ Kullanıcı Bilgisini Gösterir\nh!ayarlar ❤ Sunucunuza Yaptığınız Ayarları Gösterir\nh!yenilikler ❤ Son Yapılan Yenilikleri Gösterir\nh!hava-durumu ❤ Yazdığınız Şehrin Hava Durumunu Gösterir`)
			.addField('❯ Müzik', `h!gir ❤ Ses Kanalına Giriş Yapar\nh!çık ❤ Ses Kanalından Çıkar\nh!çal ❤ Müzik Çalmanıza Yarar\nh!geç ❤ Müzik Geçer\nh!dur ❤ Müziği Durdurur\nh!devam ❤ Müziği Devam Ettirir`)
			.addField('❯ Ayarlar', `h!hoşgeldin-ayarla ❤ Hoşgeldin Kanalını Ayarlar\nh!log-ayarla ❤ Log Kanalını Ayarlar\nh!log-kapat ❤ Log Almayı Kapatır\nh!otorol-ayarla ❤ Otorol Ayarlar\nh!otorol-kapat ❤ Otorolü Kapatır\nh!reklam-engelle ❤ Reklam Engellemeyi Açar/Kapatır\nh!link-engelle ❤ Link Engellemeyi Açar/Kapatır\nh!küfür-engelle ❤ Küfür Engellemeyi Açar/Kapatır\nh!modlog-ayarla ❤ Mod-Log Kanalını Ayarlar\nh!modlog-kapat ❤ Mod-Log Almayı Kapatır`)
			.addField('❯ Admin', `h!blacklist ❤ Bottan Kullanıcı Engeller\nh!whitelist ❤ Bottan Engellenen Kullanıcının Engelini Kaldırır\nh!premium-aktif ❤ Premium'u Aktif Eder\nh!premium-deaktif ❤ Premium'u Deaktif Eder`)
			.addField('❯ Premium', `h!pre-test ❤ Bulunduğunuz Sunucunun Pre Olup Olmadığını Görürsünüz`)
			.addField('❯ Sistemler', `**Giriş-Çıkış**\n**Link Engelleme**\n**Reklam Engelleme**\n**Küfür Engelleme**\n**Otorol**\n**Log**\n**Mod-Log**`)
		return msg.embed(embed);
	}
};