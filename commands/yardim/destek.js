const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'destek',
			aliases: [],
			group: 'yardım',
			memberName: 'destek',
			description: 'Responds with detailed bot information.',
			guarded: true,
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    key: 'mesaj',
                    label: 'sunucu',
                    prompt: 'Hangi Konuda Destek İstiyorsunuz ? (Trolleme Amacıyla Atılan Destekler Blacklist e Alınır)',
                    type: 'string'
                }
            ]
		});
	}

	run(msg, args) {
        let dhat = this.client.channels.get("327520524152602624")
        let dmesaj = args.mesaj
        let duser = msg.author.tag

        msg.channel.send('Destek Talebiniz Gönderildi! Cevap Gelmesse iWarrior#4867 a Ulaşabilirsiniz.')

        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Destek İsteyen Biri Var')
        .addField('Kullanıcı', duser)
        .addField('Destek İstediği Konu', dmesaj)
        dhat.sendEmbed(embed)
	}
};