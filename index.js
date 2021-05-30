const discord = require('discord.js')
const bot = new discord.Client()
const prefix = "&"
const token = require("./token.json")
const bdd = require("./bdd.json")
const ytdl = require("ytdl-core")

var list = [];

// Status du bot
bot.on('ready', function () {
    bot.user.setStatus('online').catch(console.error)
    bot.user.setActivity("au Codage", {type: 'CUSTOM_STATUS'}).catch(console.error)
    console.log('JE SUIS PRÊT !')
    console.log('Bonjour seigneur Zeloxsun')
})

// Bienvenue dans le groupe ! (message en MP)
bot.on('guildMemberAdd', function (member) {
    member.createDM().then(function (channel) {
        return channel.send('Bienvenue dans le groupe ' + member.displayName + ' !')
    }).catch(console.error)
})

// Réponse aux membres (Bonjour !)
bot.on('message', function (message) {
    if (message.content === 'salut') {
        message.channel.send('salut !');
    }
});

bot.on('message', function (message) {
    if (message.content === 'slt') {
        message.channel.send('salut !');
    }
});

// min
bot.on('message', function (message) {
    if (message.content === 'bonjour') {
        message.channel.send('bonjour !');
    }
});

// maj
bot.on('message', function (message) {
    if (message.content === 'Bonjour') {
        message.channel.send('Bonjour !');
    }
});

// min
bot.on('message', function (message) {
    if (message.content === 'bonsoir') {
        message.channel.send('bonsoir !');
    }
});

// maj
bot.on('message', function (message) {
    if (message.content === 'Bonsoir') {
        message.channel.send('Bonsoir !');
    }
});

// coucou --- coucou^^
bot.on('message', function (message) {
    if (message.content === 'coucou') {
        message.channel.send('coucou^^');
    }
});

bot.on('message', function (message) {
    if (message.content === 'cc') {
        message.channel.send('coucou^^');
    }
});

// yo
bot.on('message', function (message) {
    if (message.content === 'yo') {
        message.channel.send('yo !');
    }
});

// hey
bot.on('message', function (message) {
    if (message.content === 'hey') {
        message.channel.send('Hey !');
    }
});

bot.on('message', function (message) {
    if (message.content === 'hey !') {
        message.channel.send('Hey !');
    }
});

// Question sur le créateur du bot
bot.on('message', function (message) {
    if (message.content === prefix + 'créateur') {
        message.channel.send("Zeloxsun est mon créateur !")
    }
})

// help !
bot.on('message', function (message) {
    if (message.content === 'help') {
        message.channel.send("Si vous avez des questions, l'équipe du staff est toujours là pour vous !");
    }
});

bot.on('message', function (message) {
    if (message.content === prefix + 'event') {
        message.channel.send("**L'événement __manga__ arrive ! Préparez_vous !**");
    }
});

// test
bot.on('message', function (message) {
    if (message.content === '&test') {
        message.channel.send('Je suis bien présent');
    }
});

// ban/deban | kick | mute/unmute
// Le tempmute ne marche pas !

// Ban/tempban un membre
bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return;

    if(message.member.hasPermission('ADMINISTRATOR')){
        if(message.content.startsWith(prefix + 'ban')){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.channel.send('Membre non ou mal mentionné !');
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + ' a été banni avec succès !');
                }
                else {
                    message.channel.send('Impossible de bannir ce membre !');
                }
            }
        }
        else if(message.content.startsWith(prefix + 'tempban')){

        }
    }
})

// Kick un membre
bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return;

    if(message.member.hasPermission('ADMINISTRATOR')){
        if(message.content.startsWith(prefix + 'kick')){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.channel.send('Membre non ou mal mentionné !');
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + ' a été expulsé avec succès !');
                }
            }
        }
    }
})

// mute/unmute/tempmute un membre
bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return;

    if(message.member.hasPermission('ADMINISTRATOR')){
        if(message.content.startsWith(prefix + 'mute')){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.channel.send("Membre non ou mal mentionné !")
            }
            else {
                mention.roles.add('836869209618382849')
                message.channel.send(mention.displayName + ' a été mute avec succès !')
            }
        }
        else if(message.content.startsWith(prefix + 'unmute')){
            let mention = message.mentions.members.first();
            
            if(mention == undefined){
                message.channel.send('Membre non ou mal mentionné !');
            }
            else {
                mention.roles.remove('836869209618382849')
                message.channel.send(mention.displayName + ' a été unmute avec succès !')
            }
        }
        else if(message.content.startsWith(prefix + 'tempmute')){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.channel.send('Membre non ou mal mentionné !')
            }
            else {
                let args = message.content.split(" ");

                mention.roles.add('836869209618382849')
                setTimeout(function() {
                    mention.roles.remove('836869209618382849');
                    message.channel.send('<é' + mention.id + '> tu peux désormais parler de nouveau !')
                }, args[2] * 1000);
            }
        }
    }
})

// !clear (efface les messages)
bot.on('message', message => {
    if(message.member.permissions.has('MANAGE_MESSAGES')){
        if(message.content.startsWith(prefix + 'clear')){
            let args = message.content.split(" ");
            
            if(args[1] == undefined){
                message.channel.send('Nombre de message non ou mal défini !');
            }
            else {
                let number = parseInt(args[1]);

                if(isNaN(number)){
                    message.channel.send('Nombre de message non ou mal défini !');
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        message.channel.send('Suppression de message réussi !');
                        console.log('Suppression de ' + messages.size + ' message réussi !');
                    }).catch(err => {
                        console.log('Erreur de clear :' + err);
                    });
                }
            }
        }
    }
})



// Musique
bot.on('message', function (message) {
    if(message.content.startsWith(prefix + "play")){
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");

                if(!args[1]){
                    message.reply("Lien de la vidéo non ou mal mentionné !");
                    connection.disconnect();
                }
                else {
                
                let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio" }));

                dispatcher.on("finish", () => {
                    dispatcher.destroy();
                    connection.disconnect();
                });

                dispatcher.on("error", err => {
                    console.log("erreur de dispatcher : " + err);
                });

                }
            }).catch(err => {
                message.reply("Erreur lors de la connexion : " + err);
            });
        }
        else {
            message.reply("Vous n'êtes pas connecté dans un salon vocal")
        }
    }
});

// Serveur(s) autorisé(s) à avoir le bot | (DarkSlunderStudios(DSS))
bot.on('guildCreate', guild => {

    if(guild.id !== '821618852274110464') return guild.leave()

    bdd[guild.id] = {}
    Savebdd()
})

bot.login(process.env.token);