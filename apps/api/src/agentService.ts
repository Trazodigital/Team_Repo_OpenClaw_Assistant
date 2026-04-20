/**
 * agentService.ts — Wrapper delgado sobre el gateway HTTP de OpenClaw.
 *
 * Este archivo es el ÚNICO punto de contacto entre nuestra API
 * y OpenClaw. Si mañana reemplazamos OpenClaw por otro servicio,
 * solo se modifica este archivo.
 *
 * OpenClaw expone una API compatible con OpenAI en:
 *   http://127.0.0.1:18789/v1/chat/completions
 *
 * Prerequisito: openclaw gateway --force corriendo en otra terminal.
 */

export interface AgentTaskResult<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
  durationMs: number;
}

const OPENCLAW_URL = process.env.OPENCLAW_URL ?? "http://127.0.0.1:18789";
const OPENCLAW_MODEL = process.env.OPENCLAW_MODEL ?? "google/gemini-2.5-flash";
const OPENCLAW_TOKEN = process.env.OPENCLAW_TOKEN ?? "";

export async function runAgentTask<T = unknown>(
  prompt: string,
): Promise<AgentTaskResult<T>> {
  const start = performance.now();

  try {
    const res = await fetch(`${OPENCLAW_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(OPENCLAW_TOKEN && { Authorization: `Bearer ${OPENCLAW_TOKEN}` }),
      },
      body: JSON.stringify({
        model: OPENCLAW_MODEL,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Gateway responded ${res.status}: ${errBody}`);
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content;

    let parsed: T;
    try {
      parsed = JSON.parse(content) as T;
    } catch {
      parsed = content as T;
    }

    return {
      success: true,
      data: parsed,
      error: null,
      durationMs: Math.round(performance.now() - start),
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : String(err),
      durationMs: Math.round(performance.now() - start),
    };
  }
}
