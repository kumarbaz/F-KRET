const Command = require('../../structures/Command');
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/emojify');

module.exports = class EmojifyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'emo-yaz',
			aliases: ['regional-indicator'],
			group: 'eglence',
			memberName: 'emo-yaz',
			description: 'Converts text to emoji form.',
			args: [
				{
					key: 'text',
					prompt: 'Hangi Kelimenin Veya Cümlenin Emojiye Dönüşmesini İstiyorsun',
					type: 'string',
					validate: text => {
						if (letterTrans(text.toLowerCase(), dictionary, ' ').length < 2000) return true;
						return 'Cümleniz Çok Uzun';
					},
					parse: text => text.toLowerCase()
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(letterTrans(text, dictionary, ' '));
	}
};