import { writable } from "svelte/store";

const servers = writable({})
const channels = writable({})
const messages = writable([])


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