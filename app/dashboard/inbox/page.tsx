import { redirect } from "next/navigation";

// inbox was replaced by /dashboard/unibox
export default function InboxRedirect() {
  redirect("/dashboard/unibox");
}
