/// <reference types="astro/client" />

/** Google Analytics gtag.js — injected at runtime in Layout.astro */
declare function gtag(...args: unknown[]): void;

declare module 'disposable-email-domains' {
  const domains: string[];
  export default domains;
}
