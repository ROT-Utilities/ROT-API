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
import { CommandPaper } from './Papers/CommandPaper.js'
import { ServerPaper } from './Papers/ServerPaper.js';
import { PlayerPaper } from './Papers/PlayerPaper.js';
import { EntityPaper } from './Papers/EntityPaper.js';
import { DatabasePaper } from './Papers/DatabasePaper.js';
import { getRanks } from './Papers/paragraphs/ExtrasParagraphs.js';
import { world } from 'mojang-minecraft';
import config from './config.js';
/*
 * Welcome to the SERVER Book!
 * Main Developer: notbeer
 * Notes: Now all the code above is combined into this section here
 * Sub developer: Mo9ses
 * Link to name: Server Code
*/
class NewServerBook extends ServerPaper {
    //Server classes
    public command = new CommandPaper();
    public player = new PlayerPaper();
    public entity = new EntityPaper();
    //Databases
    public bans = new DatabasePaper('BS');
    constructor() {
        super();
        this._buildEvent();
    }
    /**
     * @private
     */
    private _buildEvent() {
        world.events.beforeChat.subscribe(data => {
            const time = new Date();
            data.cancel = true;
            /**
             * This is for the command builder and chatranks
             */
            if(!data.message.startsWith(config.prefix)) {
                if(data.message.trim() === '') return;
                return this.broadcast(`§7[${getRanks(data.sender.name)}] ${data.sender.name}§r§7: §f` + data.message.charAt(0).toUpperCase() + data.message.slice(1), '@a', '', false);
            }
            const args = data.message.slice(config.prefix.length).trim().split(/\s+/),
            command = args.shift().toLowerCase(),
            getCommand = this.command.getAllRegistation().some(element => element.name === command || element.aliases && element.aliases.includes(command));
            if(!this.player.find(data.sender.name)) return;
            if(!getCommand) return this.eBroadcast('That is not a command you can do on this server!', data.sender.name, 'ROT');
            this.command.getAllRegistation().forEach(element => {
                if(element.name !== command) {
                    if(!element.aliases) return;
                    if(element.aliases && !element.aliases.includes(command)) return;
                }
                /**
                 * Registration callback
                 */
                if(element?.cancelMessage) data.cancel = true;
                if(element?.admin && !this.player.isAdmin(data.sender.name)) return this.eBroadcast('You think you have rights?', data.sender.name, 'ROT');
                const cmd = () => element.callback(data, args), postCMDTime = Date.now();
                try {
                    cmd();
                } catch (error) {
                    this.eBroadcast(error + ':' + error.stack, data.sender.name, 'ROT');
                } finally {
                    if(config.tellme) this.broadcast(`Commad executed in §c${Date.now() - postCMDTime}§7 MS!`, data.sender.name, 'ROT');
                }
            })
        })
    }
}
/**
 * Import this constructor
 */
const Server = new NewServerBook();
export default Server;