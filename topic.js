const {Kafka} = require("kafkajs")

run();

async function run(){
    try
    {
         const kafka = new Kafka({
              "clientId": "myapp",
              "brokers" :["Leonardo-PC:9092"]
         })

        const admin = kafka.admin();
        console.log("Connecting.....")
        await admin.connect()
        console.log("Connected!")
        // Partitioning Example: Names A-M >> 0 , Names N-Z >> 1 
        await admin.createTopics({
            "topics": [{
                "topic" : "Users",
                "numPartitions": 2
            }]
        })
        console.log("Created Successfully!")

        await admin.disconnect();
    }
    catch(ex)
    {
        console.error(`An exception was thrown ${ex}`)
    }
    finally{
        process.exit(0);
    }
}