const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const Workout = require("./models/workoutmodel");
require("./public/js/api");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
	useNewUrlParser: true,
	useFindAndModify: false
});

// routes
app.post("/submit", ({ body }, res) => {
	Workout.create(body)
		.then(dbWorkout => {
			res.json(dbWorkout);
		})
		.catch(err => {
			res.json(err);
		});
});

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
