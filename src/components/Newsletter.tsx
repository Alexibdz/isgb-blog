"use client";

import { useState, type FormEvent } from "react";

type Estado = "inicial" | "enviando" | "ok" | "error";

export function Newsletter() {
  const [estado, setEstado] = useState<Estado>("inicial");
  const [email, setEmail] = useState("");

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("No se pudo suscribir");
      setEstado("ok");
      setEmail("");
    } catch {
      setEstado("error");
    }
  }

  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-xl bg-celeste-deep px-8 py-7 text-white">
      <div>
        <h3 className="font-display text-xl">Recibí las novedades del instituto</h3>
        <p className="mt-1 max-w-sm text-sm text-white/80">
          Carreras, noticias y posteos nuevos, directo a tu correo. Cancelás cuando quieras.
        </p>
      </div>

      {estado === "ok" ? (
        <p className="text-sm font-semibold">¡Listo! Ya estás suscripto.</p>
      ) : (
        <form onSubmit={enviar} className="flex flex-wrap gap-2.5">
          <label htmlFor="newsletter-email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="min-w-60 rounded-md border border-white/25 bg-white/10 px-3.5 py-3 text-sm text-white placeholder:text-white/60 focus:outline-2 focus:outline-white"
          />
          <button
            type="submit"
            disabled={estado === "enviando"}
            className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-celeste-deep transition hover:bg-celeste-soft disabled:opacity-60"
          >
            {estado === "enviando" ? "Enviando…" : "Suscribirme"}
          </button>
        </form>
      )}
      {estado === "error" && (
        <p className="w-full text-sm text-warn-soft">
          Algo falló. Probá de nuevo en un momento.
        </p>
      )}
    </div>
  );
}
