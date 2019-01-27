const { Command } = require('discord.js-commando');

module.exports = class WhitelistCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'whitelist',
			aliases: ['blacklist-remove', 'blacklist-delete', 'unblacklist'],
			group: 'admin',
			memberName: 'whitelist',
			description: 'Removes a user from the blacklist.',
			ownerOnly: true,
			args: [
				{
					key: 'user',
					prompt: 'Kimi Blacklist\'den Çıkartmak İstiyorsun?',
					type: 'user'
				}
			]
		});
	}

	run(msg, { user }) {
		if (this.client.isOwner(user)) return msg.reply('Bot Sahibi Blacklist`\'de Olamaz.');
		if (user.bot) return msg.reply('Botlar Blacklist\'de Olamaz.');
		const blacklist = this.client.provider.get('global', 'blacklist', []);
		if (!blacklist.includes(user.id)) return msg.reply(`${user.tag} Bu Kişi Zaten Blacklist\'de Değil!`);
		blacklist.splice(blacklist.indexOf(user.id), 1);
		if (!blacklist.length) this.client.provider.remove('global', 'blacklist');
		else this.client.provider.set('global', 'blacklist', blacklist);
		return msg.say(`${user.tag} Adlı Kişi Blacklist\'den Çıkartıldı.`);
	}
};