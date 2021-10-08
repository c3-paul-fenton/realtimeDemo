# realtime Repository

Follow this README to get setup to run `realtime`

## Prerequisites

* Docker
* Tunnelblick VPN (turned on during docker builds)
* node.js (npm)
* `curlAll` utility installed on your PATH
* c3 cli (c3server on your path)


## First time local setup

```
npm run up
npm run prov
npm run curl
```

## Shut down
```
npm run down
```

## Start Kafka

See (Apache Quickstart)[http://kafka.apache.org/quickstart]

```
cd kafka_2.13-3.0.0
bin/zookeeper-server-start.sh config/zookeeper.properties
bin/kafka-server-start.sh config/server.properties
```

Create kafka topic:
```
bin/kafka-topics.sh --create --topic realtime --bootstrap-server localhost:29092 --partitions 1 --replication-factor 1
```

Write messages to topic:
```
bin/kafka-console-producer.sh --topic realtime --bootstrap-server localhost:29092
```

Read messages:
```
bin/kafka-console-consumer.sh --topic realtime --from-beginning --bootstrap-server localhost:29092
```