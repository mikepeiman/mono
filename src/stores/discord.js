import { writable } from "svelte/store";
import random from 'canvas-sketch-util/random.js';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        min: 1,
        max: 8
    },
    wordsPerSentence: {
        min: 4,
        max: 16
    }
});


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
        generateChannels: () => generateChannels(),
        generateMessages: () => generateMessages(),
        clearData: () => {
            set({})
        }
    }
}

function getServerData(serverId) {
    const { subscribe, set, update } = writable(0)
    return {
        subscribe,
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
function generateChannels() {
    let c = [];
    [...Array(40)].map(() => {
        let channel = makeid(random.range(6, 18));
        c.push(channel);
    });
    return c;
}
function generateMessages() {
    let m = [];
    [...Array(40)].map(() => {
        let message = lorem.generateSentences(Math.floor(random.range(1, 8)));
        m.push(message);
    });
    return m;
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


function saveData(data) {
    if (localStorageSupported) {
        window.localStorage.setItem(`${data}`, JSON.stringify(data));
    }
}

function readData(data) {
    if (localStorageSupported) {
        try {
            const prev = window.localStorage.getItem(`${data}`);
            if (!prev) return;
            const newData = JSON.parse(prev);
            Object.assign(data, newData);
        } catch (err) {
            console.warn(err);
        }
    }
}

export const D = generateDiscordDummyData()