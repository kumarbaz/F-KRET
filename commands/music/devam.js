const { Command } = require('discord.js-commando');

module.exports = class ResumeSongCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'devam',
			group: 'music',
			memberName: 'devam',
			description: 'Resumes the currently playing song.',
			details: 'Only moderators may use this command.',
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
		if (!queue) return msg.reply(`Hiç Müzik Oynamıyor.`);
		if (!queue.songs[0].dispatcher) {
			return msg.reply('pretty sure a song that hasn\'t actually begun playing yet could be considered "resumed".');
		}
		if (queue.songs[0].playing) return msg.reply('Bu Müzik Durdurulmamış.'); // eslint-disable-line max-len
		queue.songs[0].dispatcher.resume();
		queue.songs[0].playing = true;

		return msg.reply('Müzik Devam Ediyor.');
	}

	get queue() {
		if (!this._queue) this._queue = this.client.registry.resolveCommand('music:play').queue;

		return this._queue;
	}
};