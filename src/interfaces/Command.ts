import { CommandInteraction, ChatInputApplicationCommandData, GuildMember, ApplicationCommandData, CommandInteractionOptionResolver} from "discord.js";
import { TypeInfo } from "ts-node";
const { SlashCommandBuilder } = require("@discordjs/builders");

import Client from '../Client';

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
};

interface RunOptions {
    client: Client;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;
}

type Run = (options: RunOptions) => any;

export type Command = ApplicationCommandData & {
    name: string;
    slashOptions: object,
    description: string;
    testOnly: boolean;
    execute: Run;
} & ChatInputApplicationCommandData;