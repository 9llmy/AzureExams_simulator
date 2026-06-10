import { AI900_BANK } from "../data/banks/ai900";
import { AZ900_BANK } from "../data/banks/az900";

/**
 * EXAM REGISTRY — the single place where certifications are defined.
 *
 * ── HOW TO ADD ANY AZURE CERTIFICATION (e.g. DP-900, SC-900, AZ-104) ──
 *
 *  1. Create a bank file:   src/data/banks/dp900.js
 *     exporting an array of questions using the shared shapes
 *     (single / multi / matrix — see any existing bank for the contract).
 *
 *  2. Add ONE entry to the EXAMS array below.
 *
 *  That's it. The exam picker, welcome screen, timer, navigator,
 *  grading, and results dashboard all read from this definition —
 *  nothing else in the codebase needs to change. If the bank holds
 *  fewer questions than `questionCount`, the simulator automatically
 *  runs in preview mode with every available question.
 *
 * Field reference:
 *  id              stable kebab-case identifier
 *  code            short exam code shown in the UI ("AI-900")
 *  name            certification title
 *  description     one-line summary for the exam picker card
 *  durationMinutes total exam time; drives the countdown
 *  questionCount   target number of questions drawn per attempt
 *  passPercent     passing threshold (70 → 700/1000 scaled)
 *  bank            the imported question array
 */
export const EXAMS = [
  {
    id: "ai-900",
    code: "AI-900",
    name: "Azure AI Fundamentals",
    description:
      "AI workloads, machine learning on Azure, computer vision, NLP, and generative AI.",
    durationMinutes: 80,
    questionCount: 60,
    passPercent: 70,
    bank: AI900_BANK,
  },
  {
    id: "az-900",
    code: "AZ-900",
    name: "Azure Fundamentals",
    description:
      "Cloud concepts, Azure architecture and services, and Azure management and governance.",
    durationMinutes: 45,
    questionCount: 40,
    passPercent: 70,
    bank: AZ900_BANK,
  },

  // ── TEMPLATE — copy, fill in, and import your bank ──
  // {
  //   id: "dp-900",
  //   code: "DP-900",
  //   name: "Azure Data Fundamentals",
  //   description: "Core data concepts, relational and non-relational data, and analytics on Azure.",
  //   durationMinutes: 45,
  //   questionCount: 40,
  //   passPercent: 70,
  //   bank: DP900_BANK,
  // },
];
