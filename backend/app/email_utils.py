"""Utilitário de envio de email via SMTP."""
import os
import smtplib
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

logger = logging.getLogger(__name__)

NOTIFY_EMAIL = "luciano.dias@nacionalsign.com"


def send_contact_email(name: str, email: str, subject: str, message: str) -> bool:
    """
    Envia notificação de novo contato para luciano.dias@nacionalsign.com.
    Retorna True em sucesso, False se SMTP não configurado ou erro.
    """
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")

    if not all([smtp_host, smtp_user, smtp_pass]):
        logger.warning("SMTP não configurado — email de contato não enviado.")
        return False

    assunto = f"[Site] Novo contato: {subject or 'sem assunto'}"

    html = f"""
    <html>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                 background: #09090b; color: #fafafa; padding: 32px; max-width: 600px;">

      <div style="margin-bottom: 32px;">
        <h2 style="color: #6366f1; font-size: 18px; margin: 0 0 4px;">
          Novo contato pelo site
        </h2>
        <p style="color: #71717a; font-size: 13px; margin: 0;">
          construindodo0.com.br
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #27272a;
                     color: #71717a; font-size: 13px; width: 100px;">Nome</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #27272a;
                     color: #fafafa; font-size: 14px;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #27272a;
                     color: #71717a; font-size: 13px;">Email</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #27272a;
                     color: #6366f1; font-size: 14px;">
            <a href="mailto:{email}" style="color: #6366f1;">{email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #27272a;
                     color: #71717a; font-size: 13px;">Assunto</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #27272a;
                     color: #fafafa; font-size: 14px;">{subject or '—'}</td>
        </tr>
      </table>

      <div style="background: #18181b; border: 1px solid #27272a; border-radius: 8px;
                  padding: 20px; margin-bottom: 24px;">
        <p style="color: #71717a; font-size: 12px; text-transform: uppercase;
                  letter-spacing: 0.1em; margin: 0 0 12px;">Mensagem</p>
        <p style="color: #a1a1aa; font-size: 14px; line-height: 1.7; margin: 0;
                  white-space: pre-wrap;">{message}</p>
      </div>

      <a href="mailto:{email}?subject=Re: {subject or 'Seu contato'}"
         style="display: inline-block; background: #6366f1; color: #fff;
                text-decoration: none; padding: 12px 24px; border-radius: 8px;
                font-size: 14px; font-weight: 600;">
        Responder para {name}
      </a>

    </body>
    </html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = assunto
    msg["From"]    = smtp_user
    msg["To"]      = NOTIFY_EMAIL
    msg["Reply-To"] = email
    msg.attach(MIMEText(html, "html", "utf-8"))

    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.ehlo()
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, NOTIFY_EMAIL, msg.as_string())
        logger.info(f"Email de contato enviado: {email} → {NOTIFY_EMAIL}")
        return True
    except Exception as exc:
        logger.error(f"Erro ao enviar email: {exc}")
        return False
