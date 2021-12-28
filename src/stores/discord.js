import { writable } from "svelte/store";

const servers = writable({})
const channels = writable({})
const discord = writable({})
const messages = writable([])
const discordData = writable({})


export const serversStore = {
    subscribe: servers.subscribe,
    set: val => {
        servers.set(val);
        localStorage.setItem("servers", JSON.stringify(val));
    }
};

export const channelsStore = {
    subscribe: channels.subscribe,
    set: val => {
        channels.set(val);
        localStorage.setItem("channels", JSON.stringify(val));
    }
};

export const messagesStore = {
    subscribe: messages.subscribe,
    set: val => {
        messages.set(val);
        localStorage.setItem("messages", JSON.stringify(val));
    }
};

export const discordStore = {
    subscribe: discord.subscribe,
    set: val => {
        discord.set(val);
        localStorage.setItem("discord", JSON.stringify(val));
    }
};

function generateDiscordDummyData() {
    const { subscribe, set, update } = writable(0)
    return {
        subscribe,
        generateServers: () => generateServers(),
        generateChannels: () => {},
        generateMessages: () => {},
    }
}

function getServerData() {
    const { subscribe, set, update } = writable(0)
    return {
        subscribe,

        clearData: () => {
            set({})
        }
    }
}

function resetDiscordData() {
    const { subscribe, set, update } = writable(0)

}

function generateServers() {
    let s = [];
    [...Array(40)].map(() => {
        let id = makeid(2);
        s.push(id);
    });
    return s;
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

let localStorageSupported = (() => {
    try {
        return typeof window.localStorage !== 'undefined';
    } catch (err) {
        return false;
    }
})();

export const D = generateDiscordDummyData()