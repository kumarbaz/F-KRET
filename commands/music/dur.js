const { Command } = require('discord.js-commando');

module.exports = class PauseSongCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dur',
			aliases: ['shh', 'shhh', 'shhhh', 'shhhhh'],
			group: 'music',
			memberName: 'pause',
			description: 'Pauses the currently playing song.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_MESSAGES');
	}

	run(msg) {
		const queue = this.queue.get(msg.guild.id);
		if (!queue) return msg.reply(`Durdurmak İçin Bir Müzik Bulamıyorum.`);
		if (!queue.songs[0].dispatcher) return msg.reply('Bu Müzik Zaten Durdurulmuş.');
		if (!queue.songs[0].playing) return msg.reply('Bu Müzik Zaten Durdurulmuş.');
		queue.songs[0].dispatcher.pause();
		queue.songs[0].playing = false;

		return msg.reply(`Müzik Durduruldu Geri Oynatmak İçin \`${this.client.commandPrefix}devam\` Komutunu Kullan`);
	}

	get queue() {
		if (!this._queue) this._queue = this.client.registry.resolveCommand('music:play').queue;

		return this._queue;
	}
};