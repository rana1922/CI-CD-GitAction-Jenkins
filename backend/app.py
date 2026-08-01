from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

registrations = []


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Meditation Camp Registration API is Running"
    })


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Request body is required"}), 400

    name = data.get("name")
    email = data.get("email")
    contact = data.get("contact")

    if not name or not email or not contact:
        return jsonify({
            "message": "Name, Email and Contact are required"
        }), 400

    registration = {
        "id": len(registrations) + 1,
        "name": name,
        "email": email,
        "contact": contact
    }

    registrations.append(registration)

    return jsonify({
        "message": "Registration Successful",
        "data": registration
    }), 201


@app.route("/registrations", methods=["GET"])
def get_registrations():
    return jsonify(registrations)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)