from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/horse"
mongo = PyMongo(app)

@app.route("/")
def index():
    return render_template("main.html", index=index)
    # return render_template("index.html", hoops=hoops)


@app.route("/about/", methods=['GET'])
def about():
    return render_template("about.html", about=about)

@app.route("/hoops", methods=['GET'])
def hoops():
    # find one record of the data from the mongo db
    hoops = mongo.db.hoops

    output = []
    for h in hoops.find():
        output.append({'Player': h['Player'], "tm": h["tm"], "salary": h["yr2019_20"], "pos": h["pos"],
                       "per": h["PER"], "pts": h["pts"], "mp": h["mp"], "ast": h["ast"], "steals": h["stl"], "blk": h["blk"]})
    return jsonify({"result": output})

@app.route("/stats", methods=['GET'])
def stats():
    return render_template("index.html", index=index)

@app.route("/locations", methods=['GET'])
def location():

    locations = mongo.db.location
    output = []
    for l in locations.find():
        salary = l['2019-20'][1:].replace(",", "")
        salary = int(salary)
        per_avg = round(float(l["PER_AVG"]))
        coordinates = l["coordinates"].split(", ")
        lat = float(coordinates[0])
        long = float(coordinates[1])
        output.append({"team": l['team'], "salary": salary, "pretty": l['2019-20'], "city": l["city"],
                       "coordinates": {"lat": lat, "lng": long}, "TM": l["TM"], "per_avg": per_avg})
    return jsonify({"result": output})


@app.route("/map", methods=['GET'])
def maps():

    return render_template("map.html", map=maps)


if __name__ == "__main__":
    app.run(debug=True)
