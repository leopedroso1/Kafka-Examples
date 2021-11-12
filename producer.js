const {Kafka} = require("kafkajs")
const msg = process.argv[2]; // Arg 0 - Node JS Application / Arg 1 - File that is producing the content / Arg 2 - The real message
run();
async function run(){
    try
    {
         const kafka = new Kafka({
              "clientId": "myapp",
              "brokers" :["Leonardo-PC:9092"] // Change to your local host name
         })

        const producer = kafka.producer();
        console.log("Connecting.....")
        await producer.connect()
        console.log("Connected!")
        
        // Partitioning Example: Names A-M >> 0 , Names N-Z >> 1 
        const partition = msg[0] < "N" ? 0 : 1;
        const result =  await producer.send({
            "topic": "Users",
            "messages": [
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        })

        console.log(`Send Successfully! ${JSON.stringify(result)}`)
        await producer.disconnect();
    }
    catch(ex)
    {
        console.error(`An exception was thrown: ${ex}`)
    }
    finally{
        process.exit(0);
    }


}