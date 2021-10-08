# realtime Repository

Demonstrates a basic C3 / Kafka integration for the purpose of demoing realtime streaming capabilities.

## Prerequisites

* Docker
* Tunnelblick VPN (turned on during docker builds)
* node.js (npm)
* `curlAll` utility installed on your PATH
* c3 cli (c3server on your path)


## First time local setup

```zsh
npm run up
npm run prov
npm run curl
```

## Shut down
```zsh
npm run down
```

## Use the Console to Configure C3 for Kafka

```js
// configure kafka
var topicName = "realtime"
var creds = ApacheCredentials.make({endpoint:"kafka:9092"});
var topic = ApacheKafkaTopic.fromResourceName(topicName);
c.setConfigValue("resourceName",topicName); 
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
CanonicalOutboundQueue.sendBatch([
    CanonicalKafkaMessage.make({
        id: "t1",
        time: "2021-01-01"
    })
]);

```