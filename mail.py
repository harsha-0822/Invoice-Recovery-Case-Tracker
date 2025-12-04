import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

EMAIL = os.getenv("EMAIL")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

def send_email(subject, message, to_address):
    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL
        msg["To"] = to_address
        msg["Subject"] = subject

        msg.attach(MIMEText(message, "plain"))

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL, EMAIL_PASSWORD)
        server.sendmail(EMAIL, to_address, msg.as_string())
        server.quit()
        print("Mail sent successfully")

    except Exception as e:
        print("Mail error:", e)
