import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { siteConfig } from "@/data/site-config.data"
import type { ContactFormPayload } from "@/types/contact.types"

export async function POST(request: Request) {
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const { recipients, senderName, subjectPrefix } = siteConfig.contactForm

  if (!smtpUser || !smtpPass) {
    return NextResponse.json(
      { success: false, message: "Mail service is not configured." },
      { status: 500 }
    )
  }

  if (recipients.length === 0) {
    return NextResponse.json(
      { success: false, message: "No recipients configured." },
      { status: 500 }
    )
  }

  let body: ContactFormPayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    )
  }

  const { name, email, message, phone } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { success: false, message: "Name, email, and message are required." },
      { status: 400 }
    )
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #e67e22; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 100px;">Name</td>
          <td style="padding: 8px 12px; color: #333;">${name}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email</td>
          <td style="padding: 8px 12px; color: #333;">
            <a href="mailto:${email}" style="color: #e67e22;">${email}</a>
          </td>
        </tr>
        ${phone ? `
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; color: #555;">Phone</td>
          <td style="padding: 8px 12px; color: #333;">
            <a href="tel:${phone}" style="color: #e67e22;">${phone}</a>
          </td>
        </tr>
        ` : ""}
        <tr style="background: #f9f9f9;">
          <td style="padding: 8px 12px; font-weight: bold; color: #555; vertical-align: top;">Message</td>
          <td style="padding: 8px 12px; color: #333; white-space: pre-wrap;">${message}</td>
        </tr>
      </table>
      <p style="margin-top: 24px; font-size: 12px; color: #999;">
        Sent from the RCTNE website contact form
      </p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"${senderName}" <${smtpUser}>`,
      to: recipients.join(", "),
      replyTo: email,
      subject: `${subjectPrefix}: ${name}`,
      html,
    })

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    })
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to send email. Please try again later." },
      { status: 500 }
    )
  }
}

