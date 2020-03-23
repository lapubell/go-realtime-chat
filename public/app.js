new Vue({
    el: '#app',

    data: {
        ws: null, // Our websocket
        newMsg: '', // Holds new messages to be sent to the server
        chatContent: '', // A running list of chat messages displayed on the screen
        joined: false, // True if email and username have been filled in
        name: "",
        characters: [
            {
                id: "brandon",
                name: "Brandon Jaspers",
                img: "liljaspers.jpg",
                speed:     [3,4,4,4,5,6,7,8],
                speedIndex: 2,
                might:     [2,3,3,4,5,6,6,7],
                mightIndex: 3,
                sanity:    [3,3,3,4,5,6,7,8],
                sanityIndex: 3,
                knowledge: [1,3,3,5,5,6,6,7],
                knowledgeIndex: 2,
            },
            {
                id: "peter",
                name: "Peter Akimoto",
                img: "peter.jpg",
                speed:     [3,3,3,4,6,6,7,7],
                speedIndex: 3,
                might:     [2,3,3,4,5,5,6,8],
                mightIndex: 2,
                sanity:    [3,4,4,4,5,6,6,7],
                sanityIndex: 3,
                knowledge: [3,4,4,5,6,7,7,8],
                knowledgeIndex: 2,
            },
            {
                id: "zostra",
                name: "Madame Zostra",
                img: "zostra.jpg",
                speed:     [2,3,3,5,5,6,6,7],
                speedIndex: 2,
                might:     [2,3,3,4,5,5,5,6],
                mightIndex: 3,
                sanity:    [4,4,4,5,6,7,8,8],
                sanityIndex: 2,
                knowledge: [1,3,4,4,4,5,6,6],
                knowledgeIndex: 3,
            },
            {
                id: "lopez",
                name: "Vivian Lopez",
                img: "vivian.jpg",
                speed:     [3,4,4,4,4,6,7,8],
                speedIndex: 3,
                might:     [2,2,2,4,4,5,6,6],
                mightIndex: 2,
                sanity:    [4,4,4,5,6,7,8,8],
                sanityIndex: 2,
                knowledge: [4,5,5,5,6,6,7],
                knowledgeIndex: 3,
            },
            {
                id: "missy",
                name: "Missy Dubourde",
                img: "missy.jpg",
                speed:     [3,4,5,6,6,6,7,7],
                speedIndex: 2,
                might:     [2,3,3,3,4,5,6,7],
                mightIndex: 3,
                sanity:    [1,2,3,4,5,5,6,7],
                sanityIndex: 2,
                knowledge: [2,3,4,4,5,6,6,6],
                knowledgeIndex: 3,
            },
            {
                id: "zoe",
                name: "Zoe Ingstrom",
                img: "zoe.jpg",
                speed:     [4,4,4,4,5,6,8,8],
                speedIndex: 3,
                might:     [2,2,3,3,4,4,6,7],
                mightIndex: 3,
                sanity:    [3,4,5,5,6,6,7,8],
                sanityIndex: 2,
                knowledge: [1,2,3,4,4,5,5,5],
                knowledgeIndex: 2,
            },
            {
                id: "father",
                name: "Father Rhinehardt",
                img: "priest.jpg",
                speed:     [2,3,3,4,5,6,7,7],
                speedIndex: 2,
                might:     [1,2,2,4,4,5,5,7],
                mightIndex: 2,
                sanity:    [3,4,5,5,6,7,7,8],
                sanityIndex: 4,
                knowledge: [1,3,3,4,5,6,6,8],
                knowledgeIndex: 3,
            },
            {
                id: "professor",
                name: "Professor Longfellow",
                img: "proff.jpg",
                speed:     [2,2,4,4,5,5,6,6],
                speedIndex: 3,
                might:     [1,2,3,4,5,5,6,6],
                mightIndex: 2,
                sanity:    [1,3,3,4,5,5,6,7],
                sanityIndex: 2,
                knowledge: [4,5,5,5,5,6,7,8],
                knowledgeIndex: 4,
            },
            {
                id: "ox",
                name: "Ox Bellows",
                img: "ox.jpg",
                speed:     [2,2,2,3,4,5,5,6],
                speedIndex: 4,
                might:     [4,5,5,6,6,7,8,8],
                mightIndex: 2,
                sanity:    [2,2,3,4,5,5,6,7],
                sanityIndex: 2,
                knowledge: [2,2,3,3,5,5,6,6],
                knowledgeIndex: 2,
            },
            {
                id: "flash",
                name: 'Darrin "Flash" Williams',
                img: "flash.jpg",
                speed:     [2,2,2,3,4,5,5,6],
                speedIndex: 4,
                might:     [4,5,5,6,6,7,8,8],
                mightIndex: 2,
                sanity:    [2,2,3,4,5,5,6,7],
                sanityIndex: 2,
                knowledge: [2,2,3,3,5,5,6,6],
                knowledgeIndex: 2,
            },
            {
                id: "jenny",
                name: "Jenny LeClerc",
                img: "jenny.jpg",
                speed:     [2,3,4,4,4,5,6,8],
                speedIndex: 3,
                might:     [3,4,4,4,4,5,6,8],
                mightIndex: 2,
                sanity:    [1,1,2,4,4,4,5,6],
                sanityIndex: 4,
                knowledge: [2,3,3,4,4,5,6,8],
                knowledgeIndex: 2,
            },
            {
                id: "heather",
                name: "Heather Granville",
                img: "heather.jpg",
                speed:     [3,3,4,5,6,6,7,8],
                speedIndex: 2,
                might:     [3,3,3,4,5,6,7,8],
                mightIndex: 2,
                sanity:    [3,3,3,4,5,6,6,6],
                sanityIndex: 2,
                knowledge: [2,3,3,4,5,6,7,8],
                knowledgeIndex: 4,
            }
        ],
        activeCharacter: null,
        activeCharacterName: null,
        currentSpeed: 0,
        currentMight: 0,
        currentKnowledge: 0,
        currentSanity: 0,
        dice: [
            {
                active: true,
                value: 0,
            },
            {
                active: true,
                value: 0,
            },
            {
                active: true,
                value: 0,
            },
            {
                active: true,
                value: 0,
            },
            {
                active: true,
                value: 0,
            },
            {
                active: true,
                value: 0,
            },
            {
                active: true,
                value: 0,
            },
            {
                active: true,
                value: 0,
            }
        ],
        numberOfActiveDice: 8,
        isRolling: false
    },

    computed: {
        availableCharacters() {
            return this.characters.filter( (c) => {
                console.log(c)
                return true
            })
        }
    },

    created: function() {
        var self = this;
        this.ws = new WebSocket('ws://' + window.location.host + '/ws');
        this.ws.onopen = function() {
            self.getAvailablePlayers();
        }
        this.ws.addEventListener('message', function(e) {
            var response = JSON.parse(e.data);

            switch (response.type) {
                case "diceValues":
                    self.rollDice(response.value);
                    break;
                case "newActiveDice":
                    self.numberOfActiveDice = response.value;
                    break;
                default:
                    console.log(response)
                    break;
            }
        });
    },

    methods: {
        getAvailablePlayers() {
            // setTimeout(() => {
            //     this.ws.send(
            //         JSON.stringify({
            //             type: "availableCharacters"
            //         })
            //     )
            // }, 2500);
        },
        send: function () {
            if (this.newMsg != '') {
                this.ws.send(
                    JSON.stringify({
                        email: this.email,
                        username: this.username,
                        message: $('<p>').html(this.newMsg).text() // Strip out html
                    }
                ));
                this.newMsg = ''; // Reset newMsg
            }
        },

        join: function () {
            // if (!this.name) {
            //     alert("Invalid Name");
            //     return
            // }
            this.joined = true;
        },
        wsRollDice() {
            this.ws.send(
                JSON.stringify({
                    type: "diceRoll"
                }
            ));
        },
        rollDice(diceValues) {
            this.isRolling = true;
            var rollem = setInterval( () => {
                console.log('updating dice');
                for (let index = 0; index < this.numberOfActiveDice; index++) {
                    const element = this.dice[index];
                    element.value = Math.floor((Math.random() * 3) - 0.0001)
                }
            }, 100)

            setTimeout(() => {
                clearInterval(rollem)
                console.log('stopped rolling', diceValues)
                this.isRolling = false;

                for (let i = 0; i < this.dice.length; i++) {
                    const element = this.dice[i];

                    if (i < this.numberOfActiveDice) {
                        this.dice[i].value = diceValues[i]
                        this.dice[i].active = true
                    } else {
                        this.dice[i].value = 0
                        this.dice[i].active = false
                    }
                }
            }, 2000)
        },
        setCharacter(name) {
            this.activeCharacterName = name

            console.log(name)
            let foundCharacter = this.characters.filter( (c) => {
                console.log(c, name)
                if (c.id === name) {
                    return true
                }

                return false
            })
            console.log(foundCharacter)
            this.activeCharacter = foundCharacter[0]
            this.currentSpeed = this.activeCharacter.speedIndex
            this.currentMight = this.activeCharacter.mightIndex
            this.currentKnowledge = this.activeCharacter.knowledgeIndex
            this.currentSanity = this.activeCharacter.sanityIndex

            this.ws.send(
                JSON.stringify({
                    type: "characterChosen",
                    incomingString: name
                }
            ));
        }
    },

    watch: {
        numberOfActiveDice() {
            this.ws.send(
                JSON.stringify({
                    type: "changeActiveDiceCount",
                    incomingNumber: this.numberOfActiveDice*1
                }
            ));
            for (let i = 0; i < this.dice.length; i++) {
                this.dice[i].active = i < this.numberOfActiveDice
            }
        }
    }
});
