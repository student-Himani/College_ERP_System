import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, message) => {
  try {
    if (!to) return;

    await transporter.sendMail({
      from: `"College ERP" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: message,
    });
  } catch (error) {
    console.error("Email send failed:", error.message);
  }
};

export const sendLeaveApprovalEmail = async (studentEmail, name, status) => {
  const subject = `Leave Request ${status}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background: #0B1F3A; color: #ffffff; padding: 16px 20px;">
        <h2 style="margin: 0;">College ERP - Leave Update</h2>
      </div>
      <div style="padding: 20px; color: #111827;">
        <p>Hi ${name || "Student"},</p>
        <p>Your hostel leave request is <strong>${status.toLowerCase()}</strong>.</p>
        <p>Please login to your dashboard for full details.</p>
      </div>
    </div>
  `;

  await sendEmail(studentEmail, subject, html);
};

export const sendAttendanceEmail = async (studentEmail, status) => {
  const subject = status === "success" ? "Attendance Marked Successfully" : "Attendance Marking Failed";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background: #0B1F3A; color: #ffffff; padding: 16px 20px;">
        <h2 style="margin: 0;">College ERP - Attendance Update</h2>
      </div>
      <div style="padding: 20px; color: #111827;">
        <p>Your hostel attendance status: <strong>${status}</strong>.</p>
        <p>${status === "success" ? "Attendance marked successfully." : "Attendance could not be marked due to rule validation."}</p>
      </div>
    </div>
  `;

  await sendEmail(studentEmail, subject, html);
};
