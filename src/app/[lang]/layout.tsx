import { notFound } from "next/navigation";
import type { LayoutProps } from "next/types";
import { hasLocale, locales } from "./dictionaries";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <>{children}</>;
}
