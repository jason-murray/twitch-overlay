const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Change Limmy to your Twitch channel
const twitchChannel = urlParams.get('channel');

// Change Limmy to your Twitch channel
const twitchChannelId = urlParams.get('cid');

// Change Limmy to your Twitch channel
const twitchClientId = urlParams.get('client');
const bearerToken = urlParams.get('bearer');

// Your alert background. Default is a vibrant green
const alertBg = '#00AA00';

// Spotlight background colour. Default is a deep, rich "gold"
const spotlightBg = '#a66600';

// The emoji that surrounds the spotlight messages.
const spotlightEmoji = '⭐';

// Allow twitch emotes, can be true or false.
const twitchEmotes = true;

// Play a sound when the "!alert" command is used
const playAlertSound = false;

// The location of the alert sound that will be used if "playAlertSound" is true, path is relative to "twitchpopups.html"
const alertSoundFile = "assets/sounds/alert.mp3";

// Follow the instructions in README.md