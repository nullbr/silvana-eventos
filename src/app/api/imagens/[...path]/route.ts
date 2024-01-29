import type { NextRequest } from "next/server";
import { getImageFromStorage } from "~/firebase/server/firebase";
import { initAdmin } from "~/firebase/server/firebaseAdmin";

export async function GET(request: NextRequest) {
  await initAdmin();

  const path = request.nextUrl.pathname.replace("/api/imagens/", "");

  if (!path || typeof path !== "string")
    return new Response(null, { status: 404 });

  const imageUrl = await getImageFromStorage(path);

  const response = await fetch(imageUrl);

  return new Response(response.body, { headers: response.headers });
}
