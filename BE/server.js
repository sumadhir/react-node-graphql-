var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Schema, using GraphQL schema language
var schema = buildSchema(`
  type UserList {
    users(userCount: Int!): [User]
  }

  type User {
    id: Int!
    name: Name
    address: Address
    friends: [Friend]
    hobbies: [String]
  }
  type Name {
        first_name: String
        last_name: String
        middle_name: String
        prefix: String
        nick_name: String
    }
    type Address {
        id:Int
        line1: String
        line2: String
        zip_code:Int
        city:String
        state:String
        country:String
    }

    type Friend {
        id: Int!
        name: Name
        address: Address
        hobbies: [String]
    }


  type Query {
    getUsers: UserList
  }
`);

// Class for implementing the Users GraphQL type
class Users {
    users({userCount}) {
        var userList = []
        for(var i=1;i<userCount;i++){
            var user = {
                "id": i,
                "name":{
                    "first_name": "fist name " + i,
                    "last_name": "last name "+i,
                    "middle_name": "middle name "+ i,
                    "prefix": i % 2 === 0 ? "Mr." : "Mrs",
                    "nick_name": "nick "+i
                },
                "address": {
                    "id":i,
                    "line1": "line1",
                    "line2": "line2",
                    "zip_code":123456,
                    "city":"city",
                    "state":"state",
                    "country":"country"
                },
                "friends":[
                    {
                        "id":i,
                        "name":{
                            "first_name": "First Friend Name ",
                            "last_name": "last name "+i,
                            "middle_name": "middle name "+ i,
                            "prefix": i % 2 === 0 ? "Mr." : "Mrs",
                            "nick_name": "nick "+i
                        },
                        "address": {
                            "id":i,
                            "line1": "line1",
                            "line2": "line2",
                            "zip_code":123456,
                            "city":"city",
                            "state":"state",
                            "country":"country"
                        },
                        "hobbies":[
                            "Hobbies1","Hobbies2","Hobbies3","Hobbies4"
                        ]
                    },
                    {
                        "id":i,
                        "name":{
                            "first_name": "Second friend Name",
                            "last_name": "last name "+i,
                            "middle_name": "middle name "+ i,
                            "prefix": i % 2 === 0 ? "Mr." : "Mrs",
                            "nick_name": "nick "+i
                        },
                        "address": {
                            "id":i,
                            "line1": "line1",
                            "line2": "line2",
                            "zip_code":123456,
                            "city":"city",
                            "state":"state",
                            "country":"country"
                        },
                        "hobbies":[
                            "Hobbies1","Hobbies2","Hobbies3","Hobbies4"
                        ]
                    }
        
                ],
                "hobbies":[
                    "Hobbies1","Hobbies2","Hobbies3","Hobbies4"
                ]
            }
            userList.push(user);
        }
        return userList;
  }
}

// The root provides the top-level API endpoints
var root = {
    getUsers: () => {
        return new Users();
    }
}

const allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-XSRF-TOKEN, Content-Length, X-Requested-With');

	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.status(200).send();
	} else {
		next();
	}
};

var app = express();
app.use(allowCrossDomain);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('App running on  localhost:4000');