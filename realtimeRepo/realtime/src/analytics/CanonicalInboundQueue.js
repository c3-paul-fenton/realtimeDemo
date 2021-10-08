function process(messages) {

    var array = PersistedMessage.array();
  
    messages.forEach(function (msg) {
        array.push(PersistedMessage.make({
            id: msg.id,
            time: DateTime('2018-01-01T00:00:00')
        }));
    });
  
    try {
        PersistedMessage.createBatch(array);
    } catch (e) {
        log.info(e.message);
    }
}