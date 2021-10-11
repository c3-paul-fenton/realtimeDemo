function dispatchMessages(spec) {

    // configure kafka
    var topicName = "realtime"
    var creds = ApacheCredentials.make({endpoint:"kafka:9092"});
    var topic = ApacheKafkaTopic.fromResourceName(topicName);
    topic.setConfigValue("resourceName",topicName); 
    topic.setCredentialsForResourceName(topicName, creds);

    // config inbound queue handler
    var inbound = CanonicalInboundQueue.make().config();
    inbound.setConfigValue("cloudMessageBrokerName","realtime");
    inbound.setConfigValue("cloudMessageBrokerType","ApacheKafkaTopic");
    inbound.setConfigValue("batchSize",1);
    inbound.setConfigValue("timeoutMillis", 10000); 
    CloudMessageDispatcherConfig.clearCache(); 
    CanonicalInboundQueue.register();

    // config outbound queue producer
    var outbound = CanonicalOutboundQueue.make().config();
    outbound.setConfigValue("cloudMessageBrokerName","realtime" );
    outbound.setConfigValue("cloudMessageBrokerType","ApacheKafkaTopic" );
    CloudMessageDispatcherConfig.clearCache();

    // send a test message
    var rate = null;
    var rateState = RateState.fetch().objs;
    if (rateState.length > 0) {
        rate = rateState[0].rate;
    } else {
        rate = 5;
    }

    var messages = [];
    for (var i = 0; i < rate; ++i) {
        messages.push(CanonicalKafkaMessage.make({
            encounterId: "Encounter_" + String(Math.floor(Math.random() * 100)),
            time: DateTime.now().toString()
        }));
    }
    CanonicalOutboundQueue.sendBatch(messages);

}
