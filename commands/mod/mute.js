//eslint-disable-next-line
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const { RichEmbed } = require('discord.js');
const ms = require('ms');

module.exports = class MuteCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'mute',
      aliases: ['silence', 'turnoff', 'off', 'stfu'],
      group: 'mod',
      memberName: 'mute',
      description: 'Disables a user\'s ability to talk.',
      details: oneLine `
				This command mutes a specified user from text and voice chat.
        This is a great command for if a kick is not needed.
        Permission is locked to moderators and above.
			`,
      examples: ['mute @Bob 5m being a butt'],
      userPermissions: ['MANAGE_MESSAGES'],

      args: [{
          key: 'user',
          label: 'user',
          prompt: 'What user would you like to mute? Please specify one only.',
          type: 'member',
          infinite: false
        },
        {
          key: 'time',
          label: 'time',
          prompt: 'How long would you like to mute the user for? (Time is in hours, minutes, or seconds)',
          type: 'string',
          infinite: false
        },
        {
          key: 'reason',
          label: 'reason',
          prompt: 'Why is the user being muted?',
          type: 'string',
          infinite: false
        }
      ],

      guildOnly: true
    });
  }

  async run(message, args) {
    let modlog = this.client.provider.get(message.guild.id, 'modlogsChannel', []);
    if (!message.guild.member(this.client.user).hasPermission('MANAGE_CHANNELS')) return message.reply('I do not have permission to mute members!')
    let muted = []
    let validUnlocks = ['voice', 'unmute']
    if (validUnlocks.includes(args.time)) {
      //eslint-disable-next-line array-callback-return
      message.guild.channels.map((channel) => {
        channel.overwritePermissions(args.user, {
            SEND_MESSAGES: null,
            ADD_REACTIONS: null,
            SPEAK: null
          })
          .then(() => console.log('Done per 1 channel.'))
          .catch(err => {
            if (err) console.error(err)
            //eslint-disable-next-line no-undef
            if (errcount === 0) {
              message.reply('**Failed to mute in one or more channels.** Please mute manually or give me administrator permission and try again.')
              //eslint-disable-next-line no-undef
              errcount++
              //eslint-disable-next-line no-undef
            } else return console.log(`errcount === ${errcount}`)
          });
      }).then(function() {
        message.delete(1);
        message.channel.send(`:loud_sound: ${args.user.user.tag} unmuted by ${message.author.tag}.`);
        const embed = new RichEmbed()
          .setTitle(':bangbang: **Moderation action** :scales:')
          .setAuthor(`${message.author.tag} (${message.author.id})`, `${message.author.avatarURL}`)
          .setColor(0x00FF00)
          .setDescription(`**Action:** Unmute \n**User:** ${args.user.user.tag} (${args.user.id}) \n**Reason:** ${args.reason}`)
          .setTimestamp()
        message.delete(1);
        message.guild.channels.get(modlog).send({
          embed: embed
        });
        clearTimeout(muted[args.user.id]);
        //eslint-disable-next-line prefer-reflect
        delete muted[args.user.id];
        //eslint-disable-next-line newline-per-chained-call
      }).catch(error => {
        console.log(error)
      })
    } else {
      let count = 0;
      let count2 = 0;
      //console.log(`first ${count2}`)
      let client = this.client
      //eslint-disable-next-line array-callback-return
      message.guild.channels.map((channel) => {
        channel.overwritePermissions(args.user, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SPEAK: false
          })
          .then(function() {
            if (count === 0) {
              count++;
              message.delete(1);
              message.channel.send(`:mute: ${args.user.user.tag} muted for ${ms(ms(args.time), { long: true })} by ${message.author.tag}. (Do \`${message.guild.commandPrefix}mute unmute ${args.user} <reason>\` to unmute.)`).then(() => {
                const embed = new RichEmbed()
                  .setTitle(':bangbang: **Moderator action** :scales:')
                  .setAuthor(`${message.author.tag} (${message.author.id})`, `${message.author.avatarURL}`)
                  .setColor(0xCC5200)
                  .setDescription(`**Action:** Mute \n**User:** ${args.user.user.tag} (${args.user.id}) \n**Reason:** ${args.reason} \n**Time:** ${ms(ms(args.time), { long: true })}`)
                  .setTimestamp()
                message.guild.channels.get(modlog).send({embed});
                muted[args.user.id] = setTimeout(() => {
                  //console.log(`third ${count2}`)
                  //eslint-disable-next-line array-callback-return, no-unused-vars
                  message.guild.channels.map((channel) => {
                    channel.overwritePermissions(args.user, {
                      SEND_MESSAGES: null,
                      ADD_REACTIONS: null,
                      SPEAK: null
                    }).then(function() {
                      if (count2 === 0) {
                        count2++
                        message.channel.send(`:loud_sound: ${args.user.user.tag} unmuted.`);
                        const embed = new RichEmbed()
                          .setTitle(':bangbang: **Moderation action** :scales:')
                          //eslint-disable-next-line no-invalid-this
                          .setAuthor(`${client.user.tag} (${client.user.id})`, `${client.user.avatarURL}`)
                          .setColor(0x00FF00)
                          .setDescription(`**Action:** Unmute \n**User:** ${args.user.user.tag} (${args.user.id}) \n**Reason:** Time ended, mute expired`)
                          .setTimestamp()
                        message.guild.channels.get(modlog).send({
                          embed: embed
                        });
                      }
                    });
                    //eslint-disable-next-line prefer-reflect
                    delete muted[args.user.id]
                  })
                }, ms(args.time))
                //eslint-disable-next-line newline-per-chained-call
              }).catch(error => {
                console.log(error)
              });
            }
          })
      });
    }
  }
};