const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tavsiye',
			aliases: [],
			group: 'yardım',
			memberName: 'tavsiye',
			description: 'Responds with detailed bot information.',
			guarded: true,
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    key: 'mesaj',
                    label: 'sunucu',
                    prompt: 'Ne Tavsiyesi Vermek İstiyorsunuz ? (Trolleme Amacıyla Atılan Destekler Blacklist e Alınır)',
                    type: 'string'
                }
            ]
		});
	}

	run(msg, args) {
        let dhat = this.client.channels.get("443068462361739284")
        let dmesaj = args.mesaj
        let duser = msg.author.tag
        let dgrup = msg.guild.name
        let dgrupid = msg.guild.id
        let duserid = msg.author.id

        msg.channel.send('Tavsiyeniz Gönderildi!')

        const tavsiye = new Discord.RichEmbed()
        .setTitle('Yeni Bir Tavsiye Geldi!')
        .addField('Kullanıcı', `${duser} (${duserid})`)
        .addField('Tavsiyesi', dmesaj)
        .addField('Sunucu', dgrup)
        .addField('Sunucu ID', dgrupid)
        dhat.sendEmbed(tavsiye)
	}
};