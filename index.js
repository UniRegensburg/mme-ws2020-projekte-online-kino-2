/* eslint-env node */
import AppServer from "./server/AppServer.js";
import Discord from "discord.js";
var appServer;
//const BOT_TOKEN="ODI0NTYwNjQ3NTM0MjgwNzI0.YFxJ8Q.KKgL88rdHBeVU6qmEkvlPCkWB88";

function init() {
    appServer = new AppServer("app", "libs", "utils", 5500);
   // appServer.addEventListener("new socket registered", synchronizeVideoData.bind(appServer));
    console.log("appServer " + appServer);
    console.log("Hallo, hier bin ich");
    appServer.start(5500);

    /*const client =new Discord.Client();
    
    /*client.on('ready', () => {
        // List servers the bot is connected to
        console.log("Servers: ")
        client.guilds.forEach((guild) => {
            console.log(" Hier - " + guild.name)
    
            // List all channels
            guild.channels.forEach((channel) => {
                console.log(`Kuku -- ${channel.name} (${channel.type}) - ${channel.id}`)
            })
        })
    })
*/
    /*client.on('message', async message => {
        /*if (!message.guild) return;
        if (message.content === 'join') {
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
        } else {
            message.channel.send('You need to join a voice channel first!');
        }
        }

        if (message.content === 'tschuss') {
            // Only try to join the sender's voice channel if they are in one themselves
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.disconnect();
            } else {
                message.channel.send('You need to join a voice channel first!');
            }
            }
    });/*
    client.on("ready", () => {
        const channel = client.channels.cache.get("123456789");
        if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
            // Yay, it worked!
            console.log("Successfully connected.");
        }).catch(e => {
    
            // Oh no, it errored! Let's log it to console :)
            console.error(e);
        });
    });*/
    /*client.login(BOT_TOKEN);
}*/
}
init();
