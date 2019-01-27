const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const oneLine = require('common-tags').oneLine;

module.exports = class VoteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'oylama',
            group: 'mod',
            memberName: 'oylama',
            description: "Starts a yes/no/don't care vote.",
            examples: ['!vote "Do you like to vote?" "I mean who doesn\'t right?!" 5'],
            args: [
                {
                    key: 'question',
                    prompt: 'Lütfen Oylama Sorusunu Girin',
                    type: 'string',
                    validate: question => {
                        if (question.length < 101 && question.length > 11) return true;
                        return 'Oylama Sorusu En Fazla 10 La 100 Arası Karakter İçermelidir.';
                    }
                },
                {
                    key: 'desc',
                    prompt: '(Gerekli Değil) Daha Fazla Açıklama Gircen mi ?',
                    type: 'string',
                    default: ' ',
                    validate: desc => {
                        if (desc.length < 201 && desc.length > 11) return true;
                        return 'Oylama Açıklaması En Fazla 10 La 100 Arası Karakter İçermelidir.';
                    }
                },
                {
                    key: 'time',
                    prompt: '(Optional) Bu Oylama Kaç Dakika Sürsün ?',
                    type: 'integer',
                    default: 0,
                    validate: time => {
                        if (time >= 0 && time <= 60) return true;
                        return 'Oylama Zamanı En Fazla 0 La 60 Arası Yazılmalı.';
                    } 
                }
            ]
        });
    }
    
    run(msg, { question, desc, time }) {
        var emojiList = ['👍','👎','🤷'];
        var embed = new RichEmbed()
            .setTitle(question)
            .setDescription(desc)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL)
            .setColor(0xD53C55) // Green: 0x00AE86
            .setTimestamp();
            
        if (time) {
            embed.setFooter(`Oylama Başladı ${time} Dakika Sonra Bitecek.`)
        } else {
            embed.setFooter(`Oylama Başladı.`)
        }
            
        //msg.delete(); // Remove the user's command message
        
        msg.channel.send({embed}) // Use a 2d array?
            .then(async function (message) {
                var reactionArray = [];
                reactionArray[0] = await message.react(emojiList[0]);
                reactionArray[1] = await message.react(emojiList[1]);
                reactionArray[2] = await message.react(emojiList[2]);
                
                if (time) {
                    setTimeout(() => {
                        // Re-fetch the message and get reaction counts
                        message.channel.fetchMessage(message.id)
                            .then(async function (message) {
                                var reactionCountsArray = [];                               
                                for (var i = 0; i < reactionArray.length; i++) {
                                    reactionCountsArray[i] = message.reactions.get(emojiList[i]).count-1;
                                }
                                
                                // Find winner(s)
                                var max = -Infinity, indexMax = [];
                                for(var i = 0; i < reactionCountsArray.length; ++i)
                                    if(reactionCountsArray[i] > max) max = reactionCountsArray[i], indexMax = [i];
                                    else if(reactionCountsArray[i] === max) indexMax.push(i);
                                  
                                // Display winner(s)
                                console.log(reactionCountsArray); // Debugging votes
                                var winnersText = "";
                                if (reactionCountsArray[indexMax[0]] == 0) {
                                    winnersText = "Kimse Oy Vermedi!"
                                } else {
                                    for (var i = 0; i < indexMax.length; i++) {
                                        winnersText += 
                                            emojiList[indexMax[i]] + " (" + reactionCountsArray[indexMax[i]] + " Oy\n";
                                    }
                                }
                                embed.addField("**Kazanan :**", winnersText);
                                embed.setFooter(`Oylama Bitti. ${time} Dakika Geçti.`);
                                embed.setTimestamp();
                                message.edit("", embed);
                            });
                    }, time * 60 * 1000);
                }
            }).catch(console.error);
    }
};