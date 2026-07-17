import { redirect } from "next/navigation";
import { defaultCountry } from "@/config/countries";

export default function RootPage() {
  redirect(`/${defaultCountry}`);
}
