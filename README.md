# **Thank you to Once UI's Magic Portfolio boilerplate**

👉 [**Gina’s New Portfolio**](https://ginas-new-portfolio.vercel.app/) 🚀  

## **Overview**
This portfolio was built using [Once UI's Magic Portfolio](https://once-ui.com), leveraging its design system while implementing significant customisations to tailor it to my needs.

## **Project Status**
The portfolio features production and near-production work: a commercial Astro/Cloudflare website, an inherited TypeScript product with Stripe and CRM integrations, a Next.js/Supabase data platform, a full-stack guestbook PWA, and an end-to-end data pipeline. Several of these live in private work or organisational repositories, so their case studies describe the architecture and engineering rather than linking source code. Happy to talk through any of them directly.

### **Key Learning Curve & Deployment Challenges**

Building and deploying this portfolio provided a valuable learning experience, particularly in:

- **Optimising code & reducing payload size** to comply with **1MB deployment restrictions** on Vercel.
- **Tree-shaking dependencies** to minimise unnecessary package loads.
- **Dynamic routing and metadata generation** using Next.js.
- **Implementing UI enhancements**, including interactive modals and evidence-grouped skills presentation.

## **Custom Features & Enhancements**
Beyond the original Once-UI template, I introduced several **custom features** to improve usability, accessibility, and interactivity.

### **🔹 Acknowledgement Pop-Up**
- Implemented a **custom pop-up modal** that appears upon first visit, paying respect to Traditional Custodians.
- Users need to **acknowledge the modal**, before diving into content.

### **🔹 Evidence-based Skills page**
- Skills are grouped by capability and tagged with the **strongest evidence behind them** — production experience, practical experience, working knowledge, or currently developing — instead of subjective out-of-ten scores.
- A single chart.js overview summarises how that evidence is distributed, with a screen-reader text alternative alongside the canvas.

### **🔹 Portfolio Optimisation**
- **Lazy-loaded components & images** to improve performance.
- **Optimised once-ui imports** to **tree-shake unused dependencies**, preventing unnecessary code from being bundled.
- **Refactored metadata generation** to streamline Open Graph image handling using **next/og**.

## **📌 Features from Once-UI**

### **🎨 Once UI Design System**
- Fully responsive design, optimised for all screen sizes.
- Endless customisation options via **[data attributes](https://once-ui.com/docs/theming)**.
- Pre-built **tokens, components & features** for rapid development.

### **📈 SEO & Metadata**
- Automatic **Open Graph & Twitter card image generation** using **next/og**.
- Schema.org metadata generation based on content structure.

### **📝 Content Management**
- Dynamic content rendering for sections based on JSON or Markdown files.
- Auto-generated and displayed **social links**.

## **🚀 Deployment**
This portfolio is **deployed on Vercel**, leveraging its **Edge Functions** and **static optimisations** for **high-performance rendering**.  

![Deployed with Vercel](https://ginas-new-portfolio.vercel.app/)

## **💡 Lessons Learned**
Building this portfolio has been an incredible journey, significantly enhancing my expertise in:
- **Next.js performance optimisation**
- **Reducing build size and handling deployment constraints**
- **Leveraging Once-UI’s design system while maintaining customisation flexibility**
- **Improving project structure for scalability**
  
### **✨ Thank You to Once-UI & the Dev Community**
A huge thanks to **Once-UI** for providing an **amazing boilerplate** and to the **developer community** for the insightful discussions around **Next.js, optimisation strategies, and deployment best practices**!

---

### **📌 Next Steps**
1. **Continued Portfolio Enhancements** – Further optimising performance and adding new projects.
2. **User Feedback Integration** – Iterating on UX improvements based on visitor behavior.
3. **Post-launch metrics for Andromedae** – Replacing pre-launch benchmarks with production Lighthouse and Core Web Vitals results once the domain cutover is verified.

---

### **🔗 Visit My Portfolio Here:**
👉 [**Gina’s New Portfolio**](https://ginas-new-portfolio.vercel.app/) 🚀  
