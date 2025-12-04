from flask import Blueprint, request, jsonify
from db import get_connection
from mail import send_email


cases_bp = Blueprint('cases', __name__)

# Create Case
@cases_bp.route('/cases', methods=['POST'])
def create_case():
    data = request.json

    required = [
        "client_id", "invoice_number", "invoice_amount",
        "invoice_date", "due_date", "status", "last_follow_up_notes"
    ]
    if not all(field in data for field in required):
        return jsonify({"error": "Missing fields"}), 400

    conn = get_connection()
    cursor = conn.cursor()

    query = """
        INSERT INTO cases (client_id, invoice_number, invoice_amount,
                           invoice_date, due_date, status, last_follow_up_notes)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """

    values = (
        data["client_id"],
        data["invoice_number"],
        data["invoice_amount"],
        data["invoice_date"],
        data["due_date"],
        data["status"],
        data["last_follow_up_notes"]
    )

    cursor.execute(query, values)
    conn.commit()

    cursor.close()
    conn.close()


    # send_email(
    # subject="New Case Created",
    # recipients=["hvsm0811@gmail.com"],
    # body=f"New case created for client ID {data['client_id']} with invoice {data['invoice_number']}"
    # )
    send_email(
    subject="New Case Created",
    message=f"Case created for client ID {data['client_id']} - Invoice {data['invoice_number']}",
    to_address="hvsm0811@gmail.com"
    )



    return jsonify({"message": "Case created successfully"}), 201


# Get All Cases
@cases_bp.route('/cases', methods=['GET'])
def get_cases():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT cases.*, clients.client_name
        FROM cases
        JOIN clients ON cases.client_id = clients.id
        ORDER BY due_date ASC
    """

    cursor.execute(query)
    records = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(records), 200


# Get Case by ID
@cases_bp.route('/cases/<int:id>', methods=['GET'])
def get_case(id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT cases.*, clients.client_name
        FROM cases
        JOIN clients ON cases.client_id = clients.id
        WHERE cases.id = %s
    """

    cursor.execute(query, (id,))
    record = cursor.fetchone()

    cursor.close()
    conn.close()

    if not record:
        return jsonify({"error": "Case not found"}), 404

    return jsonify(record), 200


# Update Case (status + last notes)
@cases_bp.route('/cases/<int:id>', methods=['PATCH'])
def update_case(id):
    data = request.json

    allowed_fields = ["status", "last_follow_up_notes"]

    if not any(field in data for field in allowed_fields):
        return jsonify({"error": "Nothing to update"}), 400

    conn = get_connection()
    cursor = conn.cursor()

    updates = []
    values = []

    if "status" in data:
        updates.append("status = %s")
        values.append(data["status"])

    if "last_follow_up_notes" in data:
        updates.append("last_follow_up_notes = %s")
        values.append(data["last_follow_up_notes"])

    values.append(id)

    query = f"UPDATE cases SET {', '.join(updates)} WHERE id = %s"

    cursor.execute(query, values)
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Case updated successfully"}), 200
