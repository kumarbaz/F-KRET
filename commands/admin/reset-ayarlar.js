const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class UserInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reset-ayarlar',
			aliases: ["reset"],
			group: 'bilgi',
			memberName: 'reset-ayarlar',
			description: 'Responds with detailed information on a user.',
			guildOnly: true,
            clientPermissions: ['EMBED_LINKS'],
            args: [
				{
					key: 'string',
					prompt: 'Bu Sunucunun Ayarları Sıfırlansınmı ? (evet ya da hayır olarak cevap yazınız)\n',
					type: 'string',
					validate: string => {
						if (string === 'evet' || string === 'hayır') return true;
						else return 'lütfen `evet` ya da `hayır` yazınız';
					}
				}
			]
		});
    }
    
    hasPermission(msg) {
        if (!this.client.isOwner(msg.author)) return 'Only the bot owner(s) may use this command.';
        return true;
    }

	run(msg, { member }) {
        //data
		const db1 = this.client.provider.get(msg.guild.id, 'girisRolK', []);
		const db2 = this.client.provider.get(msg.guild.id, 'modlogsEnable', []);
		const db3 = this.client.provider.get(msg.guild.id, 'logsEnable', []);
        const db4 = this.client.provider.get(msg.guild.id, 'hosGeldinK', []);

        const vt1 = this.client.provider.get(msg.guild.id, 'reklamEngel', []);
        const vt2 = this.client.provider.get(msg.guild.id, 'linkEngel', []);

        this.client.provider.set(msg.guild.id, 'reklamEngel', false);
        this.client.provider.set(msg.guild.id, 'linkEngel', false);
        this.client.provider.set(msg.guild.id, 'girisRolK', false);
		this.client.provider.set(msg.guild.id, 'modlogsEnable', false);
		this.client.provider.set(msg.guild.id, 'logsEnable', false);
        this.client.provider.set(msg.guild.id, 'hosGeldinK', false);

        msg.channel.send('Bu Sunucunun Ayarları Sıfırlandı.')
        
        
	}
};