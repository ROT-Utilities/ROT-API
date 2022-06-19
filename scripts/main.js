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
import Server from './ServerBook.js';
import { EntityQueryOptions, Location, world } from 'mojang-minecraft';
import { setTickInterval } from './Papers/paragraphs/ExtrasParagraphs.js';
import { MS } from './Papers/paragraphs/ConvertersParagraphs.js';
/*
* Welcome to the AR page!
* Main Developer: Mo9ses
* Notes: This is the stuff that ROT always has running
* Sub developer: NOBODY!
* Link to name: Runtime
*/
let ready = false, totalTick = 1;
world.events.tick.subscribe(() => {
    if (!Server.runCommand('testfor @a').error && !ready) {
        ready = true;
        Server.broadcast(`§c§lThe ROT API has been loaded in ${totalTick} ticks!`);
    }
    totalTick++;
});
setTickInterval(() => {
    const bannedPlayers = Server.bans.getCollection(), today = new Date();
    if (bannedPlayers)
        for (let key in bannedPlayers) {
            if (bannedPlayers.hasOwnProperty(key) && bannedPlayers[key]?.bannedPlayer)
                if (bannedPlayers[key]?.unbanTime < today.getTime())
                    Server.bans.delete(key);
                else
                    for (const player of world.getPlayers())
                        if (bannedPlayers[key]?.playerUUID === Server.player.getScore('ROTplayerUUID', player.name))
                            Server.runCommand(`kick "${player.name}" §r\n§cYou have been banned for §a${MS(bannedPlayers[key]?.length)}§c from this server at §b${bannedPlayers[key]?.date}${bannedPlayers[key]?.reason ? `\n§7Reason: §r${bannedPlayers[key]?.reason}` : ''}§7. You will be unbanned in ${MS(bannedPlayers[key]?.unbanTime - today.getTime())}`);
        }
}, 20);
const rides = {};
setTickInterval(() => {
    if (!ready)
        return;
    for (const player of world.getPlayers())
        if (player.hasTag('is_sprinting') && player.hasTag('is_jumping') && !rides?.[player.nameTag]) {
            Server.runCommand(`ride "${player.nameTag}" summon_ride minecraft:horse no_ride_change minecraft:on_tame "§6§l${player.nameTag}'s Horse!"`);
            Object.assign(rides, { [player.nameTag]: 1 });
        }
        else if (!player.hasTag('is_riding') && rides?.[player.nameTag])
            delete rides[player.nameTag];
    const options = new EntityQueryOptions();
    options.type = 'minecraft:horse';
    for (const dim of ['overworld', 'nether', 'the end'])
        for (const entity of world.getDimension(dim).getEntities(options) ?? [])
            try {
                entity.runCommand(`testfor @a[r=2]`);
            }
            catch {
                entity.teleport(new Location(entity.location.x, -32767, entity.location.z), entity.dimension, 0, 0);
            }
    ;
}, 5);
world.events.entityCreate.subscribe(({ entity }) => {
    if (entity.id !== 'minecraft:horse' || entity.nameTag.startsWith('§6§l'))
        return;
    entity.triggerEvent('minecraft:horse_saddled');
    entity.triggerEvent('minecraft:make_black');
});
/*
 * Welcome to the Main page!
 * Main Developer: Mo9ses
 * Sub developer: notbeer
 * Link to name: MAIN ROT
 ***************************
 * List of all the stories!
*/ //ROT
import './Stories/ROT/Main.js';
import './Stories/ROT/help.js';
//Management
import './Stories/Management/Main.js';
import './Stories/Management/ban.js';
import './Stories/Management/ranks.js';
//Notes
import './Stories/Notes/Main.js';
import './Stories/Notes/hi.js';
