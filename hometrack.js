var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res) {
	var valid = false;
	var completed = [];
  if (req.body.hasOwnProperty("payload")) {
	  valid = true;
	var payload = req.body["payload"];
	for(var i = 0; i < payload.length; i++) {
		if (payload[i].hasOwnProperty("workflow") && payload[i].hasOwnProperty("type")) {
			if ((payload[i]["workflow"] == "completed") && (payload[i]["type"] == "htv")) {
				var concatAddress = "";
				if (payload[i]["address"].hasOwnProperty("buildingNumber")) {
					concatAddress += payload[i]["address"]["buildingNumber"];
				}
				if (payload[i]["address"].hasOwnProperty("street")) {
					concatAddress += " " + payload[i]["address"]["street"];
				}
				if (payload[i]["address"].hasOwnProperty("suburb")) {
					concatAddress += " " + payload[i]["address"]["suburb"];
				}
				if (payload[i]["address"].hasOwnProperty("state")) {
					concatAddress += " " + payload[i]["address"]["state"];
				}
				if (payload[i]["address"].hasOwnProperty("postcode")) {
					concatAddress += " " + payload[i]["address"]["postcode"];
				}
				var match = { concataddress: concatAddress, type: payload[i]["type"], workflow: payload[i]["workflow"] };
				completed.push(match);
			}
		} else {
			valid = false;
		}	
	}
  }
  if (valid) {
		res.json({ response: completed });
  } else {
		res.status(400);
		res.json({ "error": "Could not decode request: JSON parsing failed" });
  }
});

app.listen(process.env.PORT || 9999);