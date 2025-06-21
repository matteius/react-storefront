import { type NextRequest, NextResponse } from "next/server";
import Mailjet from "node-mailjet";

function getMailjetClient() {
	return new Mailjet({
		apiKey: process.env.MAILJET_API_KEY || "",
		apiSecret: process.env.MAILJET_SECRET_KEY || "",
	});
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { email } = body as { email: string };

		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
		}

		// Check if Mailjet credentials are configured
		if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_SECRET_KEY) {
			console.error("Mailjet credentials not configured");
			return NextResponse.json({ error: "Newsletter service not configured" }, { status: 500 });
		}

		// Initialize Mailjet client
		const mailjet = getMailjetClient();

		// Add contact to Mailjet contact list
		const listId = process.env.MAILJET_LIST_ID;

		if (listId) {
			// Add to specific list if LIST_ID is provided
			await mailjet
				.post("contactslist", { version: "v3" })
				.id(listId)
				.action("managecontact")
				.request({
					Email: email,
					Action: "addnoforce", // Won't add if already exists
					Properties: {
						source: "website_newsletter",
						signup_date: new Date().toISOString(),
					},
				});
		} else {
			// Just add as a contact if no specific list
			await mailjet.post("contact", { version: "v3" }).request({
				Email: email,
				IsExcludedFromCampaigns: false,
			});
		}

		// Send welcome email (optional)
		if (process.env.MAILJET_SEND_WELCOME === "true") {
			await mailjet.post("send", { version: "v3.1" }).request({
				Messages: [
					{
						From: {
							Email: process.env.MAILJET_FROM_EMAIL || "noreply@mattscoinage.com",
							Name: "Matt's Coinage",
						},
						To: [
							{
								Email: email,
							},
						],
						Subject: "Welcome to Matt's Coinage Newsletter!",
						TextPart: `Welcome to Matt's Coinage newsletter! 

Thank you for subscribing to our newsletter. You'll now receive updates about:
- New coin arrivals and rare finds
- Exclusive sale items and special offers  
- Expert collecting insights and market trends
- Educational content about numismatics

We're excited to have you as part of our collecting community!

Best regards,
The Matt's Coinage Team

---
If you no longer wish to receive these emails, you can unsubscribe at any time.`,
						HTMLPart: `
								<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
									<div style="background: linear-gradient(135deg, #d97706, #f59e0b, #eab308); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
										<h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Matt's Coinage!</h1>
									</div>
									
									<h2 style="color: #92400e;">Thank you for subscribing!</h2>
									
									<p style="color: #374151; line-height: 1.6;">
										You'll now receive updates about:
									</p>
									
									<ul style="color: #374151; line-height: 1.8;">
										<li>🪙 New coin arrivals and rare finds</li>
										<li>🏷️ Exclusive sale items and special offers</li>
										<li>📈 Expert collecting insights and market trends</li>
										<li>📚 Educational content about numismatics</li>
									</ul>
									
									<p style="color: #374151; line-height: 1.6;">
										We're excited to have you as part of our collecting community!
									</p>
									
									<div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
										<p style="color: #6b7280; margin: 0; text-align: center;">
											Best regards,<br>
											<strong>The Matt's Coinage Team</strong>
										</p>
									</div>
									
									<p style="color: #9ca3af; font-size: 12px; text-align: center;">
										If you no longer wish to receive these emails, you can unsubscribe at any time.
									</p>
								</div>
							`,
					},
				],
			});
		}

		return NextResponse.json({ message: "Successfully subscribed to newsletter!" }, { status: 200 });
	} catch (error: unknown) {
		console.error("Newsletter subscription error:", error);

		// Handle specific Mailjet errors
		if (error && typeof error === "object" && "statusCode" in error && "message" in error) {
			const mailjetError = error as { statusCode: number; message: string };
			if (mailjetError.statusCode === 400 && mailjetError.message?.includes("already exists")) {
				return NextResponse.json(
					{ error: "This email is already subscribed to our newsletter" },
					{ status: 409 },
				);
			}
		}

		return NextResponse.json(
			{ error: "Failed to subscribe to newsletter. Please try again." },
			{ status: 500 },
		);
	}
}
