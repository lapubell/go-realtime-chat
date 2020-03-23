package main

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool) // connected clients
var broadcast = make(chan Message)           // broadcast channel

// Configure the upgrader
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	// Create a simple file server
	fs := http.FileServer(http.Dir("public"))
	http.Handle("/", fs)

	// Configure websocket route
	http.HandleFunc("/ws", handleConnections)

	// seed character array the same key names as the JS object
	characters = []string{
		"brandon",
		"peter",
		"ox",
		"flash",
		"zostra",
		"lopez",
		"missy",
		"zoe",
		"father",
		"professor",
		"jenny",
		"heather",
	}
	fmt.Println(characters)

	// Start listening for incoming chat messages
	go handleMessages()

	// Start the server on localhost port 8888 and log any errors
	log.Println("http server started on :8888")
	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	// Upgrade initial GET request to a websocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	// Make sure we close the connection when the function returns
	defer ws.Close()

	// Register our new client
	clients[ws] = true

	for {
		var msg Message
		// Read in a new message as JSON and map it to a Message object
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, ws)
			break
		}
		// Send the newly received message to the broadcast channel
		broadcast <- msg
	}
}

func handleMessages() {
	for {
		// Grab the next message from the broadcast channel
		msg := <-broadcast
		if msg.Type == "diceRoll" {
			s := rand.NewSource(time.Now().Unix())
			r := rand.New(s) // initialize local pseudorandom generator

			options := []int{0, 1, 2, 0, 1, 2}
			values := make([]int, 8)
			values[0] = options[r.Intn(len(options))]
			values[1] = options[r.Intn(len(options))]
			values[2] = options[r.Intn(len(options))]
			values[3] = options[r.Intn(len(options))]
			values[4] = options[r.Intn(len(options))]
			values[5] = options[r.Intn(len(options))]
			values[6] = options[r.Intn(len(options))]
			values[7] = options[r.Intn(len(options))]

			sendToAll("diceValues", values)
		}
		if msg.Type == "changeActiveDiceCount" {
			sendToAll("newActiveDice", msg.IncomingNumber)
		}
		if msg.Type == "availableCharacters" {
			fmt.Println("handle characters")
			sendToAll("characters", characters)
		}
		if msg.Type == "characterChosen" {
			sendToAll("dummy", true)
		}
	}
}

func sendToAll(t string, message interface{}) {
	// Send it out to every client that is currently connected
	fmt.Println("clients: ", clients)

	for client := range clients {
		output := map[string]interface{}{
			"type":  t,
			"value": message,
		}
		err := client.WriteJSON(output)
		if err != nil {
			log.Printf("error: %v", err)
			client.WriteJSON(map[string]string{
				"error": err.Error(),
			})
			client.Close()
			delete(clients, client)
		}
	}
}
