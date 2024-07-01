import { connect as mqttConnect, Client } from 'mqtt';
import { moduleController } from './moduleController.js';

const mqttBrokerUrl = 'mqtt://localhost';
const mqttClient = mqttConnect(mqttBrokerUrl);

const onMessage = async (topic, message) => {

    let pesan = message.toString();
    let dataJson = JSON.parse(pesan)
    console.log(dataJson)
    console.log(`the topic is: ${topic}`)

    const messageTo = {
        action: "absen_berhasil",
        data: "salman"
    } 

    let pe = await moduleController(dataJson.key, dataJson.kode)

    console.log(pe)

    mqttClient.publish(dataJson.kode, JSON.stringify(pe));


  }

  const onConnect = () => {
    console.log('Connected to MQTT Broker');
    mqttClient.subscribe('rfid', (err) => {
      if (err) {
        console.error('Failed to subscribe to topic:', err);
      } else {
        console.log('Subscribed to topic: rfid');
      }
    });
  }

  export { onMessage , mqttClient, onConnect }