import { Client, Collection, ApplicationCommandDataResolvable } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { Command, Event, RegisterCommandsOptions } from '../Interfaces';
import { readdirSync } from 'fs';

class Bot extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public config = process.env;
    public aliases: Collection<string, Command> = new Collection();

    public constructor() {
        super({
            intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_WEBHOOKS', 'GUILD_MEMBERS'],
            partials: ['CHANNEL', 'GUILD_MEMBER', 'USER', 'MESSAGE'],
        });
    }

    async importFile(filePath: string) {
        return (await import(filePath))?.slash
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log('Registrei comandos em certo servidor.')
        } else {
            this.application?.commands.set(commands);
            console.log('Registrei comandos globalmente.')
        }
    }

    async registerModules() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];

        const commandPath = path.join(__dirname, '..', 'Commands');

        readdirSync(commandPath).forEach((dir) => {
            const commands = readdirSync(`${commandPath}/${dir}`).filter((file) =>
                file.endsWith('.ts')
            );
            commands.forEach(async (file) => {
                const command: Command = await this.importFile(`${commandPath}/${dir}/${file}`);
                console.log(command.name + ' foi carregado com sucesso!');
                if (!command.name) return;
                this.commands.set(command.name, command);
                slashCommands.push(command);
            });
        });

        this.on('ready', () => {
            this.registerCommands({
                commands: slashCommands,
                guildId: `${this.config.TESTSERVER}`,
            });
        });
    }

    public async init() {
        this.login(this.config.TOKEN);
        this.registerModules();

        if (!this.config.TESTSERVER) console.log('Não configurou o servidor de testes.');

        const status = [
            '🥇 As melhores \n opções de automatização para seu servidor estão aqui!',
            '⚙️ Open Source! \n https://github.com/LucasVieiraS/Machinery'
        ]

        let i = 0;
        setInterval(() => this.user?.setActivity(`${status[i++ % status.length]}`, {
            type: 'PLAYING',
        }), 6000 * 15);

        const eventPath = path.join(__dirname, '..', 'Events');
        readdirSync(eventPath).forEach(async (file) => {
            if(!file.endsWith('.ts')) return;
            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });
    }
}

export default Bot;