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
import { PlayerPaper } from '../PlayerPaper.js';
import { world } from 'mojang-minecraft';
import config from '../../config.js';
/**
* Welcome to the ROT's Extras!
* Main Developer: notbeer
* Notes: I don't really know what goes on down here...
* Sub developer: Mo9ses
* Link to name: Miscellaneous
****************************************
* @function getRanks Gets the ranks of the player you select
* @param {string} player the player
* @example getRanks(Mo9ses);
*/
export const getRanks = (player: string) => {
    const ranks = new PlayerPaper().getTags(player)?.filter(tag => tag.startsWith('rank:'));
    return (ranks?.[0] ? ranks.map(rank => rank.replace('rank:', '').trim()).join('§r§7, ') : config.defaultRank) + '§r§7';
},
/**
 * Delay executing a function, REPEATEDLY
 * @typedef
 * @param {string | Function} handler Function you want to execute
 * @param {number} [timeout] Time delay in ticks. 20 ticks is 1 second
 * @param {any[]} args Function parameters for your handler
 * @returns {number}
 */
setTickInterval = (handler: string | Function, timeout?: number, ...args: any[]): number =>{
    const tickInterval = {callback: handler, tick: timeout, args };
    tickIntervalID++;
    tickIntervalMap.set(tickIntervalID, tickInterval);
    return tickIntervalID;
};
const tickTimeoutMap = new Map(), tickIntervalMap = new Map();
let totalTick = 0, tickIntervalID = 0;
world.events.tick.subscribe(() => {
    totalTick++;
    for(const [ID, tickTimeout] of tickTimeoutMap) {
        tickTimeout.tick--;
        if(tickTimeout.tick <= 0) {
            tickTimeout.callback(...tickTimeout.args);
            tickTimeoutMap.delete(ID);
        };
    };
    for(const [, tickInterval] of tickIntervalMap) {
        if(totalTick % tickInterval.tick === 0) tickInterval.callback(...tickInterval.args);
    };
});