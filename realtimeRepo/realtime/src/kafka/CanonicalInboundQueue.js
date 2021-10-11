var log = C3.logger("HowToDebug");
function process(messages) {

    //var array = PersistedMessage.array();
    var events = EncounterEvent.array();
    var encounters = {}

    // get the current rate
    var rateObj = RateState.fetch().objs
    var rate = 0;
    if (rateObj.length > 0) {
       rate = RateState.fetch().objs[0].rate;
    }

    // get the current queue length
    var queueLength = 10;

    // process the messages
    messages.forEach(function (msg) {
        encounters[msg.encounterId] = Encounter.make({
            id: msg.encounterId,
            facility: "0"
        });
        events.push(EncounterEvent.make({
            parent: { type: 'Encounter', id: msg.encounterId },
            start: msg.time,
            persisted: DateTime.now(),
            rate: rate,
            queueLength: queueLength
        }))
    });

    // parse new headers back to an array
    var encountersArray = Encounter.array();
    Object.keys(encounters).forEach(function(id) {
        encountersArray.push(encounters[id]);
    })

    Encounter.upsertBatch(encountersArray);
    EncounterEvent.upsertBatch(events);
}
