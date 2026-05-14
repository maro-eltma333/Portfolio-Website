"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "All fields are required" };
  }

  try {
    // 1. Send notification email to the site owner (You)
    const ownerResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "maroworkuser@gmail.com",
      replyTo: email,
      subject: `New Portfolio Inquiry from ${name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border: 1px solid #eaeaec; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #f6e05e;">
            <h2 style="color: #1a202c; margin: 0; font-size: 24px; font-weight: 700;">New Portfolio Inquiry</h2>
          </div>
          <div style="padding: 20px 0; color: #4a5568; line-height: 1.6;">
            <p style="font-size: 16px;">You have received a new message from your website's contact form.</p>
            <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>👤 Name:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0;"><strong>✉️ Email:</strong> <a href="mailto:${email}" style="color: #3182ce; text-decoration: none;">${email}</a></p>
            </div>
            <h4 style="color: #2d3748; font-size: 16px; margin-bottom: 10px;">Message:</h4>
            <div style="background-color: #edf2f7; padding: 20px; border-left: 4px solid #f6e05e; border-radius: 4px; font-style: italic; color: #2d3748; white-space: pre-wrap;">${message}</div>
          </div>
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eaeaec; color: #a0aec0; font-size: 12px;">
            <p>This email was sent automatically from your Next.js Portfolio.</p>
          </div>
        </div>
      `,
    });

    if (ownerResponse.error) {
      throw new Error(ownerResponse.error.message);
    }

    // 2. Send Auto-Responder to the User
    // Note: On Resend's free tier, this will fail unless you have a verified custom domain.
    // We wrap it in a try/catch so it doesn't break the form submission if it fails.
    try {
      await resend.emails.send({
        from: "Ammar Ahmed <onboarding@resend.dev>",
        to: email,
        replyTo: "maroworkuser@gmail.com",
        subject: `Thank you for reaching out, ${name}!`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border: 1px solid #eaeaec; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #f6e05e;">
              <h2 style="color: #1a202c; margin: 0; font-size: 24px; font-weight: 700;">Thank You for Reaching Out!</h2>
            </div>
            <div style="padding: 20px 0; color: #4a5568; line-height: 1.6;">
              <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
              <p style="font-size: 16px;">Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible!</p>
              <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 5px 0; color: #718096; font-size: 14px;">For your records, here is a copy of your message:</p>
                <p style="margin: 0; color: #2d3748; font-style: italic; white-space: pre-wrap;">"${message}"</p>
              </div>
              <p style="font-size: 16px; margin-top: 20px;">Best regards,<br/><strong style="color: #1a202c;">Ammar Ahmed</strong><br/><span style="color: #718096; font-size: 14px;">Full-Stack Developer & Cybersecurity Student</span></p>
            </div>
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eaeaec; color: #a0aec0; font-size: 12px;">
              <p>You can reply directly to this email to reach me.</p>
            </div>
          </div>
        `,
      });
    } catch (userEmailError) {
      console.log("Could not send auto-responder to user. This requires a verified domain on Resend.");
    }

    return { success: true, data: ownerResponse.data };
  } catch (error: any) {
    return { error: error.message };
  }
}
