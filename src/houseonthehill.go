package main

// So, everything lives in package main, which sucks, but whatever. This is a hacked together program
// that exists to make playing this game possible over the internet. Here's some stuff specific to
// make the game work.

var players = make(map[string]string) // players in the game, ie: [kurtis]brandon
var characters []string               // playable characters
