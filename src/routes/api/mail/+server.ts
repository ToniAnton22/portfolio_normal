import { MAILTRAP_API, SENDER } from '$env/static/private';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { name, email, subject, message } = await request.json();

		const { MailtrapClient } = await import('mailtrap');

		const client = new MailtrapClient({
			token: MAILTRAP_API
		});

		const sender = {
			email: SENDER,
			name
		};

		const recipients = [
			{
				email: 'frincucristiananton@gmail.com'
			}
		];

		const response = await client.send({
			from: sender,
			to: recipients,
			subject,
			text: message
		});

		if (response.success) {
			await client.send({
				from: sender,
				to: [
					{
						email
					}
				],
				subject: 'Thank you for reaching out',
				text: `Hi ${name},

Thank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible.

In the meantime, here's a summary of what you sent:

Subject: ${subject}
Message: ${message}

I typically respond within 24-48 hours. If your inquiry is urgent, feel free to reach out to me directly.

Best regards,
Toni Frincu
${SENDER} / frincucristiananton@gmail.com`,
				html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333; border-bottom: 2px solid #4a5568; padding-bottom: 10px;">Thank you for reaching out</h2>
                
                <p style="color: #555; line-height: 1.6;">Hi ${name},</p>
                
                <p style="color: #555; line-height: 1.6;">
                    Thank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible.
                </p>
                
                <div style="background-color: #f7fafc; border-left: 4px solid #4a5568; padding: 15px; margin: 20px 0;">
                    <p style="margin: 0; color: #666; font-size: 14px;"><strong>Subject:</strong> ${subject}</p>
                    <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;"><strong>Message:</strong></p>
                    <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">${message}</p>
                </div>
                
                <p style="color: #555; line-height: 1.6;">
                    I typically respond within 24-48 hours. If your inquiry is urgent, feel free to reach out to me directly.
                </p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                    <p style="color: #888; font-size: 14px; margin: 0;">Best regards,</p>
                    <p style="color: #333; font-weight: bold; margin: 5px 0;">Toni Frincu</p>
                    <p style="color: #888; font-size: 14px; margin: 0;">${SENDER}</p>
                </div>
            </div>
        `
			});
		}

		return json({ message: 'Successfully sent the email', success: true }, { status: 200 });
	} catch (e) {
		console.error(e);
		return error(500, { message: e.message, success: false });
	}
};
