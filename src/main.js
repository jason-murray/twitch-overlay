const opts = {
    channels: [
        twitchChannel
    ]
};

let actionHandlers = {};
let allHandlers = [];

// Create a client with our options defined at the top of the file
let client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    // Remove whitespace from chat message
    const command = msg.trim();

    let handlerName;
    if (command.indexOf(" ") > -1) {
        handlerName = command.substring(0, command.indexOf(" "));
    } else {
        handlerName = command;
    }

    console.log(handlerName);

    // Handle the rest of chat not using commands
    for (const handler of allHandlers) {
        if (handler.security(context, command)) {
            handler.handle(context, command);
        }
    }

    // Check all commands
    if (actionHandlers[handlerName] && actionHandlers[handlerName].security(context, command)) {
        actionHandlers[handlerName].handle(context, command);
    }

    // EmoteWall
    emoteWallSpawn(msg, context);
}

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

let socket = new WebSocket("ws://eventsub-beta.wss.twitch.tv/ws");

socket.onmessage = function (event) {
    let msg = JSON.parse(event.data);

    switch (msg.metadata.message_type) {
        case 'session_welcome':
            session_id = msg.payload.session.id;
            break;

        case 'session_reconnect':
            ws = new WebSocket(msg.payload.session.reconnect_url);
            console.log('session reconnect!');
            break;

        case 'notification':
            switch (msg.payload.event.reward.title) {
                case 'Spin The Wheel':
                    console.log('Spin The Wheel');
                    break;

            }
            console.log(msg.payload.event.reward.title)
            break;
    }

    if (session_id && subscribed == false) {
        fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + bearerToken,
                    'Client-Id': twitchClientId,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "type": "channel.channel_points_custom_reward_redemption.add",
                    "version": "1",
                    "condition": {
                        "broadcaster_user_id": twitchChannelId
                    },
                    "transport": {
                        "method": "websocket",
                        "session_id": session_id
                    }
                })
            }).then(response => response.json())
            .then(data => console.log(data));
        subscribed = true;
    }
};

socket.onclose = function (event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
    }
};

socket.onerror = function (error) {
    console.log(`[error]`);
};