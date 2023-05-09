import { confetti } from '/twitch-overlay/assets/lib/dom-confetti.js';

let Chat = {
    info: {
        emotes: {}
    }
};

let emoteLimitPerMessage = 8;

function emoteToChatisEmote(seventvEmote, global) {
    const webpFiles = seventvEmote.host.files
        .filter(file => file.format === 'WEBP');
    const maxSizeName = webpFiles[webpFiles.length - 1].name;
    return {
        platform: 'stv',
        id: seventvEmote.id,
        image: 'https:' + seventvEmote.host.url + '/' + (maxSizeName || '4x.webp'),
        global: global,
        zeroWidth: (seventvEmote.flags & 256) !== 0 // EmoteFlagsZeroWidth = 256
    }
}

let endpoints = ['emote-sets/global', 'users/twitch/' + encodeURIComponent(twitchChannelId)];
endpoints.forEach((endpoint, index) => {
    $.getJSON('https://7tv.io/v3/' + endpoint).done(function (res) {
        const emotes = (res.emotes || res.emote_set.emotes);
        emotes.forEach(emoteWithMeta => {
            const emote = emoteWithMeta.data;
            Chat.info.emotes[emoteWithMeta.name] = emoteToChatisEmote(emote,
                endpoint === 'emote-sets/global');
        });
    });
});

function emoteWallSpawn(msg, context) {
    //if( !window.emoteWall ) return;

    let spawnCount = 0;

    if (context['emotes'] != null) {
        for (const emote in context['emotes']) {
            let i = 0;
            for (i = 0; i < context['emotes'][emote].length; i++) {
                if(spawnCount > emoteLimitPerMessage) return;
                confetti(document.getElementById('container'), {
                    image: 'https://static-cdn.jtvnw.net/emoticons/v2/' + emote + '/default/dark/3.0',
                    width: '128px',
                    height: '128px'
                });
                spawnCount++;
            }
        }
    }

    let tokens = msg.split(' ');

    tokens.forEach(token => {
        if(spawnCount > emoteLimitPerMessage) return;
        if (token in Chat.info.emotes) {
            confetti(document.getElementById('container'), {
                image: Chat.info.emotes[token].image,
                width: '128px',
                height: '128px'
            });
            spawnCount++;
        }
    });
}

window.emoteWallSpawn = emoteWallSpawn;