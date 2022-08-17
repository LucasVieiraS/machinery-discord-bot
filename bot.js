var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
require("dotenv").config();
var fs = require("fs");
var Database = require("./config/Database.ts");
var db = new Database();
db.connect();
var _a = require("discord.js"), Client = _a.Client, Intents = _a.Intents, Collection = _a.Collection;
var client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});
var commandFiles = fs.readdirSync("./src/commands").filter(function (file) { return file.endsWith(".js"); });
var commands = [];
client.commands = new Collection();
for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
    var file = commandFiles_1[_i];
    var command = require("./src/commands/".concat(file));
    var convertedJSON = command.data.toJSON();
    commands.push(convertedJSON);
    client.commands.set(command.data.name, command);
}
var eventFiles = fs
    .readdirSync("./src/events")
    .filter(function (file) { return file.endsWith(".js"); });
var _loop_1 = function (file) {
    var event_1 = require("./src/events/".concat(file));
    if (event_1.once) {
        client.once(event_1.name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event_1.execute.apply(event_1, __spreadArray(__spreadArray([], args, false), [commands], false));
        });
    }
    else {
        client.on(event_1.name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event_1.execute.apply(event_1, __spreadArray(__spreadArray([], args, false), [commands], false));
        });
    }
};
for (var _b = 0, eventFiles_1 = eventFiles; _b < eventFiles_1.length; _b++) {
    var file = eventFiles_1[_b];
    _loop_1(file);
}
client.login(process.env.TOKEN);
