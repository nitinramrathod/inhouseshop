'use client'

import { clearSession, setSession } from "@/redux/features/auth-slice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthSync() {
  const { data: session } = useSession();
    const dispatch = useDispatch();

  useEffect(() => {
    if (session) dispatch(setSession(session));
    else dispatch(clearSession());
  }, [session, dispatch]);

  return null;
}
