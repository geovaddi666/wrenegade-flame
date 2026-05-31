import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, eventType, eventDate, message } = body;

    if (!name || !email) {
      return Response.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const html = `
      <h2>New Booking Enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Event Type:</strong> ${escapeHtml(eventType) || 'Not provided'}</p>
      <p><strong>Event Date:</strong> ${escapeHtml(eventDate) || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br />') || 'No message provided'}</p>
    `;

    const { error } = await resend.emails.send({
      from: 'contact@wrenegade.co.uk',
      to: 'flame@wrenegade.co.uk',
      replyTo: email,
      subject: `New Booking Enquiry from ${name}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Contact route error:', err);
    return Response.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
