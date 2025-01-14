import Ably from 'ably/promises'
export async function publishSubscribe() {

    // Connect to Ably with your API key
    const ably = new Ably.Realtime({
        authUrl: "http://localhost:3000/message-auth",
    })

    ably.connection.on((stateChange) => {
        console.log('New connection state is ' + stateChange.current);
        if (stateChange.reason && stateChange.reason.code != 80017) {
            console.log('Reason ', stateChange.reason);
        }
    });

    // Create a channel called 'get-started' and register a listener to subscribe to all messages with the name 'first'
    const channel = ably.channels.get("get-started")

    await channel.subscribe("first", (message) => {
        console.log("Message received: " + message.data)
    });

    // Publish a message with the name 'first' and the contents 'Here is my first message!'
    await channel.publish("first", "Here is my first message!")

    // Close the connection to Ably after a 5 second delay
    setTimeout(async () => {
        ably.connection.close();
        await ably.connection.once("closed", function () {
            console.log("Closed the connection to Ably.")
        });
    }, 5000);
}



