'use strict'

const express = require('express')
const database = require("../utilities/database")
const datetime = require("../utilities/datetime")
const { ObjectID } = require('mongodb');

// Create express router
const router = express.Router()
const MESSAGE_ROOMS_COLLECTION = "msgRooms"
const USERS_COLLECTION = "users"

router.get('/message/:messageRoomId', function (req, res) {
    var messageRoomId = req.params.messageRoomId

    database.findById(MESSAGE_ROOMS_COLLECTION, messageRoomId)
        .then(function (messageRoom) {
            res.status(200).json(messageRoom.messages)
        })
        .catch(function (err) {
            console.error("ERROR OCCURED: " + err)
            res.status(500).send("An Internal Error Has Occured")
        })
})

// update messages (with any conversations that are unread)
router.get('/message/update/:username/:messageRoomId', function (req, res) {
    var username = req.params.username
    var messageRoomId = req.params.messageRoomId

    var unreadMessages = []
    var unreadMessageRooms = []
    var allMessages = []
    var messages_length = 0
    database.findById(MESSAGE_ROOMS_COLLECTION, messageRoomId)
        .then(function (messageRoom) {
            // get the user
            var user = {}
            messageRoom.users.forEach(function (messageRoomUser) {
                if (messageRoomUser.username == username) {
                    user = messageRoomUser
                }
            })

            // get the list of messages the user has read
            var messageRead = user.read_messages
            unreadMessages = messageRoom.messages.slice(messageRead)
            messages_length = messageRoom.messages.length
            allMessages = messageRoom.messages

            return get_message_rooms(username)
        })
        .then(function (messageRooms) {
            messageRooms.forEach(function (messageRoom) {
                if (messageRoom.conversation_unread_status) {
                    unreadMessageRooms.push(messageRoom)
                }
            })

            var query = { "users.username": username, "_id": new ObjectID(messageRoomId) }
            var contents = { $set: { "users.$.read_messages": messages_length, "users.$.conversation_unread_status": false } }

            return database.updateWithQuery(MESSAGE_ROOMS_COLLECTION, query, contents)
        })
        .then(function (messageRoom) {
            res.status(200).json({ "unreadMessages": unreadMessages, "unreadMessageRooms": unreadMessageRooms, "messages": allMessages })
        })
        .catch(function (err) {
            console.error("ERROR OCCURED: " + err)
            res.status(500).send("An Internal Error Has Occured")
        })
})

// create conversation
router.post('/messageRoom/create', function (req, res) {
    var recipient = req.body.recipient
    var sender = req.body.sender

    var senderObj = { "username": sender, "conversation_unread_status": false, "read_messages": 0 }
    var recipientObj = { "username": recipient, "conversation_unread_status": false, "read_messages": 0 }
    var time = datetime.get_time()
    var date = datetime.get_date()
    var messageRoom = { "users": [senderObj, recipientObj], "messages": [], "mostRecentTime": time, "mostRecentDate": date }

    var createdMessageRoomId = ""
    database.findOne(USERS_COLLECTION, { "username": recipient })
        .then(function (user) {
            if(user == null) {
                throw `User(${recipient}) does not exists`
            }

            user.messageRooms.forEach(function (messageRoom) {
                if(messageRoom.messagingWith == sender) {
                    throw `User(${recipient}) already has a conversation with ${sender}`
                }
            })
            
            return database.insertRecord(MESSAGE_ROOMS_COLLECTION, messageRoom)
        })
        .then(function (messageRoomId) {
            createdMessageRoomId = messageRoomId
            var promises = []

            promises.push(database.updateWithQuery(USERS_COLLECTION, { "username": recipient }, { $push: { messageRooms: { "messageRoomId": messageRoomId, "messagingWith": sender } } }))
            promises.push(database.updateWithQuery(USERS_COLLECTION, { "username": sender }, { $push: { messageRooms: { "messageRoomId": messageRoomId, "messagingWith": recipient } } }))

            return Promise.all(promises)
        })
        .then(function (result) {
            return database.findById(MESSAGE_ROOMS_COLLECTION, createdMessageRoomId)
        })
        .then(function (room) {
            var responseObj = {}
            responseObj.messageRoomId = room._id
            responseObj.name = recipient
            responseObj.conversation_unread_status = false
            responseObj.recent_message_datetime = room.mostRecentDate + " " + room.mostRecentTime
            res.status(200).json(responseObj)
        })
        .catch(function (err) {
            console.error("ERROR OCCURED: " + err)
            res.status(200).json({})
        })
})

// send message
router.post('/sendMessage', function (req, res) {
    var recipient = req.body.recipient
    var sender = req.body.sender
    var message = req.body.message
    var messageRoomId = req.body.messageRoomId

    var time = datetime.get_time()
    var date = datetime.get_date()

    var messageObj = { "sender": sender, "message": message, "timeSent": time, "dateSent": date }

    var contents = { $push: { messages: messageObj }, $set: { mostRecentTime: time, mostRecentDate: date } }
    database.updateWithId(MESSAGE_ROOMS_COLLECTION, messageRoomId, contents)
        .then(function (messageRoom) {
            return database.findById(MESSAGE_ROOMS_COLLECTION, messageRoomId)
        })
        .then(function (messageRoom) {
            var query = { "users.username": recipient, "_id": new ObjectID(messageRoomId) }
            var contents = { $set: { "users.$.conversation_unread_status": true } }

            return database.updateWithQuery(MESSAGE_ROOMS_COLLECTION, query, contents)
        })
        .then(function () {
            res.status(200).json(messageObj)
        })
        .catch(function (err) {
            console.error("ERROR OCCURED: " + err)
            res.status(500).send("An Internal Error Has Occured")
        })
})

// get list of message rooms
router.get('/messageRoom', function (req, res) {
    var username = req.query.username

    get_message_rooms(username)
        .then(function (response) {
            res.status(200).json(response)
        })
        .catch(function (err) {
            console.error("ERROR OCCURED: " + err)
            res.status(500).send("An Internal Error Has Occured")
        })
})

function get_message_rooms(username) {
    return new Promise(function (resolve, reject) {
        database.findOne(USERS_COLLECTION, { username: username })
            .then(function (user) {
                var messageRooms = user.messageRooms

                var promises = []
                messageRooms.forEach(function (room) {
                    // console.log(entry);
                    promises.push(database.findOne(MESSAGE_ROOMS_COLLECTION, room.messageRoomId))
                })

                return Promise.all(promises)
            })
            .then(function (messageRooms) {
                var response = []
                messageRooms.forEach(function (room) {
                    // get converasation name and status for that user
                    var conversation_unread_status = false
                    var other_person = ""
                    room.users.forEach(function (room_user) {
                        if (room_user.username != username) {
                            other_person = room_user.username
                        } else {
                            conversation_unread_status = room_user.conversation_unread_status
                        }
                    })

                    var responseObj = {}
                    responseObj.messageRoomId = room._id
                    responseObj.name = other_person
                    responseObj.conversation_unread_status = conversation_unread_status
                    responseObj.recent_message_datetime = room.mostRecentDate + " " + room.mostRecentTime
                    response.push(responseObj)
                })

                resolve(response)
            })
            .catch(function (err) {
                reject(err)
            })
    })
}

// Export router
module.exports = router