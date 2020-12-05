# REST API

Base URL: https://messagingservice-pvwu2w75ta-uw.a.run.app

---
## Get list of message rooms the user is in

`GET /messaging/messageRoom?username=${USERNAME}`

### Request
- username(String) = username of the logged in user

### Response

    Status: 200 OK

    [
        {
            "messageRoomId": "5fca1a9bb2c88f90724fe727",
            "name": "bao",
            "conversation_unread_status": false,
            "recent_message_datetime": "2020-12-04 1:30 pm"
        },
        {
            "messageRoomId": "5fcac3a1c701f1d40f0d7620",
            "name": "tunthein",
            "conversation_unread_status": false,
            "recent_message_datetime": "2020-12-04 11:17 pm"
        },
        {
            "messageRoomId": "5fcad3f3eb976ccb876ae36a",
            "name": "test",
            "conversation_unread_status": false,
            "recent_message_datetime": "2020-12-05 12:29 am"
        }
    ]
---

## Gets the list of messages in the conversation
`GET /messaging/message/{MESSAGE_ROOM_ID}`

### Request
- MESSAGE_ROOM_ID(String): Message room identifier

### Response

    Status: 200 OK

    [
        {
            "sender": "bao",
            "message": "hey",
            "timeSent": "3:17 am",
            "dateSent": "2020-12-04"
        }
    ]
---

## Gets the list of new messages for the room
`GET /messaging/message/update/{USERNAME}/{MESSAGE_ROOM_ID}`

### Request
- USERNAME(String): the username of the logged in user
- MESSAGE_ROOM_ID(String): Message room identifier

### Response

    Status: 200 OK

    {
        "unreadMessages": [],
        "unreadMessageRooms": [],
        "messages": [
            {
            "sender": "bao",
            "message": "hey",
            "timeSent": "3:17 am",
            "dateSent": "2020-12-04"
            }
        ]
    }

---

## Send a message to a user
`POST /messaging/sendMessage`

### Request Body
    {
        "sender": "bao",
        "recipient": "khoatxp",
        "message": "HELLO!",
        "messageRoomId": "5fca1a9bb2c88f90724fe727"
    }

### Response

    Status: 200 OK

    {
        "sender": "bao",
        "message": "HELLO!",
        "timeSent": "12:02 pm",
        "dateSent": "2020-12-04"
    }

---

## Create a message room
`POST /messaging/messageRoom/create`

### Request Body
    {
        "sender": "bao",
        "recipient": "khoatxp"
    }
### Response

    Status: 200 OK

    {
        "messageRoomId": "5fcac3a1c701f1d40f0d7620",
        "name": "khoatxp",
        "conversation_unread_status": false,
        "recent_message_datetime": "2020-12-04 11:17 pm"
    }