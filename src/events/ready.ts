import { Event } from "../Interfaces";

export const event: Event = {
    name: 'ready',
    run: (client) => {
        console.log(`[CLIENT]: ${client.user?.username} está no ar!`);
    },
}