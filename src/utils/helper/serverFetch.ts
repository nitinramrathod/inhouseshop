import { getServerSession } from "next-auth";
import { AuthOptions } from "@/libs/nextAuth/authOptions";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

interface ServerFetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function serverFetch<T>(
  endpoint: string,
  options: ServerFetchOptions = {}
): Promise<T> {
  const { requireAuth = true, headers, ...rest } = options;

  let authHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (requireAuth) {
    const session = await getServerSession(AuthOptions);

    if (!session?.accessToken) {
      throw new Error("Unauthorized");
    }

    authHeaders.Authorization = `Bearer ${session.accessToken}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    cache: "no-store",
    headers: {
      ...authHeaders,
      ...headers,
    },
    ...rest,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);

    throw new Error(
      error?.message || `Request failed with status ${res.status}`
    );
  }

  return res.json() as Promise<T>;
}
