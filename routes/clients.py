from flask import Blueprint, request, jsonify
from db import get_connection
from mail import send_email

clients_bp = Blueprint('clients', __name__)

# Create Client
@clients_bp.route('/clients', methods=['POST'])

def create_client():
    data = request.json

    required = ["client_name", "company_name", "city", "contact_person", "phone", "email"]
    if not all(field in data for field in required):
        return jsonify({"error": "Missing fields"}), 400

    conn = get_connection()
    cursor = conn.cursor()

    query = """
        INSERT INTO clients (client_name, company_name, city, contact_person, phone, email)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    values = (
        data["client_name"],
        data["company_name"],
        data["city"],
        data["contact_person"],
        data["phone"],
        data["email"]
    )

    cursor.execute(query, values)
    conn.commit()

    cursor.close()
    conn.close()

#     send_email(
#     subject="New Client Added",
#     recipients=["hvsm0811@gmail.com"],
#     body=f"Client {data['client_name']} has been added."
# )

    send_email(
    subject="New Client Created",
    message=f"Client {data['client_name']} added.",
    to_address="hvsm0811@gmail.com"
    )

    return jsonify({"message": "Client created successfully"}), 201


# Get All Clients
@clients_bp.route('/clients', methods=['GET'])
def get_clients():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM clients")
    clients = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(clients), 200
