import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Rocket, 
  Shield, 
  Award,
  Download,
  Calendar,
  CheckCircle,
  ChevronDown,
  Briefcase,
  Target,
  Globe,
  Zap,
  DollarSign,
  Clock,
  BarChart3,
  Star,
  Mail,
  Send,
  Phone,
  Brain,
  Layers,
  Eye,
  GitBranch,
  RefreshCw,
  Network,
  Building2,
  Smartphone,
  X,
  ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { trpc } from '@/lib/trpc';

const INVESTOR_BRIEF_PDF_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029149863/X4TbsfVB7MDUndQ2ovXiVF/investorsquestions_49e3a83f.pdf";

const ROBOT_FEMALE_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029149863/X4TbsfVB7MDUndQ2ovXiVF/robot-female-ai_32a5c96a.png";
const NEON_FEMALE_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029149863/X4TbsfVB7MDUndQ2ovXiVF/neionimage_60ffe072.png";

export default function Investors() {
  const [faqSearch, setFaqSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', investmentRange: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');

  // tRPC mutations
  const trackEvent = trpc.investor.trackEvent.useMutation();
  const submitContact = trpc.investor.submitContact.useMutation({
    onSuccess: () => { setContactSubmitted(true); setContactError(''); },
    onError: (err) => { setContactError(err.message || 'Failed to send. Please try again.'); },
  });

  const handleTrackEvent = (eventType: Parameters<typeof trackEvent.mutate>[0]['eventType'], metadata?: Record<string, unknown>) => {
    trackEvent.mutate({ eventType, metadata, referrer: typeof window !== 'undefined' ? document.referrer : undefined });
  };
  // Investment Tiers Data
  const investmentTiers = [
    {
      band: 'A',
      name: 'Early Supporter',
      minInvestment: '1,000 OMR',
      instrument: 'SAFE / Convertible',
      intendedFor: 'Early supporters',
      timeHorizon: '24–48 months',
      expectedMultiple: '5×–10×',
      useOfFunds: 'Product hardening, validation',
      benefits: ['Equity stake', 'Quarterly updates', 'Early access to beta features']
    },
    {
      band: 'B',
      name: 'Early Angel',
      minInvestment: '3,000 OMR',
      instrument: 'SAFE / Convertible',
      intendedFor: 'Early angels',
      timeHorizon: '24–36 months',
      expectedMultiple: '7×–12×',
      useOfFunds: 'Monetization engine, B2B pilots',
      benefits: ['Equity stake', 'Quarterly updates', 'Priority support', 'Investor community access']
    },
    {
      band: 'C',
      name: 'Strategic Angel',
      minInvestment: '5,000 OMR',
      instrument: 'Angel Equity / Lead SAFE',
      intendedFor: 'Strategic angels',
      timeHorizon: '18–36 months',
      expectedMultiple: '8×–15×',
      useOfFunds: 'Revenue acceleration',
      isPopular: true,
      benefits: ['Equity stake', 'Monthly updates', 'Advisory role', 'Networking events', 'Product roadmap input']
    },
    {
      band: 'D',
      name: 'Enterprise Partner',
      minInvestment: '10,000 OMR',
      instrument: 'Strategic Angel Equity',
      intendedFor: 'Enterprise partners',
      timeHorizon: '18–30 months',
      expectedMultiple: '10×–20×',
      useOfFunds: 'B2B contracts, integrations',
      benefits: ['Significant equity stake', 'Weekly updates', 'Board observer rights', 'Strategic partnership opportunities', 'Custom integration support']
    },
    {
      band: 'E',
      name: 'Lead Investor',
      minInvestment: '20,000 OMR',
      instrument: 'Strategic / Pre-Seed Lead',
      intendedFor: 'Lead investors',
      timeHorizon: '12–30 months',
      expectedMultiple: '12×–25×',
      useOfFunds: 'Market authority, enterprise scale',
      benefits: ['Major equity stake', 'Direct founder access', 'Board seat', 'Co-branding opportunities', 'First right of refusal on future rounds', 'Custom terms available']
    }
  ];

  // Milestones Data
  const milestones = [
    { date: 'Q1 2024', title: 'Platform Launch', description: 'Beta release to 100 early adopters', status: 'completed' },
    { date: 'Q2 2024', title: 'First Revenue', description: 'Achieved $50K ARR milestone', status: 'completed' },
    { date: 'Q3 2024', title: 'Enterprise Pilot', description: 'Secured 3 enterprise pilot programs', status: 'completed' },
    { date: 'Q4 2024', title: 'Series A Prep', description: 'Building investor pipeline', status: 'in-progress' },
    { date: 'Q1 2025', title: 'Market Expansion', description: 'Launch in 3 new markets', status: 'upcoming' }
  ];

  // Team Members Data
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      title: 'CEO & Co-Founder',
      bio: 'Former AI Research Lead at Google. PhD in Machine Learning from Stanford. 15+ years in AI/ML.'
    },
    {
      name: 'Michael Rodriguez',
      title: 'CTO & Co-Founder',
      bio: 'Ex-Engineering Director at Microsoft. Built scalable systems serving 100M+ users.'
    },
    {
      name: 'Emily Watson',
      title: 'Head of Product',
      bio: 'Former Product Lead at Notion. Expert in productivity tools and user experience.'
    },
    {
      name: 'David Kim',
      title: 'Head of Growth',
      bio: 'Scaled 3 SaaS startups from 0 to $10M ARR. Expert in B2B go-to-market strategy.'
    }
  ];

  // FAQs Data — categorised
  const faqCategories = [
    {
      label: 'Investment Structure',
      faqs: [
        {
          question: "What is the investor's role?",
          answer: "The investor's role is primarily as a capital partner enabling growth. Investors are not expected to operate the business, manage staff, or make day-to-day decisions. The company remains founder-led to preserve speed, clarity, and execution quality. Investors may contribute optional value through introductions, strategic advice, and feedback—especially around enterprise opportunities—but operational authority remains with management to avoid delays and conflicting decision-making."
        },
        {
          question: "ROI on investment and how much equity percentage of the company?",
          answer: "This round is structured as a Brainpower AI economic participation pool, not a broad company-wide equity offer. A maximum of 20% of Brainpower AI economic participation is allocated to investors in exchange for a total of OMR 75,000. Each investor's percentage is proportional to their share of the raise. Returns are driven by Brainpower AI's performance, profitability, licensing income, and/or an acquisition or buyout event. These projections are illustrative only; actual results may differ materially, and there can be no certainty of outcomes. This is a performance-based participation structure designed to align investor outcomes with Brainpower AI's growth specifically."
        },
        {
          question: "What is their involvement in the company?",
          answer: "Investors receive information and economic rights tied to Brainpower AI's performance, but they do not receive operational control. Their involvement is typically limited to quarterly updates, KPI visibility, and optional advisory discussions. Investors do not approve hires, marketing experiments, product changes, or spending line-by-line. This structure is intentional because early-stage execution requires rapid iteration, and the company must be able to act quickly based on product and customer feedback."
        },
        {
          question: "How long until investors get the ROI?",
          answer: "ROI timing depends on the route: profit distributions or liquidity events. For early-stage software, a realistic expectation is that meaningful liquidity typically takes 2–5 years, with a base target of 24–36 months to reach strong revenue milestones that enable either profit distributions or credible acquisition interest. If enterprise conversion is slower or churn is higher than expected, the timeline extends and ROI may not occur. The plan is to reach break-even within the available runway and then grow into enterprise licensing for accelerated profitability and valuation."
        },
        {
          question: "What would be the distribution of ROI and the method?",
          answer: "Distributions occur via (a) profit distributions and/or (b) exit proceeds. Profit distributions are based on net profit attributable to Brainpower AI, calculated after operational costs, AI infrastructure costs, marketing spend, staffing, taxes (if applicable), and agreed reserves for reinvestment. Exit proceeds are distributed proportionally if Brainpower AI is acquired, licensed, or bought out. The agreement will define the distribution schedule (for example, quarterly or annual) and the calculation basis to avoid ambiguity."
        },
        {
          question: "What is the exact legal structure of the investment?",
          answer: "The investment is made into the operating company under a written agreement that defines each investor's economic participation tied specifically to Brainpower AI. This avoids legal ambiguity because a product brand alone cannot typically hold equity unless it is a separate legal entity. The agreement defines the 'Brainpower AI participation pool,' the investor's share within that pool, and the events that trigger distributions (profits or exit events). It also defines investor reporting and transfer restrictions."
        },
        {
          question: "How is the 20% Brainpower AI allocation legally structured and documented?",
          answer: "The agreement defines a fixed 'Brainpower AI participation pool' capped at 20%. Each investor's share in this pool is recorded and cannot be diluted beyond defined rules without formal approvals. The agreement also defines what counts as Brainpower AI revenue and profit, and how distributions are calculated and scheduled. In simple terms, investors own a fixed percentage of a capped 20% pool that tracks Brainpower AI's distributable profit and exit value."
        },
        {
          question: "What governance rights do investors have?",
          answer: "Investors typically receive information rights and defined economic rights. Governance will remain streamlined so execution stays fast. If needed, a small set of 'reserved matters' can be defined (for example, issuing more than the capped pool, selling major assets, or changing distribution rules). Day-to-day approvals will remain with management, since heavy governance at this stage slows execution and harms growth."
        },
        {
          question: "What happens if the founder leaves or becomes unable to operate?",
          answer: "A continuity plan will be in place: documented processes, secured admin credentials, infrastructure access controls, and a clear method for appointing an interim operator. For added investor confidence, the agreement can require the company to designate a backup manager and keep key operations documented. This reduces 'key person' risk and supports long-term resilience."
        },
        {
          question: "Are there any existing liabilities, debts, or legal exposures?",
          answer: "As of the date of this memorandum, the company has no material financial liabilities, debts, or legal disputes beyond normal operating obligations; any changes will be disclosed to investors. The company will also disclose any future debts, obligations, pending disputes, or major contractual liabilities in the investment agreement, and describe them clearly with associated terms. Investor trust depends on full transparency in this area."
        },
        {
          question: "What happens if additional funding is required later?",
          answer: "If additional funding is needed, it will be milestone-triggered and transparent. Investors may be offered pro-rata rights to maintain their participation share. If investors choose not to participate, dilution of their relative share may occur depending on the structure. The agreement will define future-round principles clearly: when funding may be sought, what milestones trigger it, and how existing investors are treated."
        },
        {
          question: "What dilution should current investors expect in future rounds?",
          answer: "Future rounds may dilute earlier investors depending on size and structure. Offering pro-rata rights allows current investors to maintain their participation share if they choose. Our principle is to be transparent about potential dilution, tie new capital raises to clear milestones, and ensure that any dilution is offset by value creation at the Brainpower AI level."
        },
      ]
    },
    {
      label: 'Financials & Projections',
      faqs: [
        {
          question: "What traction do you currently have (paying users, revenue, active users, contracts)?",
          answer: "As of 28 Feb 2026, Brainpower AI is pre-launch with zero current revenue and users. There are 0 paying users and OMR 0 in MRR, with a prototype in internal testing and early feedback from 5 founder-network testers on workflow usability. The enterprise pipeline currently consists of informal discussions with 2 potential GCC partners for post-launch pilots. Full details are provided in the 'Current Traction' section of the Topline Investor Brief."
        },
        {
          question: "What are the exact financial projections for the next 12, 24, and 36 months?",
          answer: "Projections start from zero traction, assuming post-raise launch in Months 1–3. They are assumption-driven: subscriber growth of 15–35% month-on-month post-launch, ARPU of OMR 15–25, churn of 10–18%, and 1–4 new enterprise contracts per quarter from Month 6 onward with ACV of OMR 3,000–8,000. At 12 months (base case): MRR OMR 2,000, 2 enterprise contracts, total revenue OMR 24,000. At 24 months (base case): MRR OMR 10,000, 5 enterprise contracts, total revenue OMR 120,000. At 36 months (base case): MRR OMR 50,000, 15 enterprise contracts, total revenue OMR 600,000. These projections are illustrative; actual results may differ materially."
        },
        {
          question: "What is the total amount you are raising in this round?",
          answer: "The total raise is OMR 75,000. This is sized to provide enough runway to complete product maturation, run global marketing experiments, and convert early enterprise pilots—without over-raising before the growth engine is validated."
        },
        {
          question: "How much runway will this funding provide?",
          answer: "Runway depends on the monthly burn rate and how aggressively marketing is scaled. A disciplined burn model targets 12–18 months of runway with room for controlled marketing tests. The company will commit to milestone-based spending: marketing spend increases only when conversion, retention, and CAC meet predefined thresholds. This approach protects investor capital and improves the odds of reaching break-even before runway ends."
        },
        {
          question: "How exactly will the invested funds be allocated?",
          answer: "Funds are allocated across specific categories: development, marketing, infrastructure, operations, legal, and reserve. The goal is balanced execution—building a strong product while also creating global demand and enterprise traction. A category-based allocation summary is investor-friendly and avoids micromanagement. The allocation will be reviewed quarterly against progress and adjusted based on measurable performance."
        },
        {
          question: "Are there audited or independently reviewed financial statements?",
          answer: "At the early stage, the company will rely on management reporting. As enterprise revenue grows and crosses agreed thresholds, an external accountant review can be introduced annually. Investors will receive quarterly management statements plus an annual external review once it becomes cost-effective, which improves credibility without adding heavy overhead too early."
        },
        {
          question: "What is the current monthly burn rate?",
          answer: "At this pre-launch stage, monthly burn is kept lean and focused on product development and essential operations. As the round is deployed, burn will be reported transparently and broken down by category (development, infrastructure, marketing, operations). Burn will be managed through milestone-based spend rules, with increases in marketing and hiring only when performance metrics justify it. Investors will see burn evolution in the quarterly reports and KPI dashboard."
        },
        {
          question: "What is the projected monthly break-even point?",
          answer: "Break-even is defined as the point where recurring revenue covers both fixed operating costs and variable AI inference costs. In our base case, this occurs at an MRR level in the OMR 8,000–10,000 range, assuming target gross margins and a lean fixed-cost base. The timeline to break-even depends on acquisition speed and churn, and will be tracked and reported quarterly."
        },
        {
          question: "How will Brainpower AI revenue be separated from other company activities?",
          answer: "Brainpower AI will be tracked as a separate internal cost center with distinct revenue lines, AI/API costs, marketing spend, and staffing allocations. This enables investors to see Brainpower AI unit economics clearly, without confusion from other company operations. It also supports enterprise reporting and any potential future spin-out or acquisition of the Brainpower AI business."
        },
      ]
    },
    {
      label: 'Unit Economics',
      faqs: [
        {
          question: "What are the current customer acquisition costs (CAC)?",
          answer: "CAC will be measured per channel (organic, paid search, paid social, partnerships) once acquisition campaigns begin. Our plan focuses on authority marketing (content, LinkedIn, YouTube), referrals, and product-led growth loops to reduce CAC over time, with a target CAC payback period of under 9 months. CAC by channel and payback period will be tracked on the KPI dashboard."
        },
        {
          question: "What is the lifetime value (LTV) of a customer?",
          answer: "LTV is driven by ARPU and retention. For subscriptions, LTV improves with strong habit loops, reusable templates, and 'workflow embedding' that makes Brainpower AI part of the user's regular decision process. For enterprise customers, LTV improves through renewals and seat expansion across teams. LTV assumptions will be tied to actual retention cohorts and renewal behavior rather than optimistic guesses, and reported alongside CAC to monitor unit economics."
        },
        {
          question: "What is the churn rate?",
          answer: "Churn will be measured monthly and tracked by cohort once users are live on the platform. The product roadmap includes churn-reduction mechanisms such as better onboarding, more frequent 'aha' moments, decision vault usage, weekly review prompts, and enterprise features that lock in workflows. Investors will see churn data and cohort curves on the KPI dashboard, and we will treat churn as a core product metric—not just a finance metric."
        },
        {
          question: "What is your pricing strategy and why?",
          answer: "Pricing will be tiered to support both global acquisition and enterprise upsell. Individual and small-team subscription tiers drive user volume and habit formation, while enterprise licensing packages drive higher-value recurring revenue. Pricing will be tested and optimized through experiments and will be anchored to clear, measurable value: time saved, decision clarity, and improved workflow outcomes."
        },
        {
          question: "What proof do you have of product-market fit?",
          answer: "Product-market fit is ultimately demonstrated through retention, repeat usage, willingness to pay, referrals, and enterprise pilot conversions. In the early stages, proof will be partial: conversion from trials to paid plans, weekly and monthly active usage, and successful pilots with clear outcome metrics. Over time, enterprise renewals and expansion across teams will become the strongest indicators of product-market fit."
        },
      ]
    },
    {
      label: 'Technology & IP',
      faqs: [
        {
          question: "What is the product roadmap for the next 12 months?",
          answer: "The 12-month roadmap focuses on three themes: launch readiness, retention, and enterprise readiness. Key items include: app store launch polish (iOS/Android listings, demo video, ASO), expansion of decision frameworks and templates, improved onboarding and in-app guidance, team workspaces and shared decision vaults for enterprises, reporting dashboards, and multi-provider AI routing. Each roadmap item is tied to a specific objective: improving retention, improving acquisition, or unlocking enterprise revenue."
        },
        {
          question: "What technical risks exist in the current architecture?",
          answer: "Technical risks include scaling reliability, AI latency and cost, data security, and consistency across mobile and web platforms. Mitigation measures include load testing and monitoring, caching and usage governance to manage AI calls, secure coding practices, and an architecture designed for incremental scale-out rather than big-bang rewrites. As the platform grows, we will harden the stack further based on enterprise requirements and security reviews."
        },
        {
          question: "Is the AI proprietary or built on third-party APIs?",
          answer: "Brainpower AI uses third-party foundational model APIs for language intelligence, while our proprietary value lies in workflows, decision frameworks, user experience, orchestration logic, and enterprise packaging. This reduces R&D risk and accelerates time-to-market, while still allowing defensibility at the workflow and customer relationship layer rather than the model layer."
        },
        {
          question: "If third-party APIs are used, what is the dependency risk?",
          answer: "Dependency risks include pricing changes, rate limits, performance fluctuations, and policy changes from model providers. We mitigate these by using multi-provider routing, designing model-agnostic workflows, implementing fallback models, and applying usage controls to keep costs within defined thresholds. The goal is to avoid being 'single-vendor trapped' and to keep flexibility as the AI infrastructure landscape evolves."
        },
        {
          question: "Do you own all source code and IP assignments from developers?",
          answer: "All developers and contractors will sign IP assignment, confidentiality, and delivery clauses so that all work product is owned by the operating company. This prevents future disputes and is essential for enterprise adoption and acquisition readiness. We treat IP hygiene as non-negotiable and will maintain appropriate documentation to demonstrate clean ownership."
        },
        {
          question: "Who owns the intellectual property (IP) of Brainpower AI?",
          answer: "All IP will be owned by the operating company. This includes source code, branding, design assets, decision frameworks, and proprietary workflow logic. All contractors and developers will sign IP assignment and confidentiality agreements to prevent future disputes. Clean IP ownership is essential for enterprise trust and any future acquisition."
        },
        {
          question: "What is the cybersecurity posture of the platform?",
          answer: "Security measures include secure authentication, encrypted storage where applicable, access control and least-privilege policies, and regular monitoring of the infrastructure. As enterprise deals grow, we will increase security hardening with admin logging, policy controls, and contract-driven compliance requirements. Security posture will evolve alongside customer needs and will be reflected in technical documentation for enterprise buyers."
        },
        {
          question: "Are there regulatory risks related to AI compliance or data protection laws?",
          answer: "Yes, especially when operating across multiple regions with different privacy and AI regulations. We will mitigate these risks by minimizing sensitive data storage, using clear and transparent user consent terms, implementing safe data-handling policies, and adjusting compliance posture (for example, data residency and retention controls) for enterprise customers as needed. Regulatory changes will be monitored and incorporated into product and contract updates over time."
        },
      ]
    },
    {
      label: 'Competitive Landscape',
      faqs: [
        {
          question: "What is the competitive landscape (ChatGPT, Copilot, Gemini, Claude) and why will Brainpower AI win?",
          answer: "ChatGPT, Copilot, Gemini, and Claude are horizontal AI platforms designed for broad tasks. They provide general capability but are not purpose-built decision systems. Brainpower AI is positioned as a vertical Decision Intelligence application layer that embeds structured frameworks, guided workflows, and repeatable decision outputs. We do not compete at the model layer; we leverage foundational models as infrastructure and compete at the workflow and outcome layer. This mirrors how vertical SaaS wins alongside platform giants by becoming embedded in specialized workflows where users pay for structure, repeatability, and results."
        },
        {
          question: "What geographic markets are you targeting first?",
          answer: "The first targets are high-income, English-speaking professional markets and regions with strong AI adoption. Initial focus will be on the GCC, US/UK, and selected hubs such as Singapore and Australia, followed by broader expansion through app distribution and partnerships as retention and unit economics support it."
        },
        {
          question: "What milestones will trigger the next funding round?",
          answer: "Milestones for a potential next round include reaching target MRR levels, stabilizing churn, achieving predictable CAC and payback periods, and converting a defined number of enterprise pilots into annual contracts. Funding will be tied to hitting these measurable outcomes rather than to arbitrary dates, so that valuation and terms are grounded in demonstrated performance."
        },
        {
          question: "At what valuation do you expect the next round to occur?",
          answer: "Rather than fixing a valuation too early, the next round's valuation will be tied to measurable metrics such as ARR, growth rate, retention, and enterprise contract count. We aim to reach a level of traction where standard early-stage SaaS multiples (for example, 5–10× ARR depending on quality of revenue) can be justified by data, not just narrative."
        },
      ]
    },
    {
      label: 'Risk & Downside',
      faqs: [
        {
          question: "What are the biggest risks right now, and how are you mitigating them?",
          answer: "Key risks include customer acquisition cost inflation, churn, enterprise sales cycle length, and AI infrastructure cost volatility. Mitigation plans include authority-led acquisition to reduce CAC, onboarding and habit-building loops to reduce churn, a pilot-to-contract enterprise approach to manage sales cycle risk, and multi-provider routing plus usage governance to manage AI cost volatility. We explicitly track these risks and communicate them to investors along with mitigation progress."
        },
        {
          question: "What is the realistic downside scenario?",
          answer: "In the downside scenario, the product fails to achieve scalable acquisition or retention, enterprise deals take longer than expected, and revenue does not cover costs. In that case, the company may reduce burn, pivot focus toward higher-value B2B licensing, or ultimately wind down. Investors must understand that capital can be lost in early-stage investments; this is a normal risk profile and is stated clearly and professionally in the agreements."
        },
        {
          question: "What is the worst-case scenario, and what does downside protection look like?",
          answer: "In the worst-case scenario, the product does not scale, enterprise adoption is slower than expected, and investor capital may be lost. Downside protection comes from disciplined burn management, the ability to pivot toward higher-value enterprise licensing, and transparent reporting so investors can see risks early. Optional buyback mechanisms could be considered later only if the business generates sufficient cash flow; no buybacks will be promised that cannot be realistically financed."
        },
        {
          question: "What is the exit strategy?",
          answer: "There are multiple exit paths: (1) acquisition by a productivity SaaS company, AI workflow company, or enterprise software vendor; (2) licensing buyout of Brainpower AI's workflows and platform; (3) a growth round with partial liquidity for early investors; or (4) long-term profitability with ongoing distributions. The strategy focuses on achieving enterprise contracts and strong retention, as these drive acquisition interest and valuation multiples."
        },
      ]
    },
    {
      label: 'Founder & Commitment',
      faqs: [
        {
          question: "What is your personal financial commitment to Brainpower AI?",
          answer: "The founder has significant 'skin in the game.' To date, I have committed over 18 months of focused work to Brainpower AI and invested approximately OMR 10,000 of personal capital into product development, infrastructure, and initial market validation activities. Going forward, I am fully dedicated to Brainpower AI as my primary focus, and my personal reputation and future upside are directly tied to the platform's long-term success."
        },
        {
          question: "Why invest now versus waiting 6–12 months?",
          answer: "Investing now secures early participation in the capped 20% pool before scaling milestones increase pricing and terms. This round funds the next execution phase: global app distribution, retention improvements, and conversion of enterprise pilots. Waiting may reduce risk but also reduces upside and access, as later rounds are likely to be raised at higher valuations if targets are met."
        },
        {
          question: "Why are you confident you are the right founder to execute this at scale?",
          answer: "The strategy is clear and realistic: we are not trying to 'beat ChatGPT' at the model layer. We are building a vertical Decision Intelligence system that leverages foundational models, focuses on workflow embedding, and scales via global app distribution plus enterprise licensing. The plan is milestone-driven and measured (CAC, churn, retention, enterprise conversion), which is how scalable companies are built, and the founding team's background aligns with executing this plan."
        },
      ]
    },
  ];
  // Flatten for search — keep globalIndex for numbering
  const faqs = faqCategories.flatMap((cat) => cat.faqs);

  const filteredFaqs = useMemo(() => {
    const query = faqSearch.trim().toLowerCase();
    const allFaqs = faqs.map((faq, i) => ({ ...faq, originalIndex: i }));
    const byCategory = activeCategory === 'All'
      ? allFaqs
      : allFaqs.filter((_, i) => {
          let count = 0;
          for (const cat of faqCategories) {
            for (let j = 0; j < cat.faqs.length; j++) {
              if (count === i) return cat.label === activeCategory;
              count++;
            }
          }
          return false;
        });
    if (!query) return byCategory;
    return byCategory.filter(f => f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query));
  }, [faqSearch, activeCategory]);

  // Investor Benefits Data
  const investorBenefits = [
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: 'Equity Stake',
      description: 'Own a piece of the future of AI-powered productivity'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Early Access',
      description: 'Get exclusive early access to new features and products'
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Quarterly Updates',
      description: 'Detailed financial and operational updates every quarter'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Networking',
      description: 'Join our exclusive investor community and events'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Advisory Role',
      description: 'Provide strategic input and shape product direction'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Priority Support',
      description: 'Dedicated support and white-glove service'
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
    for (let i = 0; i < 80; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, radius: Math.random() * 2 + 1 });
    }
    let animId: number;
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      animId = requestAnimationFrame(animate);
    }
    animate();
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0b1e] text-white">
      {/* Block 1: Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-10">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ opacity: 0.5 }} />
        
        <motion.div
          className="relative z-10 max-w-5xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-6 text-lg px-6 py-2 bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30">
              <Rocket className="h-4 w-4 mr-2" />
              Pre-Seed Investment Opportunity
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] to-[#b24bf3]"
            variants={fadeInUp}
          >
            Invest in the Future of AI-Powered Intelligence
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Join us in building the world's first cognitive intelligence platform that empowers professionals, investors, and leaders to think at a higher level
          </motion.p>

          {/* Hero Image */}
          <motion.div variants={fadeInUp} className="mb-10 rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-3xl" style={{ boxShadow: '0 0 60px rgba(0, 212, 255, 0.2), 0 0 120px rgba(178, 75, 243, 0.1)' }}>
            <img src={ROBOT_FEMALE_URL} alt="BrainPower AI" className="w-full h-auto object-cover" />
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <Button size="lg" className="text-lg px-8 py-6 text-black font-semibold" style={{ background: 'linear-gradient(135deg, #00d4ff, #0099cc)' }} asChild>
              <Link href="#investment-tiers">
                View Investment Opportunities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-[#b24bf3] text-[#b24bf3] hover:bg-[#b24bf3]/10" asChild>
              <Link href="/register">
                <Briefcase className="mr-2 h-5 w-5" />
                Create Investor Account
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-8 w-8 text-[#00d4ff]" />
        </motion.div>
      </section>

      {/* ── Platform Overview: The Operating System for Decisions and Futures ── */}
      <section className="py-24 px-6 bg-[#07081a] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* ── Category headline ── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.p variants={fadeInUp} className="text-[#00d4ff] text-sm font-semibold tracking-[0.25em] uppercase mb-4">
              Platform Overview
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00d4ff] via-white to-[#b24bf3] bg-clip-text text-transparent"
            >
              The Operating System for<br />Decisions and Futures
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              BrainPower AI is a next-generation cognitive intelligence platform designed to fundamentally transform how individuals, teams, and organizations make decisions.
            </motion.p>
          </motion.div>

          {/* ── What it is NOT strip ── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                "It is not a chatbot.",
                "It is not a productivity tool.",
                "It is not another AI assistant.",
              ].map((text) => (
                <motion.div key={text} variants={fadeInUp}
                  className="flex items-center gap-3 bg-red-500/5 border border-red-500/20 rounded-xl px-5 py-4"
                >
                  <X className="w-5 h-5 text-red-400 shrink-0" />
                  <span className="text-gray-300 font-medium">{text}</span>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeInUp}
              className="bg-gradient-to-r from-[#00d4ff]/10 to-[#b24bf3]/10 border border-[#00d4ff]/20 rounded-2xl px-8 py-6 text-center"
            >
              <p className="text-white text-xl font-semibold">
                BrainPower AI is a{" "}
                <span className="bg-gradient-to-r from-[#00d4ff] to-[#b24bf3] bg-clip-text text-transparent">
                  structured intelligence system
                </span>
                {" "}built to think, simulate, and guide decisions with measurable outcomes.
              </p>
            </motion.div>
          </motion.div>

          {/* ── Core Concept ── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="mb-20"
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <span className="inline-flex items-center gap-2 text-[#00d4ff] text-sm font-semibold tracking-widest uppercase">
                <Rocket className="w-4 h-4" /> Core Concept
              </span>
              <h3 className="text-3xl font-bold text-white mt-3">A New Category: Decision + Futures Intelligence</h3>
            </motion.div>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { label: "Decisions analyzed", desc: "with structure and depth" },
                { label: "Strategies compared", desc: "objectively, side by side" },
                { label: "Outcomes simulated", desc: "before execution" },
                { label: "Risks quantified", desc: "and opportunities surfaced" },
                { label: "Intelligence compounds", desc: "over time" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/5 transition-all"
                >
                  <div className="text-3xl font-bold text-[#00d4ff] mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.p variants={fadeInUp} className="text-center text-gray-400 mt-6 text-lg">
              This transforms AI from a reactive tool into a{" "}
              <span className="text-[#b24bf3] font-semibold">proactive decision partner</span>.
            </motion.p>
          </motion.div>

          {/* ── Platform Architecture Overview ── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="mb-20"
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <span className="inline-flex items-center gap-2 text-[#00d4ff] text-sm font-semibold tracking-widest uppercase">
                <Layers className="w-4 h-4" /> Platform Architecture Overview
              </span>
              <h3 className="text-3xl font-bold text-white mt-3">A Multi-Layer Cognitive System</h3>
              <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
                BrainPower AI is built as a multi-layer cognitive system, combining seven integrated capabilities that work together to deliver clarity, foresight, and confidence in decision-making.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { label: "Structured Reasoning" },
                { label: "Persistent Strategic Memory" },
                { label: "Scenario Simulation" },
                { label: "Decision Tracking" },
                { label: "Intelligence Graphing" },
                { label: "Collaborative Intelligence" },
                { label: "Enterprise-Grade Analysis" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp}
                  className="flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/5 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#b24bf3] flex items-center justify-center text-black font-bold text-xs mb-2">
                    {i + 1}
                  </div>
                  <p className="text-gray-300 text-xs font-medium leading-tight">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── 8 Core Systems ── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="mb-20"
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <span className="inline-flex items-center gap-2 text-[#00d4ff] text-sm font-semibold tracking-widest uppercase">
                <Layers className="w-4 h-4" /> Core Systems
              </span>
              <h3 className="text-3xl font-bold text-white mt-3">8 Integrated Intelligence Engines</h3>
              <p className="text-gray-400 mt-2">Multi-layer cognitive architecture delivering clarity, foresight, and confidence.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: Brain,
                  color: "#00d4ff",
                  bg: "rgba(0,212,255,0.08)",
                  name: "Strategic Command",
                  subtitle: "Decision Engine",
                  desc: "Break down complex decisions, compare strategies, evaluate trade-offs, and receive structured recommendations with bias detection and probabilistic reasoning.",
                },
                {
                  icon: Eye,
                  color: "#b24bf3",
                  bg: "rgba(178,75,243,0.08)",
                  name: "Futures",
                  subtitle: "Outcome Intelligence",
                  desc: "Simulate multiple strategic paths, explore alternative futures, and compare outcomes before acting. Transforms uncertainty into visible, comparable possibilities.",
                },
                {
                  icon: Globe,
                  color: "#00d4ff",
                  bg: "rgba(0,212,255,0.08)",
                  name: "Futurescape",
                  subtitle: "Visual Simulation",
                  desc: "Strategies become pathways. Risks appear as zones. Opportunities as nodes. Timelines unfold spatially. Abstract strategy becomes tangible and navigable.",
                },
                {
                  icon: Clock,
                  color: "#b24bf3",
                  bg: "rgba(178,75,243,0.08)",
                  name: "Strategic Memory",
                  subtitle: "Long-Term Intelligence",
                  desc: "Stores goals, risk tolerance, long-term plans, and decision history. Every response aligns with where the user wants to go — creating continuity of intelligence.",
                },
                {
                  icon: Network,
                  color: "#00d4ff",
                  bg: "rgba(0,212,255,0.08)",
                  name: "Decision Intelligence Graph",
                  subtitle: "DIG — Cognitive Backbone",
                  desc: "Maps decisions, strategies, simulations, and outcomes. Builds a living intelligence graph showing how decisions connect and what patterns drive success or failure.",
                },
                {
                  icon: TrendingUp,
                  color: "#b24bf3",
                  bg: "rgba(178,75,243,0.08)",
                  name: "Judgment Improvement Engine",
                  subtitle: "JIE — Learning System",
                  desc: "Tracks predictions vs. actual outcomes. Evaluates accuracy, bias patterns, and calibration quality. The more you use it, the better your judgment becomes.",
                },
                {
                  icon: Users,
                  color: "#00d4ff",
                  bg: "rgba(0,212,255,0.08)",
                  name: "Collective Intelligence Engine",
                  subtitle: "CIE — Global Signals",
                  desc: "Leverages anonymized decision patterns and behavioral trends to benchmark decisions, detect failure patterns, and highlight emerging opportunities.",
                },
                {
                  icon: Building2,
                  color: "#b24bf3",
                  bg: "rgba(178,75,243,0.08)",
                  name: "Strategic Advisory Engine",
                  subtitle: "SAE — Enterprise Depth",
                  desc: "Delivers SWOT, Porter's Five Forces, PESTLE, competitive positioning, scenario planning, and implementation roadmaps — comparable to top consulting firms.",
                },
              ].map((sys) => (
                <motion.div key={sys.name} variants={fadeInUp}
                  className="group rounded-2xl border border-white/10 p-6 hover:border-white/25 transition-all duration-300"
                  style={{ background: sys.bg }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg" style={{ background: `${sys.color}20` }}>
                      <sys.icon className="w-5 h-5" style={{ color: sys.color }} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm leading-tight">{sys.name}</p>
                      <p className="text-xs" style={{ color: sys.color }}>{sys.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{sys.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Continuous Intelligence Loop ── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="mb-20"
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <span className="inline-flex items-center gap-2 text-[#00d4ff] text-sm font-semibold tracking-widest uppercase">
                <RefreshCw className="w-4 h-4" /> Continuous Intelligence Loop
              </span>
              <h3 className="text-3xl font-bold text-white mt-3">Compounding Intelligence Over Time</h3>
            </motion.div>
            <div className="relative">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { step: "1", label: "Decision Made", system: "Strategic Command", color: "#00d4ff" },
                  { step: "2", label: "Futures Explored", system: "Futures", color: "#b24bf3" },
                  { step: "3", label: "Outcomes Visualized", system: "Futurescape", color: "#00d4ff" },
                  { step: "4", label: "Results Tracked", system: "JIE", color: "#b24bf3" },
                  { step: "5", label: "Patterns Learned", system: "DIG + CIE", color: "#00d4ff" },
                  { step: "6", label: "Future Decisions Improve", system: "Automatically", color: "#b24bf3" },
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp}
                    className="relative flex flex-col items-center text-center p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm mb-3"
                      style={{ background: `linear-gradient(135deg, ${item.color}, ${i % 2 === 0 ? '#b24bf3' : '#00d4ff'})` }}
                    >
                      {item.step}
                    </div>
                    <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                    <p className="text-xs" style={{ color: item.color }}>{item.system}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Key Differentiators ── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="mb-20"
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <span className="inline-flex items-center gap-2 text-[#00d4ff] text-sm font-semibold tracking-widest uppercase">
                <GitBranch className="w-4 h-4" /> Key Differentiators
              </span>
              <h3 className="text-3xl font-bold text-white mt-3">Fundamentally Different from General AI</h3>
            </motion.div>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-6 py-4 text-gray-400 font-semibold">Capability</th>
                    <th className="px-6 py-4 text-gray-400 font-semibold text-center">General AI Tools</th>
                    <th className="px-6 py-4 font-semibold text-center" style={{ color: '#00d4ff' }}>BrainPower AI</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Structured Reasoning", "Free-form answers", "Structured decision frameworks"],
                    ["Outcome Simulation", "Not available", "Explore futures before acting"],
                    ["Persistent Memory", "Session-only", "Continuity across all decisions"],
                    ["Visual Intelligence", "Text output only", "Spatial, interactive strategy maps"],
                    ["Learning System", "Static", "Improves your judgment over time"],
                    ["Intelligence Graph", "Isolated responses", "Connected decision network"],
                    ["Enterprise Depth", "Generic answers", "SWOT, PESTLE, scenario planning"],
                  ].map(([cap, general, bp], i) => (
                    <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''} hover:bg-white/5 transition-colors`}>
                      <td className="px-6 py-4 text-white font-medium">{cap}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 text-red-400">
                          <X className="w-3.5 h-3.5" />{general}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 text-green-400">
                          <CheckCircle className="w-3.5 h-3.5" />{bp}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* ── Use Cases ── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="mb-20"
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <span className="inline-flex items-center gap-2 text-[#00d4ff] text-sm font-semibold tracking-widest uppercase">
                <Target className="w-4 h-4" /> Use Cases
              </span>
              <h3 className="text-3xl font-bold text-white mt-3">Applicable Across Every Decision Context</h3>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: Users,
                  color: "#00d4ff",
                  audience: "Individuals",
                  cases: ["Career decisions", "Financial planning", "Personal strategy"],
                },
                {
                  icon: Rocket,
                  color: "#b24bf3",
                  audience: "Entrepreneurs",
                  cases: ["Startup strategy", "Product decisions", "Market entry"],
                },
                {
                  icon: Briefcase,
                  color: "#00d4ff",
                  audience: "Businesses",
                  cases: ["Growth strategy", "Operations", "Investment decisions"],
                },
                {
                  icon: Building2,
                  color: "#b24bf3",
                  audience: "Enterprises & Governments",
                  cases: ["Policy planning", "Large-scale strategy", "Risk modeling"],
                },
              ].map((uc) => (
                <motion.div key={uc.audience} variants={fadeInUp}
                  className="rounded-2xl border border-white/10 p-6 hover:border-white/25 transition-all bg-white/[0.03]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl" style={{ background: `${uc.color}15` }}>
                      <uc.icon className="w-5 h-5" style={{ color: uc.color }} />
                    </div>
                    <p className="text-white font-bold">{uc.audience}</p>
                  </div>
                  <ul className="space-y-2">
                    {uc.cases.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-gray-400 text-sm">
                        <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: uc.color }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Platform Availability ── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="mb-20"
          >
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <span className="inline-flex items-center gap-2 text-[#00d4ff] text-sm font-semibold tracking-widest uppercase">
                <Smartphone className="w-4 h-4" /> Platform Availability
              </span>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "iOS", desc: "Mobile-first", available: true },
                { label: "Android", desc: "Mobile", available: true },
                { label: "WebApp", desc: "Deep analysis", available: true },
                { label: "XR / VR", desc: "Simulation", available: false },
                { label: "Enterprise", desc: "Deployment", available: false },
                { label: "Team Collab", desc: "Systems", available: false },
              ].map((p) => (
                <motion.div key={p.label} variants={fadeInUp}
                  className={`rounded-xl border p-4 text-center ${
                    p.available
                      ? 'border-[#00d4ff]/30 bg-[#00d4ff]/5'
                      : 'border-white/10 bg-white/[0.02] opacity-60'
                  }`}
                >
                  <p className="text-white font-bold text-sm">{p.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
                  <Badge className={`mt-2 text-xs ${
                    p.available
                      ? 'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30'
                      : 'bg-white/5 text-gray-500 border-white/10'
                  }`}>
                    {p.available ? 'Available' : 'Coming Soon'}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Final Positioning ── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}
              className="relative rounded-3xl overflow-hidden border border-[#00d4ff]/20 p-10 md:p-16 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.07) 0%, rgba(178,75,243,0.07) 100%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-[#b24bf3]/5" />
              <div className="relative z-10">
                <p className="text-[#00d4ff] text-sm font-semibold tracking-widest uppercase mb-4">Final Positioning</p>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  BrainPower AI is not competing<br />with traditional AI tools.
                </h3>
                <p className="text-xl text-gray-300 mb-4">It defines a new category:</p>
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#b24bf3] bg-clip-text text-transparent mb-10">
                  The Operating System for Decisions and Futures
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  {[
                    { label: "Thinking becomes", value: "Structured" },
                    { label: "Decisions become", value: "Measurable" },
                    { label: "Futures become", value: "Visible" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/5 rounded-xl p-5 border border-white/10">
                      <p className="text-gray-400 text-sm mb-1">{item.label}</p>
                      <p className="text-white text-xl font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  BrainPower AI transforms how humans interact with uncertainty. Instead of reacting to the future, users can now{" "}
                  <span className="text-white font-semibold">see it, explore it, and choose it — before it happens.</span>
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Block 2: The Opportunity */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00d4ff] to-[#b24bf3] bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Why BrainPower AI?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              We're not just building another productivity tool. We're creating the world's first cognitive intelligence platform.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2">Massive Market Opportunity</CardTitle>
                      <CardDescription className="text-base">
                        The global AI productivity market is projected to reach $500B by 2028, growing at 35% CAGR. We're positioned to capture a significant share of this explosive growth.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <Zap className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2">Unique Technology Advantage</CardTitle>
                      <CardDescription className="text-base">
                        Our proprietary AI engine combines multiple models with advanced context awareness, delivering 10x better results than competitors. Patent-pending technology with 2-3 year lead.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2">Proven Traction</CardTitle>
                      <CardDescription className="text-base">
                        10,000+ active users, $50K ARR in first 6 months, 3 enterprise pilots with Fortune 500 companies. 40% month-over-month growth with 95% user retention.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Award className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2">World-Class Team</CardTitle>
                      <CardDescription className="text-base">
                        Founded by ex-Google AI researcher and ex-Microsoft engineering director. Team of 15 with experience from Google, Microsoft, Notion, and top AI labs.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Block 3: Investment Tiers */}
      <section id="investment-tiers" className="py-24 px-6 bg-[#0a0b1e] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00d4ff] to-[#b24bf3] bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Choose Your Investment Level
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Flexible investment options designed for different investor profiles and goals
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {investmentTiers.map((tier) => (
              <motion.div
                key={tier.band}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className={`h-full bg-[#0d0e24] border-white/10 text-white ${tier.isPopular ? 'ring-2 ring-[#00d4ff] shadow-2xl shadow-[#00d4ff]/20' : ''}`}>
                  <CardHeader>
                    {tier.isPopular && (
                      <Badge className="w-fit mb-4">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    )}
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold">Band {tier.band}</span>
                      <span className="text-lg text-muted-foreground">{tier.name}</span>
                    </div>
                    <div className="text-3xl font-bold text-[#00d4ff] mb-4">
                      {tier.minInvestment}
                    </div>
                    <CardDescription className="text-base">
                      {tier.intendedFor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold mb-1">Instrument</p>
                      <p className="text-sm text-muted-foreground">{tier.instrument}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">Timeline</p>
                      <p className="text-sm text-muted-foreground">{tier.timeHorizon}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">Expected Multiple</p>
                      <p className="text-sm text-[#00d4ff] font-bold">{tier.expectedMultiple}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-semibold mb-2">Benefits</p>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full mt-4" asChild>
                      <Link href="/register">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Neon Female AI Section */}
      <section className="py-20 px-6 bg-[#0d0e24] border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#00d4ff] to-[#b24bf3] bg-clip-text text-transparent">
              Powered by Cognitive Science
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              BrainPower AI integrates the latest research in cognitive science, neuroscience, and behavioral economics to create an intelligence platform unlike anything else on the market.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our proprietary algorithms map cognitive patterns, identify decision biases in real-time, and guide users toward clearer, more powerful thinking — at scale.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center"
          >
            <img
              src={NEON_FEMALE_URL}
              alt="BrainPower AI Neural Intelligence"
              className="w-full max-w-xs drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 30px rgba(178, 75, 243, 0.5))' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Block 4: Use of Funds */}
      <section className="py-24 px-6 bg-[#0a0b1e] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00d4ff] to-[#b24bf3] bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              How We'll Use Your Investment
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Strategic allocation focused on rapid growth and market leadership
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {[
              { name: 'Product Development', value: 40, description: 'Building core AI engine, new features, and platform infrastructure. Hiring senior engineers and AI researchers.' },
              { name: 'Marketing & Sales', value: 30, description: 'Customer acquisition, brand building, content marketing, and enterprise sales team expansion.' },
              { name: 'Team Expansion', value: 20, description: 'Recruiting world-class talent across engineering, product, design, and business development.' },
              { name: 'Operations', value: 10, description: 'Infrastructure, legal, finance, and administrative overhead to support rapid growth.' }
            ].map((item) => (
              <motion.div key={item.name} variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <Badge variant="outline" className="text-lg">
                        {item.value}%
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Block 5: Traction & Milestones */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeInUp}
            >
              Our Progress So Far
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Consistent execution and rapid growth across all key metrics
            </motion.p>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { label: 'Active Users', value: '10,000+', icon: <Users className="h-8 w-8" /> },
              { label: 'ARR', value: '$50K', icon: <DollarSign className="h-8 w-8" /> },
              { label: 'MoM Growth', value: '40%', icon: <TrendingUp className="h-8 w-8" /> },
              { label: 'Retention', value: '95%', icon: <Award className="h-8 w-8" /> }
            ].map((metric) => (
              <motion.div key={metric.label} variants={fadeInUp}>
                <Card className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4 text-primary">
                      {metric.icon}
                    </div>
                    <CardTitle className="text-4xl font-bold mb-2">
                      {metric.value}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {metric.label}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center md:text-inherit`}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                          {milestone.status === 'completed' && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          {milestone.status === 'in-progress' && (
                            <Clock className="h-5 w-5 text-blue-600" />
                          )}
                          {milestone.status === 'upcoming' && (
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          )}
                          <Badge variant="outline">{milestone.date}</Badge>
                        </div>
                        <CardTitle className="text-xl">{milestone.title}</CardTitle>
                        <CardDescription className="text-base">
                          {milestone.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                  
                  <div className="relative z-10 hidden md:block">
                    <div className={`w-4 h-4 rounded-full ${
                      milestone.status === 'completed' ? 'bg-green-600' :
                      milestone.status === 'in-progress' ? 'bg-blue-600' :
                      'bg-muted-foreground'
                    }`} />
                  </div>
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>      {/* Block 2: Why Invest */}
      <section className="py-24 px-6 bg-[#0d0e24] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeInUp}
            >
              Meet the Team
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              World-class founders and team with proven track records at top tech companies
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div key={member.name} variants={fadeInUp}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg mb-4 flex items-center justify-center">
                      <Users className="h-24 w-24 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-sm font-semibold text-primary mb-3">
                      {member.title}
                    </CardDescription>
                    <CardDescription className="text-sm">
                      {member.bio}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Block 7: Market Analysis */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeInUp}
            >
              The Market Landscape
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Positioned at the intersection of massive market trends
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Total Addressable Market</CardTitle>
                  </div>
                  <div className="text-4xl font-bold text-primary mb-4">
                    $500B
                  </div>
                  <CardDescription className="text-base">
                    Global AI productivity market by 2028. We're targeting the enterprise segment ($200B) with expansion into SMB and consumer markets.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-2xl">Competitive Advantages</CardTitle>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Patent-pending multi-model AI architecture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">10x better context awareness than competitors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Enterprise-grade security and compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Seamless integration with existing tools</span>
                    </li>
                  </ul>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl">Market Trends</CardTitle>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">AI adoption accelerating across all industries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Remote work driving demand for productivity tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Enterprise spending on AI increasing 40% YoY</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Shift from point solutions to integrated platforms</span>
                    </li>
                  </ul>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Block 8: Investor Benefits */}
      <section className="py-24 px-6 bg-[#0d0e24] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00d4ff] to-[#b24bf3] bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              What You Get as an Investor
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              More than just equity – become part of the journey
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {investorBenefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full text-center bg-[#0a0b1e] border-white/10 text-white">
                  <CardHeader>
                    <div className="flex justify-center mb-4 text-primary">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl mb-3">{benefit.title}</CardTitle>
                    <CardDescription className="text-base">
                      {benefit.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Block 9: FAQs */}
      <section className="py-24 px-6 bg-[#0a0b1e] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00d4ff] to-[#b24bf3] bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400"
              variants={fadeInUp}
            >
              Everything you need to know about investing in BrainPower AI
            </motion.p>
          </motion.div>

          {/* Search bar + Download button row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <Input
                type="text"
                placeholder="Search questions…"
                value={faqSearch}
                onChange={(e) => { setFaqSearch(e.target.value); setActiveCategory('All'); }}
                className="pl-10 bg-[#0d0e24] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#00d4ff]/50 h-11"
              />
            </div>
            <a
              href={INVESTOR_BRIEF_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              download="BrainPower_AI_Investor_Brief.pdf"
            >
              <Button
                variant="outline"
                className="h-11 gap-2 border-[#00d4ff]/40 text-[#00d4ff] hover:bg-[#00d4ff]/10 whitespace-nowrap w-full sm:w-auto"
              >
                <Download className="h-4 w-4" />
                Download Full Investor Brief
              </Button>
            </a>
          </motion.div>

          {/* Category filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {['All', ...faqCategories.map(c => c.label)].map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setFaqSearch(''); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  activeCategory === cat
                    ? 'bg-[#00d4ff] border-[#00d4ff] text-[#0a0b1e]'
                    : 'border-white/20 text-gray-400 hover:border-[#00d4ff]/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border border-white/10 rounded-lg px-6 bg-[#0d0e24]">
                      <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                        <span className="flex gap-3 items-start">
                          <span className="text-[#00d4ff] font-bold shrink-0 mt-0.5">{faq.originalIndex + 1}.</span>
                          <span>{faq.question}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground pt-4 pb-2">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-16 text-gray-500">
                  <svg className="mx-auto mb-4 h-10 w-10 opacity-40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                  <p className="text-lg">No questions match <span className="text-white/60">"{faqSearch}"</span></p>
                  <button onClick={() => { setFaqSearch(''); setActiveCategory('All'); }} className="mt-3 text-sm text-[#00d4ff] hover:underline">Clear filters</button>
                </div>
              )}
          </motion.div>
        </div>
      </section>

      {/* Schedule a Call CTA */}
      <section className="py-24 px-6 bg-[#0d0e24] border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5 text-[#00d4ff] text-sm font-medium mb-6">
              <Calendar className="h-4 w-4" />
              Book a 30-Minute Investor Call
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00d4ff] to-[#b24bf3] bg-clip-text text-transparent">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
              Schedule a direct call with the founder. We'll walk you through the financials, product roadmap, and investment terms — no pressure, full transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book"
                onClick={() => handleTrackEvent('schedule_call_click')}
              >
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-[#00d4ff] to-[#b24bf3] text-white hover:opacity-90 px-8 h-14 text-lg font-semibold"
                >
                  <Calendar className="h-5 w-5" />
                  Schedule a Call
                </Button>
              </a>
              <a
                href={INVESTOR_BRIEF_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                download="BrainPower_AI_Investor_Brief.pdf"
                onClick={() => handleTrackEvent('download_brief_click')}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-white/20 text-white hover:bg-white/5 px-8 h-14 text-lg"
                >
                  <Download className="h-5 w-5" />
                  Download Investor Brief
                </Button>
              </a>
            </div>
            <p className="mt-8 text-sm text-gray-500">
              Prefer email? Reach us at{' '}
              <a href="mailto:invest@brainpowerai.com" className="text-[#00d4ff] hover:underline">invest@brainpowerai.com</a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Us Form */}
      <section className="py-24 px-6 bg-[#0a0b1e] border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#b24bf3]/30 bg-[#b24bf3]/5 text-[#b24bf3] text-sm font-medium mb-6">
                <Mail className="h-4 w-4" />
                Send Us a Message
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00d4ff] to-[#b24bf3] bg-clip-text text-transparent">
                Get in Touch
              </h2>
              <p className="text-gray-400 text-lg">
                Prefer to write? Fill out the form below and we'll respond within 24 hours.
              </p>
            </div>

            {contactSubmitted ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 mb-6">
                  <CheckCircle className="h-8 w-8 text-[#00d4ff]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-gray-400 mb-6">Thank you for reaching out. We'll be in touch within 24 hours.</p>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5"
                  onClick={() => { setContactSubmitted(false); setContactForm({ name: '', email: '', company: '', investmentRange: '', message: '' }); }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitContact.mutate(contactForm);
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name *</label>
                    <Input
                      required
                      placeholder="John Smith"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(f => ({ ...f, name: e.target.value }))}
                      className="bg-[#0d0e24] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#00d4ff]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address *</label>
                    <Input
                      required
                      type="email"
                      placeholder="john@company.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))}
                      className="bg-[#0d0e24] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#00d4ff]/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Company / Organisation</label>
                    <Input
                      placeholder="Acme Capital"
                      value={contactForm.company}
                      onChange={(e) => setContactForm(f => ({ ...f, company: e.target.value }))}
                      className="bg-[#0d0e24] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#00d4ff]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Investment Range (OMR)</label>
                    <Input
                      placeholder="e.g. OMR 5,000 – 10,000"
                      value={contactForm.investmentRange}
                      onChange={(e) => setContactForm(f => ({ ...f, investmentRange: e.target.value }))}
                      className="bg-[#0d0e24] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#00d4ff]/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Message *</label>
                  <Textarea
                    required
                    rows={5}
                    placeholder="Tell us about your investment interest, questions, or how you'd like to get involved…"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))}
                    className="bg-[#0d0e24] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#00d4ff]/50 resize-none"
                  />
                </div>
                {contactError && (
                  <p className="text-red-400 text-sm">{contactError}</p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitContact.isPending}
                  className="w-full gap-2 bg-gradient-to-r from-[#00d4ff] to-[#b24bf3] text-white hover:opacity-90 h-12 text-base font-semibold"
                >
                  {submitContact.isPending ? (
                    <span className="flex items-center gap-2"><span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />Sending…</span>
                  ) : (
                    <><Send className="h-4 w-4" />Send Message</>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Block 10: Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden bg-[#0d0e24] border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/10 via-[#b24bf3]/10 to-transparent" />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-6 text-lg px-6 py-2">
              <Rocket className="h-4 w-4 mr-2" />
              Limited Spots Available
            </Badge>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00d4ff] to-[#b24bf3] bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            Ready to Invest in the Future?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Join visionary investors who are backing the next generation of AI-powered productivity tools. Limited investment slots available for this round.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            variants={fadeInUp}
          >
            <Button size="lg" className="text-lg px-8 py-6 text-black font-semibold" style={{ background: 'linear-gradient(135deg, #00d4ff, #0099cc)' }} asChild>
              <Link href="/register">
                <Briefcase className="mr-2 h-5 w-5" />
                Create Investor Account
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-[#b24bf3] text-[#b24bf3] hover:bg-[#b24bf3]/10" asChild>
              <Link href="/dashboard">
                <Calendar className="mr-2 h-5 w-5" />
                View Dashboard
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Secure Process</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Fast Onboarding</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Expert Support</span>
            </div>
          </motion.div>
        </motion.div>
      </section>
      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-gray-500 text-sm bg-[#0a0b1e]">
        <p>© {new Date().getFullYear()} BrainPower AI. All rights reserved.</p>
        <div className="mt-3 flex justify-center gap-6">
          <Link href="/" className="text-gray-500 hover:text-[#00d4ff] transition-colors">Home</Link>
          <Link href="/login" className="text-gray-500 hover:text-[#00d4ff] transition-colors">Admin Login</Link>
          <Link href="/register" className="text-gray-500 hover:text-[#00d4ff] transition-colors">Register</Link>
        </div>
      </footer>
    </div>
  );
}
