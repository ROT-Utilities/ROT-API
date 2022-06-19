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
*****************************************************
* This will display in text in thousands, millions and etc... For ex: "1400 -> "1.4k", "1000000" -> "1M", etc...
* @param {number} number The number you want to convert
* @returns {string}
* @example metricNumbers(15000);
*/
export const metricNumbers = (value) => {
    const types = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"], selectType = Math.log10(value) / 3 | 0;
    if (selectType == 0)
        return value;
    let scaled = value / Math.pow(10, selectType * 3);
    return scaled.toFixed(1) + types[selectType];
}, 
/**
* Convert string to binary
* @param text
* @returns {string}
*/
textToBinary = (text) => {
    return text.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
}, 
/**
* Convert binary to string
* @param binary
* @returns {string}
*/
binaryToText = (binary) => {
    return binary.split(' ').map(char => String.fromCharCode(parseInt(char, 2))).join('');
}, scoreToText = (score) => {
    let binary = '', scoreArry = score.toString().split('').reverse();
    for (let i = 7; i >= 0; i--)
        binary += scoreArry[i] > 0 ? scoreArry[i] : 0;
    return binaryToText(binary);
};
export function MS(value, { compactDuration, fullDuration, avoidDuration } = {}) {
    try {
        if (typeof value === 'string') {
            if (/^\d+$/.test(value))
                return Number(value);
            const durations = value.match(/-?\d*\.?\d+\s*?(years?|yrs?|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?|milliseconds?|msecs?|ms|[smhdwy])/gi);
            return durations ? durations.reduce((a, b) => a + toMS(b), 0) : null;
        }
        if (typeof value === 'number')
            return toDuration(value, { compactDuration, fullDuration, avoidDuration });
        throw new Error('Value is not a string or a number');
    }
    catch (err) {
        const message = isError(err)
            ? `${err.message}. Value = ${JSON.stringify(value)}`
            : 'An unknown error has occured.';
        throw new Error(message);
    }
}
;
/**
 * Convert Durations to milliseconds
 */
const toMS = (value) => {
    const number = Number(value.replace(/[^-.0-9]+/g, ''));
    value = value.replace(/\s+/g, '');
    if (/\d+(?=y)/i.test(value))
        return number * 3.154e+10;
    if (/\d+(?=w)/i.test(value))
        return number * 6.048e+8;
    if (/\d+(?=d)/i.test(value))
        return number * 8.64e+7;
    if (/\d+(?=h)/i.test(value))
        return number * 3.6e+6;
    if (/\d+(?=m)/i.test(value))
        return number * 60000;
    if (/\d+(?=s)/i.test(value))
        return number * 1000;
    if (/\d+(?=ms|milliseconds?)/i.test(value))
        return number;
};
/**
 * Convert milliseconds to durations
 */
const toDuration = (value, { compactDuration, fullDuration, avoidDuration } = {}) => {
    const absMs = Math.abs(value);
    const duration = [
        { short: 'w', long: 'week', duration: Math.floor(absMs / 6.048e+8) },
        { short: 'd', long: 'day', duration: Math.floor(absMs / 8.64e+7) % 7 },
        { short: 'h', long: 'hour', duration: Math.floor(absMs / 3.6e+6) % 24 },
        { short: 'm', long: 'minute', duration: Math.floor(absMs / 60000) % 60 },
        { short: 's', long: 'second', duration: Math.floor(absMs / 1000) % 60 },
        { short: 'ms', long: 'millisecond', duration: absMs % 1000 }
    ];
    const mappedDuration = duration
        .filter(obj => obj.duration !== 0 && avoidDuration ? fullDuration && !avoidDuration.map(v => v.toLowerCase()).includes(obj.short) : obj.duration)
        .map(obj => `${Math.sign(value) === -1 ? '-' : ''}${compactDuration ? `${Math.floor(obj.duration)}${obj.short}` : `${Math.floor(obj.duration)} ${obj.long}${obj.duration === 1 ? '' : 's'}`}`);
    const result = fullDuration ? mappedDuration.join(compactDuration ? ' ' : ', ') : mappedDuration[0];
    return result || `${absMs}`;
};
/**
 * A type guard for errors.
 */
const isError = (error) => {
    return typeof error === 'object' && error !== null && 'message' in error;
};
