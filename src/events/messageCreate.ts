import { Message, MessageEmbed, Permissions } from "discord.js";
import { Event } from "../Interfaces";
import dotenv from 'dotenv';
dotenv.config();

export const event: Event = {
    name: 'messageCreate',
    run: async (client, message: Message) => {
        if (message.channel.type ===  'DM') return;
        if (message.author.bot || !message.content.startsWith(`${process.env.PREFIX}`)) return;
        const args = message.content.slice(1).trim().split(/ +/g);
        const cmd = args.shift()?.toLowerCase();

        message.reply('Hey!');
    },
};