const commando = require('discord.js-commando');

class TimerCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'alarm',
			group: 'eglence',
			memberName: 'alarm',
			description: 'Starts a timer of a set amount of time'
		});
	}

	async run(message, args) {
        var timer = parseInt(args);
        if(!timer) return message.channel.send('Bir Saniye Girin.')
        var textToDisplay;
        message.channel.send(`Alarm Ayarlandı. ${timer} Saniye Sonra Haber Verilecek.`)
		setTimeout(function(){
			if (args != 1) {
                textToDisplay = timer + " Saniye Geçti.";
			} else {
                textToDisplay = "1 Saniye Geçti.";
			}
            message.channel.send(textToDisplay)
            message.author.send('Zaman Doldu!')
				.then(msg => console.log("finished timer"))
				.catch(console.error);}
									, timer * 1000);
	}
}
module.exports = TimerCommand;