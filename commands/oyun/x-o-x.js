const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const { verify } = require('../../util/Util');

module.exports = class TicTacToeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'x-o-x',
			group: 'oyun',
			memberName: 'x-o-x',
			description: 'Play a game of tic-tac-toe with another user.',
			guildOnly: true,
			args: [
				{
					key: 'opponent',
					prompt: 'Bir Kişi Seç.',
					type: 'user'
				}
			]
		});

		this.playing = new Set();
	}

	async run(msg, { opponent }) { // eslint-disable-line complexity
		if (opponent.bot) return msg.reply('Botlar İle Bu Oyunu Oynayamazsın.');
		if (opponent.id === msg.author.id) return msg.reply('Kendin İle Nasıl Oynayacan Kardeş.');
		if (this.playing.has(msg.channel.id)) return msg.reply('Kanal Başına Sadece Tek Oyun Oynanabilir');
		this.playing.add(msg.channel.id);
		try {
			await msg.say(`${opponent}, Oyunu Kabul Ediyonmu ?`);
			const verification = await verify(msg.channel, opponent);
			if (!verification) {
				this.playing.delete(msg.channel.id);
				return msg.say('Bakılıyorsa Kabul Etmedi...');
			}
			const sides = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
			const taken = [];
			let userTurn = true;
			let winner = null;
			while (!winner && taken.length < 9) {
				const user = userTurn ? msg.author : opponent;
				const sign = userTurn ? 'X' : 'O';
				await msg.say(stripIndents`
					${user.toString()}, Hangisini Seçceksin ? (Oyun Amacı Kendi Harfinizi Ard Arda 3 Kere Getirmek)
					\`\`\`
					${sides[0]} | ${sides[1]} | ${sides[2]}
					—————————
					${sides[3]} | ${sides[4]} | ${sides[5]}
					—————————
					${sides[6]} | ${sides[7]} | ${sides[8]}
					\`\`\`
				`);
				const filter = res => {
					const choice = res.content;
					return res.author.id === user.id && sides.includes(choice) && !taken.includes(choice);
				};
				const turn = await msg.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
				if (!turn.size) {
					await msg.say('Üzgünüm Zamanın Doldu');
					userTurn = !userTurn;
					continue;
				}
				const choice = turn.first().content;
				sides[Number.parseInt(choice, 10)] = sign;
				taken.push(choice);
				if (
					(sides[0] === sides[1] && sides[0] === sides[2])
					|| (sides[0] === sides[3] && sides[0] === sides[6])
					|| (sides[3] === sides[4] && sides[3] === sides[5])
					|| (sides[1] === sides[4] && sides[1] === sides[7])
					|| (sides[6] === sides[7] && sides[6] === sides[8])
					|| (sides[2] === sides[5] && sides[2] === sides[8])
					|| (sides[0] === sides[4] && sides[0] === sides[8])
					|| (sides[2] === sides[4] && sides[2] === sides[6])
				) winner = userTurn ? msg.author : opponent;
				userTurn = !userTurn;
			}
			this.playing.delete(msg.channel.id);
			return msg.say(winner ? `Tebrikler... Sen Kazandın, ${winner}!` : '... Berabere Kaldınız');
		} catch (err) {
			this.playing.delete(msg.channel.id);
			throw err;
		}
	}
};