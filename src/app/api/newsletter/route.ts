import { obtenerPayload } from "@/lib/payload";
import { NextResponse } from "next/server";

// Alta pública de suscriptores (boletín general). El boletín segmentado para
// alumnado no usa esta tabla: se arma a partir de usuarios con rol "alumnado".
export async function POST(request: Request) {
  const { email } = await request.json();

  if (typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const payload = await obtenerPayload();

  const existente = await payload.find({
    collection: "suscriptores",
    where: { email: { equals: email } },
    limit: 1,
  });

  if (!existente.docs[0]) {
    await payload.create({
      collection: "suscriptores",
      data: { email },
    });
  }

  return NextResponse.json({ ok: true });
}
