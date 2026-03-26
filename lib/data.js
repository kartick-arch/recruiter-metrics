// All client and individual names are obfuscated.
// Original data sourced from live dashboard as of 2026-03-26.

export const CLIENT_NAME = "Acme Corp"
export const REPORT_DATE = "March 26, 2026"
export const REPORT_PERIOD = "Q1 2026"

// Recruiter name mapping (original → obfuscated)
// subhanshu.mittal → recruiter.alpha
// tanusri.goswami  → recruiter.beta
// devanshu.singh   → recruiter.gamma
// priya.sharma     → recruiter.delta
// rahul.verma      → recruiter.epsilon
// neha.gupta       → recruiter.zeta
// amit.kumar       → recruiter.eta
// pooja.mehta      → recruiter.theta
// vikram.nair      → recruiter.iota
// sunita.rao       → recruiter.kappa

export const KPI_SUMMARY = {
  activeJobs: 90,
  totalJobs: 169,
  pausedJobs: 58,
  closedJobs: 21,
  totalApplicants: 51755,
  newApplicants15d: 11428,
  peakApplicantsDate: "03/25",
  peakApplicantsCount: 1670,
  strongFit: 4129,
  potentialFit: 6918,
  fitPool: 11047,
  tracySetUp: 1157,
  tracyInterviewed: 364,
  tracyUpcoming: 598,
  tracyRecommended: 165,
  offersSent: 15,
  offerRejected: 10,
  joined: 5,
  jobsZeroStrongFit: 68,
}

export const FUNNEL = [
  { label: "Applicants", value: 51755, pct: 100, color: "#3b82f6" },
  { label: "Strong Fit", value: 4129, pct: 8.0, color: "#6366f1" },
  { label: "Fit Pool (Strong + Potential)", value: 11047, pct: 21.3, color: "#8b5cf6" },
  { label: "Tracy Set Up", value: 1157, pct: 2.2, color: "#f59e0b" },
  { label: "Tracy Interviewed", value: 364, pct: 0.7, color: "#10b981" },
  { label: "Recommended", value: 165, pct: 0.3, color: "#059669" },
  { label: "Offers Sent", value: 15, pct: 0.03, color: "#0284c7" },
  { label: "Joined", value: 5, pct: 0.01, color: "#0369a1" },
]

export const CONVERSION_RATES = [
  { stage: "Applicant → Strong Fit", rate: 8.0, from: 51755, to: 4129 },
  { stage: "Fit Pool → Tracy Set Up", rate: 10.5, from: 11047, to: 1157 },
  { stage: "Tracy Set Up → Interview", rate: 31.5, from: 1157, to: 364 },
  { stage: "Interview → Recommended", rate: 45.3, from: 364, to: 165 },
  { stage: "Offer Acceptance", rate: 33.3, from: 15, to: 5, note: "offers → joined" },
]

export const JOB_STATUS = [
  { status: "Open", count: 90, color: "#10b981" },
  { status: "Paused", count: 58, color: "#f59e0b" },
  { status: "Closed", count: 21, color: "#94a3b8" },
]

export const PIPELINE_STAGES = [
  { stage: "Applied", count: 51755, color: "#3b82f6" },
  { stage: "Strong Fit", count: 4129, color: "#6366f1" },
  { stage: "Potential Fit", count: 6918, color: "#8b5cf6" },
  { stage: "Tracy Set Up", count: 1157, color: "#f59e0b" },
  { stage: "Tracy Upcoming", count: 598, color: "#fb923c" },
  { stage: "Tracy Interviewed", count: 364, color: "#10b981" },
  { stage: "Recommended", count: 165, color: "#059669" },
  { stage: "Offers Sent", count: 15, color: "#0284c7" },
  { stage: "Joined", count: 5, color: "#0369a1" },
]

export const RECRUITERS = [
  {
    name: "recruiter.alpha",
    jobs: 18,
    applicants: 9820,
    strongFit: 780,
    potentialFit: 1240,
    tracySetUp: 103,
    tracyInt: 42,
    recommended: 21,
    offers: 4,
    joined: 3,
    rejected: 1,
  },
  {
    name: "recruiter.beta",
    jobs: 14,
    applicants: 7340,
    strongFit: 610,
    potentialFit: 980,
    tracySetUp: 77,
    tracyInt: 31,
    recommended: 15,
    offers: 2,
    joined: 1,
    rejected: 1,
  },
  {
    name: "recruiter.gamma",
    jobs: 12,
    applicants: 6120,
    strongFit: 490,
    potentialFit: 820,
    tracySetUp: 68,
    tracyInt: 28,
    recommended: 13,
    offers: 4,
    joined: 1,
    rejected: 3,
  },
  {
    name: "recruiter.delta",
    jobs: 11,
    applicants: 5480,
    strongFit: 420,
    potentialFit: 710,
    tracySetUp: 55,
    tracyInt: 22,
    recommended: 10,
    offers: 2,
    joined: 0,
    rejected: 2,
  },
  {
    name: "recruiter.epsilon",
    jobs: 10,
    applicants: 4920,
    strongFit: 380,
    potentialFit: 640,
    tracySetUp: 48,
    tracyInt: 18,
    recommended: 8,
    offers: 1,
    joined: 0,
    rejected: 1,
  },
  {
    name: "recruiter.zeta",
    jobs: 9,
    applicants: 4100,
    strongFit: 310,
    potentialFit: 520,
    tracySetUp: 40,
    tracyInt: 15,
    recommended: 7,
    offers: 1,
    joined: 0,
    rejected: 1,
  },
  {
    name: "recruiter.eta",
    jobs: 8,
    applicants: 3760,
    strongFit: 280,
    potentialFit: 470,
    tracySetUp: 35,
    tracyInt: 14,
    recommended: 6,
    offers: 0,
    joined: 0,
    rejected: 0,
  },
  {
    name: "recruiter.theta",
    jobs: 7,
    applicants: 3280,
    strongFit: 240,
    potentialFit: 400,
    tracySetUp: 30,
    tracyInt: 12,
    recommended: 5,
    offers: 1,
    joined: 0,
    rejected: 1,
  },
  {
    name: "recruiter.iota",
    jobs: 6,
    applicants: 2890,
    strongFit: 200,
    potentialFit: 340,
    tracySetUp: 25,
    tracyInt: 10,
    recommended: 4,
    offers: 0,
    joined: 0,
    rejected: 0,
  },
  {
    name: "recruiter.kappa",
    jobs: 5,
    applicants: 2410,
    strongFit: 170,
    potentialFit: 280,
    tracySetUp: 20,
    tracyInt: 8,
    recommended: 3,
    offers: 0,
    joined: 0,
    rejected: 0,
  },
]

export const DAILY_TREND = [
  { date: "03/10", applicants: 320, tracySetUp: 28, tracyInt: 8, recommended: 4 },
  { date: "03/11", applicants: 410, tracySetUp: 34, tracyInt: 10, recommended: 5 },
  { date: "03/12", applicants: 380, tracySetUp: 30, tracyInt: 9, recommended: 4 },
  { date: "03/13", applicants: 450, tracySetUp: 42, tracyInt: 14, recommended: 7 },
  { date: "03/14", applicants: 520, tracySetUp: 48, tracyInt: 16, recommended: 8 },
  { date: "03/15", applicants: 290, tracySetUp: 22, tracyInt: 7, recommended: 3 },
  { date: "03/16", applicants: 340, tracySetUp: 26, tracyInt: 8, recommended: 4 },
  { date: "03/17", applicants: 680, tracySetUp: 58, tracyInt: 19, recommended: 9 },
  { date: "03/18", applicants: 720, tracySetUp: 64, tracyInt: 21, recommended: 10 },
  { date: "03/19", applicants: 810, tracySetUp: 72, tracyInt: 24, recommended: 12 },
  { date: "03/20", applicants: 940, tracySetUp: 84, tracyInt: 28, recommended: 13 },
  { date: "03/21", applicants: 1020, tracySetUp: 92, tracyInt: 30, recommended: 15 },
  { date: "03/22", applicants: 1180, tracySetUp: 108, tracyInt: 36, recommended: 17 },
  { date: "03/23", applicants: 1340, tracySetUp: 120, tracyInt: 40, recommended: 19 },
  { date: "03/24", applicants: 1510, tracySetUp: 134, tracyInt: 44, recommended: 21 },
  { date: "03/25", applicants: 1670, tracySetUp: 148, tracyInt: 48, recommended: 23 },
]

export const DAILY_RECRUITER_TREND = [
  { date: "03/10", alpha: 6, beta: 4, gamma: 4, delta: 3, epsilon: 2 },
  { date: "03/11", alpha: 8, beta: 5, gamma: 5, delta: 4, epsilon: 3 },
  { date: "03/12", alpha: 7, beta: 5, gamma: 4, delta: 3, epsilon: 2 },
  { date: "03/13", alpha: 10, beta: 7, gamma: 6, delta: 5, epsilon: 3 },
  { date: "03/14", alpha: 12, beta: 8, gamma: 7, delta: 5, epsilon: 4 },
  { date: "03/15", alpha: 5, beta: 4, gamma: 3, delta: 3, epsilon: 2 },
  { date: "03/16", alpha: 6, beta: 5, gamma: 4, delta: 3, epsilon: 2 },
  { date: "03/17", alpha: 14, beta: 10, gamma: 9, delta: 7, epsilon: 4 },
  { date: "03/18", alpha: 16, beta: 11, gamma: 10, delta: 8, epsilon: 5 },
  { date: "03/19", alpha: 18, beta: 12, gamma: 11, delta: 8, epsilon: 5 },
  { date: "03/20", alpha: 21, beta: 14, gamma: 12, delta: 9, epsilon: 6 },
  { date: "03/21", alpha: 23, beta: 16, gamma: 14, delta: 10, epsilon: 6 },
  { date: "03/22", alpha: 26, beta: 18, gamma: 16, delta: 11, epsilon: 7 },
  { date: "03/23", alpha: 29, beta: 20, gamma: 18, delta: 12, epsilon: 8 },
  { date: "03/24", alpha: 32, beta: 22, gamma: 20, delta: 13, epsilon: 9 },
  { date: "03/25", alpha: 36, beta: 25, gamma: 22, delta: 15, epsilon: 10 },
]

export const JOBS = [
  { title: "Senior Software Engineer", recruiter: "recruiter.alpha", status: "Open", published: "Jan 15", applicants: 1840, strongFit: 142, potentialFit: 230, tracySetUp: 18, tracyInt: 7, recommended: 4, offersSent: 1, offerRejected: 0, joined: 1 },
  { title: "Product Manager", recruiter: "recruiter.beta", status: "Open", published: "Jan 18", applicants: 1220, strongFit: 98, potentialFit: 165, tracySetUp: 12, tracyInt: 5, recommended: 2, offersSent: 0, offerRejected: 0, joined: 0 },
  { title: "Data Scientist", recruiter: "recruiter.alpha", status: "Open", published: "Jan 20", applicants: 980, strongFit: 78, potentialFit: 130, tracySetUp: 10, tracyInt: 4, recommended: 2, offersSent: 1, offerRejected: 0, joined: 1 },
  { title: "DevOps Engineer", recruiter: "recruiter.gamma", status: "Open", published: "Jan 22", applicants: 740, strongFit: 58, potentialFit: 95, tracySetUp: 8, tracyInt: 3, recommended: 1, offersSent: 0, offerRejected: 0, joined: 0 },
  { title: "UX Designer", recruiter: "recruiter.delta", status: "Paused", published: "Jan 25", applicants: 620, strongFit: 48, potentialFit: 82, tracySetUp: 6, tracyInt: 2, recommended: 1, offersSent: 0, offerRejected: 0, joined: 0 },
  { title: "Machine Learning Engineer", recruiter: "recruiter.alpha", status: "Open", published: "Feb 01", applicants: 860, strongFit: 68, potentialFit: 114, tracySetUp: 9, tracyInt: 4, recommended: 2, offersSent: 1, offerRejected: 0, joined: 1 },
  { title: "Frontend Developer", recruiter: "recruiter.beta", status: "Open", published: "Feb 03", applicants: 1120, strongFit: 89, potentialFit: 148, tracySetUp: 11, tracyInt: 4, recommended: 2, offersSent: 0, offerRejected: 0, joined: 0 },
  { title: "Backend Developer", recruiter: "recruiter.gamma", status: "Open", published: "Feb 05", applicants: 1340, strongFit: 105, potentialFit: 178, tracySetUp: 14, tracyInt: 5, recommended: 2, offersSent: 1, offerRejected: 1, joined: 0 },
  { title: "Cloud Architect", recruiter: "recruiter.alpha", status: "Paused", published: "Feb 08", applicants: 480, strongFit: 38, potentialFit: 62, tracySetUp: 5, tracyInt: 2, recommended: 1, offersSent: 0, offerRejected: 0, joined: 0 },
  { title: "Security Engineer", recruiter: "recruiter.delta", status: "Open", published: "Feb 10", applicants: 560, strongFit: 44, potentialFit: 74, tracySetUp: 6, tracyInt: 2, recommended: 1, offersSent: 0, offerRejected: 0, joined: 0 },
  { title: "QA Engineer", recruiter: "recruiter.epsilon", status: "Open", published: "Feb 12", applicants: 680, strongFit: 54, potentialFit: 90, tracySetUp: 7, tracyInt: 3, recommended: 1, offersSent: 0, offerRejected: 0, joined: 0 },
  { title: "Business Analyst", recruiter: "recruiter.beta", status: "Paused", published: "Feb 14", applicants: 420, strongFit: 34, potentialFit: 56, tracySetUp: 4, tracyInt: 2, recommended: 1, offersSent: 0, offerRejected: 0, joined: 0 },
  { title: "Scrum Master", recruiter: "recruiter.zeta", status: "Open", published: "Feb 16", applicants: 380, strongFit: 30, potentialFit: 50, tracySetUp: 4, tracyInt: 1, recommended: 1, offersSent: 0, offerRejected: 0, joined: 0 },
  { title: "Technical Lead", recruiter: "recruiter.alpha", status: "Open", published: "Feb 18", applicants: 720, strongFit: 57, potentialFit: 96, tracySetUp: 8, tracyInt: 3, recommended: 1, offersSent: 1, offerRejected: 0, joined: 0 },
  { title: "Network Engineer", recruiter: "recruiter.gamma", status: "Closed", published: "Jan 10", applicants: 290, strongFit: 22, potentialFit: 38, tracySetUp: 3, tracyInt: 1, recommended: 1, offersSent: 1, offerRejected: 0, joined: 1 },
  { title: "IT Support Specialist", recruiter: "recruiter.eta", status: "Open", published: "Feb 20", applicants: 540, strongFit: 42, potentialFit: 70, tracySetUp: 5, tracyInt: 2, recommended: 1, offersSent: 0, offerRejected: 0, joined: 0 },
  { title: "Systems Administrator", recruiter: "recruiter.theta", status: "Paused", published: "Feb 22", applicants: 360, strongFit: 28, potentialFit: 48, tracySetUp: 3, tracyInt: 1, recommended: 0, offersSent: 0, offerRejected: 0, joined: 0 },
  { title: "Database Administrator", recruiter: "recruiter.iota", status: "Open", published: "Feb 24", applicants: 420, strongFit: 34, potentialFit: 56, tracySetUp: 4, tracyInt: 2, recommended: 1, offersSent: 0, offerRejected: 0, joined: 0 },
  { title: "Mobile Developer (iOS)", recruiter: "recruiter.beta", status: "Open", published: "Feb 26", applicants: 580, strongFit: 46, potentialFit: 76, tracySetUp: 6, tracyInt: 2, recommended: 1, offersSent: 0, offerRejected: 0, joined: 0 },
  { title: "Mobile Developer (Android)", recruiter: "recruiter.gamma", status: "Open", published: "Feb 28", applicants: 540, strongFit: 42, potentialFit: 70, tracySetUp: 5, tracyInt: 2, recommended: 1, offersSent: 1, offerRejected: 0, joined: 0 },
]
