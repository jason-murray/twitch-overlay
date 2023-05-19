let theWheel = new Winwheel({
    'numSegments'   : 16,   // Specify number of segments.
    'outerRadius'   : 212,  // Set radius to so wheel fits the background.
    'innerRadius'   : 120,  // Set inner radius to make wheel hollow.
    'textFontSize'  : 16,   // Set font size accordingly.
    'textMargin'    : 0,    // Take out default margin.
    'segments'      :       // Define segments including colour and text.
    [
       {'fillStyle' : '#eae56f', 'text' : 'Prize 1'},
       {'fillStyle' : '#89f26e', 'text' : 'Prize 2'},
       {'fillStyle' : '#7de6ef', 'text' : 'Prize 3'},
       {'fillStyle' : '#e7706f', 'text' : 'Prize 4'},
       {'fillStyle' : '#eae56f', 'text' : 'Prize 5'},
       {'fillStyle' : '#89f26e', 'text' : 'Prize 6'},
       {'fillStyle' : '#7de6ef', 'text' : 'Prize 7'},
       {'fillStyle' : '#e7706f', 'text' : 'Prize 8'},
       {'fillStyle' : '#eae56f', 'text' : 'Prize 9'},
       {'fillStyle' : '#89f26e', 'text' : 'Prize 10'},
       {'fillStyle' : '#7de6ef', 'text' : 'Prize 11'},
       {'fillStyle' : '#e7706f', 'text' : 'Prize 12'},
       {'fillStyle' : '#eae56f', 'text' : 'Prize 13'},
       {'fillStyle' : '#89f26e', 'text' : 'Prize 14'},
       {'fillStyle' : '#7de6ef', 'text' : 'Prize 15'},
       {'fillStyle' : '#e7706f', 'text' : 'Prize 16'}
    ],
    'animation' :           // Define spin to stop animation.
    {
        'type'     : 'spinToStop',
        'duration' : 5,
        'spins'    : 8,
        'callbackFinished' : alertPrize
    }
});

// Called when the animation as finished.
function alertPrize(indicatedSegment)
{
    
}