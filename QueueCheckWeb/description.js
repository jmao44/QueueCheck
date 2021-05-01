// Location 1: West Village Starbucks
// Location 2: Library Printing Station
// Location 3: North Ave Dining Hall

let wvDescrip =
'<div>' +
    '<h1>West Village Starbucks</h1>' +
    '<div>' +
        '<p>West Village Starbucks, located in the West Village Dining Commons.</p>' +
        '<h3 id="wvEstimate"> Current wait time: ' +
        '<h3> Estimate wait time: ' +
        '<form action="/home" method="POST">' +
            '<input type="number" id="wvWaitTime" name="waitTime">' +
            '<button type="submit" name="button" value="1">Submit</button>' +
        '</form>' +
    '</div>' +
'</div>'

let libDescrip =
'<div>' +
    '<h1>Library Printer</h1>' +
    '<div>' +
        '<p>Laser printer, located in the Price Gilbert Library</p>' +
        '<h3 id="libEstimate"> Current wait time: ' +
        '<h3> Estimate wait time: ' +
        '<form action="/home" method="POST">' +
            '<input type="number" id="libWaitTime" name="waitTime">' +
            '<button type="submit" name="button" value="2">Submit</button>' +
        '</form>' +
    '</div>' +
'</div>'

let naDescrip =
'<div>' +
    '<h1>North Avenue Dining Hall</h1>' +
    '<div>' +
        '<p>North Avenue Dining Commons, located on North Avenue</p>' +
        '<h3 id="naEstimate"> Current wait time: ' +
        '<h3> Estimate wait time: ' +
        '<form action="/home" method="POST">' +
            '<input type="number" id="naWaitTime" name="waitTime">' +
            '<button type="submit" name="button" value="3">Submit</button>' +
        '</form>' +
    '</div>' +
'</div>'

module.exports = { wvDescrip: wvDescrip, libDescrip: libDescrip, naDescrip: naDescrip }