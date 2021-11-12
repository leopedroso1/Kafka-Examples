const {Kafka} = require("kafkajs")

run();

async function run(){
    try
    {
         const kafka = new Kafka({
              "clientId": "myapp",
              "brokers" :["Leonardo-PC:9092"] // Change to Your Local Host Name:9092
         })

        const consumer = kafka.consumer({"groupId": "test"})
        console.log("Connecting.....")
        await consumer.connect() // Try to connect to broker. You must load the docker image with Kafka + Zookeeper first
        console.log("Connected!")
        
        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })
        
        await consumer.run({
            "eachMessage": async result => {
                console.log(`Received Message ${result.message.value} on partition ${result.partition}`)
            }
        })
 

    }
    catch(ex)
    {
        console.error(`An exception was thrown: ${ex}`)
    }
    finally
    {

        console.log("Received!")
    }

}