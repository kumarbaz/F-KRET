const { Command } = require('discord.js-commando');

module.exports = class BlacklistCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'blacklist',
			aliases: ['blacklist-add'],
			group: 'admin',
			memberName: 'blacklist',
			description: 'Blacklists a user from using commands.',
			ownerOnly: true,
			args: [
				{
					key: 'user',
					prompt: 'Bir Kişi Girin.',
					type: 'user'
				}
			]
		});
	}

	run(msg, { user }) {
		if (this.client.isOwner(user)) return msg.reply('Bot Sahibini Blacklist\'e Alınamaz.');
		if (user.bot) return msg.reply('Botlar Blacklist\'e Alınamaz.');
		const blacklist = this.client.provider.get('global', 'blacklist', []);
		if (blacklist.includes(user.id)) return msg.reply(`${user.tag} Bu Kişi Zaten Blacklist\'de.`);
		blacklist.push(user.id);
		this.client.provider.set('global', 'blacklist', blacklist);
		return msg.say(`${user.tag} Adlı Kişi Blacklist'e Alındı.`);
	}
};