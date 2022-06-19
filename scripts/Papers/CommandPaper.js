export class CommandPaper {
    constructor() {
        this._registrationInformation = [];
    }
    /**
     * Register a command with a callback
     * @param {registerInformation} register An object of information needed to register the custom command
     * @param {(data: BeforeChatEvent, args: Array<string>) => void} callback Code you want to execute when the command is executed
     * @example .register({name: 'ping'}, (chatmsg, args) =>   Server.broadcast('Pong!', chatmsg.sender.name));
     */
    register(register, callback) {
        this._registrationInformation.push({
            private: register.private ? true : false,
            cancelMessage: register.cancelMessage ? true : false,
            name: register.name,
            lister: register.lister ? true : false,
            description: register.description ? register.description : null,
            aliases: register.aliases ? register.aliases.map(v => v.toLowerCase()) : null,
            category: register.category ? register.category.toUpperCase() : null,
            admin: register.admin ? true : false,
            documentation: register.documentation ? {
                usage: register.documentation.usage ? register.documentation.usage : null,
                information: register.documentation.information ? register.documentation.information : null,
                notes: register.documentation.notes ? register.documentation.notes : null,
                examples: register.documentation.examples ? register.documentation.examples : null,
                developers: register.documentation.developers ? register.documentation.developers : null
            } : null,
            callback
        });
    }
    /**
     * Get a list of registered commands
     * @returns {Array<string>}
     * @example .get();
     */
    get() {
        const commands = [];
        this._registrationInformation.forEach(element => {
            if (element.private)
                return;
            commands.push(element.name);
        });
        return commands;
    }
    /**
     * Get all the registered informations
     * @returns {Array<storedRegisterInformation>}
     * @example .getAllRegistration();
     */
    getAllRegistation() {
        return this._registrationInformation;
    }
    /**
     * Get registration information on a specific command
     * @param name The command name or alias you want to get information on
     * @returns {storedRegisterInformation}
     * @example .getRegistration('ping');
     */
    getRegistration(name) {
        const command = this._registrationInformation.some(element => element.name.toLowerCase() === name || element.aliases && element.aliases.includes(name));
        if (!command)
            return;
        let register;
        this._registrationInformation.forEach(element => {
            if (element.private)
                return;
            const eachCommand = element.name.toLowerCase() === name || element.aliases && element.aliases.includes(name);
            if (!eachCommand)
                return;
            register = element;
        });
        return register;
    }
}
