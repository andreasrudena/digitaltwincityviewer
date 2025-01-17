import mqtt from 'mqtt';
import { server } from './server.js';
import protobuf from 'protobufjs';

const { MQTT_INTERNAL_HOST, MQTT_HUB } = process.env;
const WS_PORT = 4000;
const isDev = process.env.NODE_ENV === 'development';
const mqttDev = isDev ? MQTT_INTERNAL_HOST : null;
const mqttUrl = mqttDev || MQTT_HUB || 'https://test.mosquitto.org/'; // 'mqtt://mqtt-broker';
//const mqttClient = mqtt.connect(mqttUrl);

const run = async () => {
  const protoRoot = await protobuf.load('dtcc.proto');
  server.protoRoot = protoRoot;
  server.listen(WS_PORT, () => {
    console.log('server started on port: ', WS_PORT);
  });
};

run();

// mqttClient.on('connect', async () => {
//   console.log('mqtt client connected');

//   const { DTCC } = await protobuf.load('dtcc.proto');
//   server.DTCC = DTCC;

//   server.onWebsocketMessage = json => {
//     const { topic, message } = json;
//     if (!topic) {
//       console.warn('topic was not correct from dashboard client');
//     }
//     // convert a topic / string pair to topic / object
//     if (typeof message === 'string') {
//       mqttClient.publish(
//         topic,
//         JSON.stringify({
//           message,
//         })
//       );
//     } else {
//       mqttClient.publish(topic, JSON.stringify(message));
//     }
//   };

//   server.onMqttSubscribe = (topic, user) => {
//     mqttClient.subscribe(topic, err => {
//       if (err) {
//         console.log('error connecting to topic', topic, err);
//       } else {
//         console.log('connected to ', topic);
//       }
//     });
//   };

//   mqttClient.on('message', (topic, message) => {
//     const msg = message.toString();
//     try {
//       const jsonData = JSON.parse(msg);
//       server.onMqttMessage(topic, jsonData);
//     } catch (e) {
//       console.log(e);
//     }
//   });

//   server.listen(WS_PORT, () => {
//     console.log('server started on port: ', WS_PORT);
//   });

//   process.on('SIGTERM', () => {
//     console.info(`SIGTERM at ${new Date().toISOString()}`);
//     process.exit();
//   });
// });

// mqttClient.on('reconnect', () => {
//   console.log('Broker was reconnected');
// });

// mqttClient.on('disconnect', () => {
//   console.log('Broker was disconnected');
// });

// mqttClient.on('error', e => {
//   console.log('Broker error', e);
// });
