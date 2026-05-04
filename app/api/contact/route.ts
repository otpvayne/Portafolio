import { NextRequest, NextResponse } from "next/server";
import {
  validateName,
  validateEmail,
  validateMessage,
  sanitizeInput,
  escapeForTelegram,
} from "./_utils/validation";
import { isRateLimited, recordRequest } from "./_utils/rateLimiter";

export async function POST(req: NextRequest) {
  try {
    // Extract client IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "rateLimited" }, { status: 429 });
    }

    // Parse request body
    const body = await req.json();
    const { name, email, message } = body;

    // Validate and sanitize inputs
    const nameValidation = validateName(name);
    if (!nameValidation.valid) {
      return NextResponse.json({ error: nameValidation.error }, { status: 400 });
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return NextResponse.json(
        { error: emailValidation.error },
        { status: 400 }
      );
    }

    const messageValidation = validateMessage(message);
    if (!messageValidation.valid) {
      return NextResponse.json(
        { error: messageValidation.error },
        { status: 400 }
      );
    }

    // Sanitize all inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // Record successful validation (before Telegram send attempt)
    recordRequest(ip);

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.log("📩 Nuevo mensaje de contacto:", {
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
        ip,
      });
      return NextResponse.json({ ok: true });
    }

    // Escape inputs for safe Telegram HTML display
    const escapedName = escapeForTelegram(sanitizedName);
    const escapedEmail = escapeForTelegram(sanitizedEmail);
    const escapedMessage = escapeForTelegram(sanitizedMessage);

    // Send to Telegram
    const telegramMessage = `📬 <b>Nuevo mensaje de contacto</b>\n\n<b>Nombre:</b> ${escapedName}\n<b>Email:</b> ${escapedEmail}\n\n<b>Mensaje:</b>\n${escapedMessage}`;

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "HTML",
        }),
      }
    );

    if (!telegramRes.ok) {
      const err = await telegramRes.text();
      console.error("Telegram error:", err);
      return NextResponse.json(
        { error: "telegram_error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact form error:", e);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
