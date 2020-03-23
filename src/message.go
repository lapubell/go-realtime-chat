package main

// Message is our json shape that will come in from the JS app
type Message struct {
	Type           string `json:"type"`
	Name           string `json:"name"`
	IncomingNumber int    `json:"incomingNumber"`
	IncomingString string `json:"incomingString"`
}
