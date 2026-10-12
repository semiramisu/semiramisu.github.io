/**
 * Client-side UI language switcher (?lang=en).
 * The site is statically built in Japanese; this swaps labelled UI strings
 * and propagates the lang parameter to internal links.
 */
import { translations, type Lang } from "../i18n/ui";

function resolveLang(): Lang {
  const param = new URLSearchParams(location.search).get("lang");
  if (param === "en" || param === "ja") {
    localStorage.setItem("preferred-language", param);
    return param;
  }
  const stored = localStorage.getItem("preferred-language");
  return stored === "en" ? "en" : "ja";
}

function applyLang(lang: Lang) {
  document.documentElement.lang = lang;
  const dict = translations[lang];

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const value = dict[el.dataset.i18n ?? ""];
    if (value) el.textContent = value;
  });

  document.querySelectorAll<HTMLElement>("[data-i18n-aria]").forEach((el) => {
    const value = dict[el.dataset.i18nAria ?? ""];
    if (value) el.setAttribute("aria-label", value);
  });

  document
    .querySelectorAll<HTMLInputElement>("[data-i18n-placeholder]")
    .forEach((el) => {
      const value = dict[el.dataset.i18nPlaceholder ?? ""];
      if (value) el.placeholder = value;
    });

  // keep ?lang=en across internal navigation; drop it when back to ja
  document
    .querySelectorAll<HTMLAnchorElement>('a[href^="/"], a[href^="' + location.origin + '"]')
    .forEach((a) => {
      const url = new URL(a.getAttribute("href")!, location.origin);
      if (lang === "en") {
        url.searchParams.set("lang", "en");
      } else {
        url.searchParams.delete("lang");
      }
      a.setAttribute("href", url.pathname + url.search + url.hash);
    });
}

const lang = resolveLang();
if (lang === "en") applyLang(lang);

const langButton = document.getElementById("lang-toggle");
if (langButton) langButton.textContent = lang;

// header language toggle (rendered by Header.astro if present)
langButton?.addEventListener("click", () => {
  const next: Lang = resolveLang() === "en" ? "ja" : "en";
  localStorage.setItem("preferred-language", next);
  const url = new URL(location.href);
  if (next === "en") {
    url.searchParams.set("lang", "en");
  } else {
    url.searchParams.delete("lang");
  }
  location.href = url.toString();
});
