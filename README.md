# LexiaCode Official Website

Official repository for the **LexiaCode** product and technology website.

LexiaCode is a product and technology studio specializing in Web3/RWA functional architecture, Solidity smart contract development and testing, and AI-enabled application engineering and workflow automation.

---

## 🏛️ Positioning & Core Capabilities

LexiaCode operates strictly as a product and software engineering studio. We assist organizations and founders in designing, architecting, testing, and delivering technology solutions across structured stages:

- **Web3 & RWA Product Design**: Functional architecture, tokenomics mechanics modeling, and compliance-by-design access-control logic.
- **Solidity Smart Contracts**: Custom smart contract development, automated unit testing suites (Hardhat/EVM), and code logic and security risk review following reference standards like ERC-3643.
- **AI-Enabled Applications & Automation**: Cognitive workflow automation, document processing pipelines, specialized LLM integrations, and custom administrative interfaces/dashboards.
- **Staged Technical Delivery**: Preliminary technical due diligence, functional specifications, iterative development sprints, and coordination with independent legal and compliance advisors.

### 👤 Leadership

- **Julio Antonio Villalobo** — *Managing Director | Technology, AI & Product Lead*
  - Responsibilities: Product direction, functional architecture, Solidity smart contract development and testing, QA oversight, technical stakeholder coordination, and staged milestone deliveries.
  - Profile: [LinkedIn](https://www.linkedin.com/in/julio-antonio-villalobo-770b22296) | [GitHub](https://github.com/julitodk06)

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) — Configured for static HTML export (output: 'export')
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/)
- **Internationalization**: Lightweight client context supporting Spanish, English, and Portuguese (lib/language-context.tsx).
- **Interactive Assistant**: Local, deterministic technical assistant running entirely client-side without external backend or API dependencies.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20.x
- [npm](https://www.npmjs.com/) >= 10.x

### Installation

Clone the repository and install dependencies using a clean install:

```bash
git clone https://github.com/julitodk06/lexiacode-website.git
cd lexiacode-website
npm ci
```

### Verification & Quality Checks

Run the verification scripts locally:

```bash
# Run ESLint validation
npm run lint

# Run TypeScript type check
npm run typecheck

# Run security audit
npm audit --audit-level=high
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Static Export

Create an optimized static build:

```bash
npm run build
```

This generates a fully static production export in the `out/` directory. The contents of `out/` can be directly hosted on any static hosting platform (e.g., GitHub Pages, Cloudflare Pages, AWS S3/CloudFront, Hostinger, Vercel, or Nginx/Apache web servers).

---

## 🔒 Legal & Regulatory Disclaimer

LexiaCode is a software engineering and product technology studio. It is **not** a law firm, a regulated financial institution, an asset custodian, or an investment adviser. Nothing on this website or repository constitutes legal, financial, tax, or investment advice, nor an offer of securities. All legal structuring and regulatory assessment must be performed by qualified independent professionals for each respective jurisdiction.

---

## 🌐 Official Channels

- **Website**: [https://lexiacode.com](https://lexiacode.com)
- **Contact Email**: [juliov@lexiacode.com](mailto:juliov@lexiacode.com)
- **Phone**: +54 381 540 0016
- **Location**: Yerba Buena, Tucumán, Argentina
- **Founder Profile**: [https://www.linkedin.com/in/julio-antonio-villalobo-770b22296](https://www.linkedin.com/in/julio-antonio-villalobo-770b22296)
