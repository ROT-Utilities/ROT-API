/*
ROT Developers and Contributors:
Moises (OWNER/CEO/Developer),
notbeer (ROT's base code),
baboonie (!inven code)
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
__________ ___________________
\______   \\_____  \__    ___/
 |       _/ /   |   \|    |   
 |    |   \/    |    \    |   
 |____|_  /\_______  /____|   
        \/         \/         
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
© Copyright 2022 all rights reserved by Moisesgamingtv9. Do NOT steal, copy the code, or claim it as yours!
Please message Mo9ses#8583 on Discord, or join the ROT discord: https://discord.com/invite/2ADBWfcC6S
Website: https://www.rotmc.ml
Docs: https://docs.google.com/document/d/1hasFU7_6VOBfjXrQ7BE_mTzwacOQs5HC21MJNaraVgg
Thank you
*/
import Server from '../../ServerBook.js';
Server.command.register({
    cancelMessage: true,
    name: 'hi',
    description: 'Say hi to ROT!',
    aliases: ['wassup', 'hello!'],
    category: 'notes',
    documentation: {
        usage: 'hi',
        information: 'This command will do absolutely NOTHING!',
        notes: 'Join the Discord server here: https://discord.com/invite/2ADBWfcC6S',
        examples: [
            'hi'
        ],
        developers: ['Mo9ses']
    }
}, (chatmsg, args) => {
    Server.broadcast(`Hello §c${args.length ? args.join(' ') : chatmsg.sender.name}§7!`, chatmsg.sender.name, 'Hi');
});