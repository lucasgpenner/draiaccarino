import { handleContactRequest } from "./lib/contact";
import type { Env } from "./lib/types";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contacto") {
      return handleContactRequest(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};