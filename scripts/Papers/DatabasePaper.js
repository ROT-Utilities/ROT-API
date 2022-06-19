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
import { textToBinary, scoreToText } from './paragraphs/ConvertersParagraphs.js';
/*
 * Welcome to the Database Builder page!
 * Main Developer: notbeer
 * Notes: Props to notbeer for this cool database system!
 * Sub developer: Mo9ses
 * Link to name: DataBase Builder
*/
export class DatabasePaper {
    constructor(table) {
        this.runCommand = new ServerPaper().runCommand;
        this.runCommands = new ServerPaper().runCommands;
        if (!table)
            throw Error('[Database] constructor(): Error - Provide a table name!');
        if (('ROTdb_' + table).length > 16)
            throw Error('[Database] constructor(): Error - The table name is too long!');
        this.table = table;
        this.runCommand(`scoreboard objectives add "ROTdb_${table}" dummy`);
    }
    /**
     * Get key score for a fake player on the database
     * @param {string} key
     * @returns {number}
     * @example .getScore('ROTidk');
     */
    getScore(key) {
        const data = this.runCommand(`scoreboard players test "${key}" "ROTdb_${this.table}" * *`);
        if (data.error)
            return;
        return parseInt(data.statusMessage.match(/-?\d+/)[0]);
    }
    /**
     * Use this to set a fake playor score in the table without using the database system
     * @param key The name of the player
     * @param value The int it will hold
     */
    setScore(key, value) {
        this.runCommand(`scoreboard players set "${key}" "ROTdb_${this.table}" ` + value);
    }
    /**
     * Save a value or update a value in the Database under a key
     * @param {string} key The key you want to save the value as
     * @param {any} value The value you want to save
     * @param {boolean} memoryKey You can save the key and call for it later using .getCollection();
     * @example .set('Test Key', 'Test Value');
     */
    set(key, value, memoryKey) {
        let keyLength = this.getScore(key + 'L') + 1, j = 1;
        if (keyLength !== 1) {
            for (let l = 1; l < keyLength; l++)
                this.runCommand(`scoreboard players reset "${key + l}" "ROTdb_${this.table}"`);
            this.runCommand(`scoreboard players reset "${key}L" "ROTdb_${this.table}"`);
        }
        for (const binary of textToBinary(JSON.stringify(value)).split(' ')) {
            this.runCommands([
                `scoreboard players add "${key}L" "ROTdb_${this.table}" 1`,
                `scoreboard players set "${key + j}" "ROTdb_${this.table}" ` + binary
            ]);
            j++;
        }
        if (!memoryKey)
            return;
        let tableLength = this.getScore('AllKeysLen') + 1, allKeys = '', m = 1;
        if (!tableLength)
            for (const binary of textToBinary(JSON.stringify(key)).split(' ')) {
                this.runCommands([
                    `scoreboard players add "AllKeysLen" "ROTdb_${this.table}" 1`,
                    `scoreboard players set "AllKeysLen${m}" "ROTdb_${this.table}" ` + binary
                ]);
                m++;
            }
        else
            try {
                for (let l = 1; l < tableLength; l++)
                    allKeys += scoreToText(this.getScore('AllKeysLen' + l));
            }
            finally {
                allKeys = JSON.parse(allKeys);
                if (allKeys.split('/r/').includes(key))
                    return;
                for (let l = 1; l < tableLength; l++)
                    this.runCommand(`scoreboard players reset "AllKeys${l}" "ROTdb_${this.table}"`);
                this.runCommand(`scoreboard players reset "AllKeysLen" "ROTdb_${this.table}"`);
                for (const binary of textToBinary(JSON.stringify(allKeys += '/r/' + key)).split(' ')) {
                    this.runCommands([
                        `scoreboard players add "AllKeysLen" "ROTdb_${this.table}" 1`,
                        `scoreboard players set "AllKeysLen${m}" "ROTdb_${this.table}" ` + binary
                    ]);
                    m++;
                }
            }
    }
    /**
     * Get the value of the key
     * @param {string} key
     * @returns {any}
     * @example .get('Test Key');
     */
    get(key) {
        let length = this.getScore(key + 'L') + 1, value = '';
        if (length - 1 === 0)
            return;
        try {
            for (let l = 1; l < length; l++)
                value += scoreToText(this.getScore(key + l));
        }
        finally {
            return JSON.parse(value);
        }
    }
    /**`
     * Check if the key exists in the table
     * @param {string} key
     * @returns {boolean}
     * @example .has('Test Key');
     */
    has(key) {
        return this.getScore(key + 'L') ? true : false;
    }
    /**
     * Delete the key from the table
     * @param {string} key
     * @returns {boolean}
     * @example .delete('Test Key');
     */
    delete(key) {
        let length = this.getScore(key + 'L') + 1, tableLength = this.getScore('AllKeysLen') + 1, allKeys = [], m = 1;
        if (length === 1)
            return;
        for (let l = 1; l < length; l++)
            this.runCommand(`scoreboard players reset "${key + l}" "ROTdb_${this.table}"`);
        this.runCommand(`scoreboard players reset "${key}L" "ROTdb_${this.table}"`);
        if (tableLength !== 1)
            try {
                for (let l = 1; l < tableLength; l++)
                    allKeys.push(scoreToText(this.getScore('AllKeysLen' + l)));
            }
            finally {
                allKeys = JSON.parse(allKeys.join('')).split('/r/');
                if (!allKeys.includes(key))
                    return;
                for (let l = 1; l < tableLength; l++)
                    this.runCommand(`scoreboard players reset "AllKeysLen${l}" "ROTdb_${this.table}"`);
                this.runCommand(`scoreboard players reset "AllKeysLen" "ROTdb_${this.table}"`);
                allKeys = allKeys.filter((testKey) => {
                    if (testKey !== key)
                        return testKey;
                });
                if (allKeys[0] !== undefined)
                    for (const binary of textToBinary(JSON.stringify(allKeys.join('/r/'))).split(' ')) {
                        this.runCommands([
                            `scoreboard players add "AllKeysLen" "ROTdb_${this.table}" 1`,
                            `scoreboard players set "AllKeysLen${m}" "ROTdb_${this.table}" ` + binary
                        ]);
                        m++;
                    }
            }
    }
    /**
     * Deletes every key along their corresponding value in the Database
     * @returns {void} returns nothing
     * @example .clear();
     */
    clear() {
        this.runCommands([
            `scoreboard objectives remove "ROTdb_${this.table}"`,
            `scoreboard objectives add "ROTdb_${this.table}" dummy`
        ]);
    }
    /**
     * Gets all the saved memory keys in the table
     * @returns {string[]} A array with all the keys
     * @example .allKeys();
     */
    allkeys() {
        let tableLength = this.getScore('AllKeysLen') + 1, allKeys = '';
        if (tableLength === 1)
            return;
        try {
            for (let l = 1; l < tableLength; l++)
                allKeys += scoreToText(this.getScore('AllKeysLen' + l));
        }
        finally {
            return JSON.parse(allKeys).split('/r/');
        }
    }
    /**
     * Gets all the saved memory keys in the table then gets their value
     * @returns {string[]} A array with all the values
     * @example .allValues();
     */
    allValues() {
        const allKeys = this.allkeys();
        if (!allKeys)
            return;
        return allKeys.map(key => this.get(key));
    }
    /**
     * Gets every memory key along their corresponding memory value in the Database
     * @returns {any} I ain't even know bro...
     * @example .clear();
     */
    getCollection() {
        let allKeys = this.allkeys(), collection = {};
        if (!allKeys)
            return;
        allKeys.forEach((key) => Object.assign(collection, { [key]: this.get(key) }));
        return collection;
    }
}
