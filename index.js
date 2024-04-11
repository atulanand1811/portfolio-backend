// Code for mongoose config in backend
// Filename - backend/index.js

// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://atulanand1811:my%40portfolio%40db%402024@pf-db.2l7lwqb.mongodb.net/?retryWrites=true&w=majority&appName=pf-db', {
	dbName: 'portfolio-db',
	useNewUrlParser: true,
	useUnifiedTopology: true
}, err => err ? console.log(err) : 
	console.log('Connected to portfolio-db database'));

// Schema for users of app
const UserDetails = new mongoose.Schema({
    portfolioId: {
        type: String,
        required: true,
        unique: true
    },
	image: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	profession: {
		type: String,
		required: true,
	},
	summary: {
		type: String,
		required: true,
	},
	aboutMe: {
		type: String,
		required: true,
	},
    skills: {
		type: String,
		required: true,
	},
    linkedIn: {
		type: String,
		required: true,
	},
    github: {
		type: String,
		required: true,
	},
	emailId: {
		type: String,
		required: true,
	}, 
	works: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        techstack: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: false
        }
    }],
	experience: [{
		organization: {
			type: String,
			required: true
		},
		timeToFrom: {
			type: String,
			required: true
		},
		projects : [{
			name: {
				type: String,
				required: false
			},
			role: {
				type: String,
				required: true
			},
			responsibility: {
				type: String,
				required: true
			},
			techstack : {
				type: String,
				required: true
			}
		}]
	}]
});
const User = mongoose.model('userdetails', UserDetails);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

	resp.send("App is Working");
	// You can check backend is working or not by 
	// entering http://loacalhost:5000
	
	// If you see App is working means
	// backend working properly
});

app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
        console.log(user.userName);
        let name = user.userName.split(' ').join('-').toLowerCase();
        let characters = "abcdefghiklmnopqrstuvwxyz123467890";
        let lenString = 14;
        let randomstring = '';
        for (let i = 0; i < lenString; i++) {
            let rnum = Math.floor(Math.random() * characters.length);
            randomstring += characters.substring(rnum, rnum + 1);
        }
        let portfolioId = name+"-"+randomstring;
        user.portfolioId=portfolioId;
		let result = await user.save();
		result = result.toObject();
		if (result) {
			let url = `localhost:3000/portfolio/${result.portfolioId}`;
			resp.send(url);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong" + e.message);
	}
});

app.get('/user/:id', async (req, resp) => {

    let portfolioId = req.params.id;
    console.log(portfolioId);
    User.find({portfolioId: portfolioId}, function (err, user) {
        if (err) {
            resp.send(err);
        }
        resp.json(user);
    });
	
});
app.listen(5000);
