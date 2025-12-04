from flask import Flask
from flask_cors import CORS
from routes.clients import clients_bp
from routes.cases import cases_bp

app = Flask(__name__)
CORS(app)

# Register Routes
app.register_blueprint(clients_bp)
app.register_blueprint(cases_bp)

@app.route('/')
def home():
    return {"message": "PayAssured Backend Running"}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
