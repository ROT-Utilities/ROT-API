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
import { ServerPaper } from './ServerPaper.js';
/*
 * Welcome to the Entity Builder page!
 * Main Developer: notbeer
 * Notes: Before ROT V2, This page was super useful...
 * Sub developer: NOBODY!
 * Link to name: Entity Builder
*/
export class EntityPaper {
    /**
     * Look for a tag on entitie(s)
     * @param {string} tag Tag you are seraching for(WARNING: Color Coding with § is ignored)
     * @param {string} [target] Requirements for the entity
     * @return {boolean}
     * @example .findTag("villager", '[type=villager]');
     */
    findTag(tag, target) {
        const allTags = this.getTags(target);
        if (!allTags)
            return false;
        for (const Tag of allTags)
            if (Tag.replace(/§./g, '').match(new RegExp(`^${tag.replace(/§./g, '')}$`)))
                return true;
        return false;
    }
    /**
     * Get all the tag on entitie(s)
     * @param {string} [target] Requirements for the entity
     * @returns {Array<string> | null}
     * @example .getTags('[type=villager,name="Bob"]');
     */
    getTags(target) {
        const data = new ServerPaper().runCommand(`tag @e${target ? `[${target.replace(/\]|\[/g, '')}]` : ''} list`);
        if (data.error)
            return;
        let tags = data.statusMessage.match(/(?<=: ).*$/);
        if (tags)
            return tags[0].split('§r, §a');
    }
    /**
     * Get score of an entity
     * @param {string} objective Objective name you want to search
     * @param {string} [target] Requirements for the entity
     * @param {number} [minimum] Minumum score you are looking for
     * @param {number} [maximum] Maximum score you are looking for
     * @returns {number | null}
     * @example .getScore('Money', '[type=villager,name="Bob"]', {minimum: 0 });
     */
    getScore(objective, target, { minimum, maximum } = {}) {
        const data = new ServerPaper().runCommand(`scoreboard players test @e${target ? `[${target.replace(/\]|\[/g, '')}]` : ''} ${objective} ${minimum ? minimum : '*'} ${maximum ? maximum : '*'}`);
        if (data.error)
            return;
        return parseInt(data.statusMessage.match(/-?\d+/)[0]);
    }
}
