export const kpiData = {
  citizenSignals: "1.24M",
  activeIssues: "18,420",
  highPriority: "2,341",
  populationAffected: "8.7M",
  resolutionProgress: "87%",
};

export const priorityIssues = [
  {
    id: 1,
    title: "Drinking Water Shortage",
    location: "Prakasam District, Andhra Pradesh",
    priority: 94,
    affected: "8,420",
    category: "Water Infrastructure",
    trend: "increasing",
    status: "Critical",
    reports: 234,
  },
  {
    id: 2,
    title: "Road Deterioration",
    location: "Guntur District, Andhra Pradesh",
    priority: 89,
    affected: "5,210",
    category: "Road Infrastructure",
    trend: "stable",
    status: "High",
    reports: 187,
  },
  {
    id: 3,
    title: "Electricity Disruption",
    location: "Nellore District, Andhra Pradesh",
    priority: 86,
    affected: "4,820",
    category: "Power Infrastructure",
    trend: "increasing",
    status: "High",
    reports: 156,
  },
  {
    id: 4,
    title: "Healthcare Access Gap",
    location: "Kurnool District, Andhra Pradesh",
    priority: 82,
    affected: "3,910",
    category: "Healthcare Infrastructure",
    trend: "increasing",
    status: "High",
    reports: 142,
  },
  {
    id: 5,
    title: "School Building Damage",
    location: "West Godavari, Andhra Pradesh",
    priority: 78,
    affected: "2,640",
    category: "Education Infrastructure",
    trend: "stable",
    status: "Medium",
    reports: 98,
  },
  {
    id: 6,
    title: "Drainage Blockage",
    location: "Krishna District, Andhra Pradesh",
    priority: 75,
    affected: "3,150",
    category: "Water Infrastructure",
    trend: "increasing",
    status: "Medium",
    reports: 112,
  },
];

export const infrastructureCategories = [
  {
    name: "Water",
    icon: "droplets",
    issues: 4820,
    risk: "high",
    trend: "+12%",
    affected: "3.2M",
    unresolved: 2340,
  },
  {
    name: "Roads",
    icon: "road",
    issues: 3650,
    risk: "medium",
    trend: "+5%",
    affected: "2.1M",
    unresolved: 1890,
  },
  {
    name: "Electricity",
    icon: "zap",
    issues: 2980,
    risk: "high",
    trend: "+8%",
    affected: "1.8M",
    unresolved: 1240,
  },
  {
    name: "Healthcare",
    icon: "heart-pulse",
    issues: 2150,
    risk: "medium",
    trend: "+3%",
    affected: "0.9M",
    unresolved: 980,
  },
  {
    name: "Education",
    icon: "graduation-cap",
    issues: 1820,
    risk: "low",
    trend: "+2%",
    affected: "0.7M",
    unresolved: 720,
  },
];

export const predictiveRisks = [
  {
    category: "Water Shortage Risk",
    risk: "HIGH",
    timeframe: "Next 30 days",
    confidence: 92,
    factors: ["Monsoon delay", "Reservoir levels dropping", "Increasing citizen reports"],
  },
  {
    category: "Road Failure Risk",
    risk: "MEDIUM",
    timeframe: "Next 60 days",
    confidence: 78,
    factors: ["Heavy vehicle traffic", "Rainfall patterns", "Aging infrastructure"],
  },
  {
    category: "Electricity Disruption Risk",
    risk: "HIGH",
    timeframe: "Next 30 days",
    confidence: 88,
    factors: ["Peak demand season", "Grid stress indicators", "Equipment age"],
  },
  {
    category: "Healthcare Capacity Risk",
    risk: "MEDIUM",
    timeframe: "Next 90 days",
    confidence: 71,
    factors: ["Population growth", "Staff shortages", "Equipment availability"],
  },
];

export const bricsCountries = [
  { name: "India", signals: "4.2M", priority: "Water Infrastructure", risk: "high", participation: 78 },
  { name: "China", signals: "6.1M", priority: "Urban Infrastructure", risk: "medium", participation: 82 },
  { name: "Russia", signals: "2.8M", priority: "Energy Infrastructure", risk: "medium", participation: 65 },
  { name: "Brazil", signals: "3.5M", priority: "Transport Infrastructure", risk: "high", participation: 71 },
  { name: "South Africa", signals: "1.9M", priority: "Water & Sanitation", risk: "high", participation: 58 },
  { name: "Egypt", signals: "1.4M", priority: "Housing Infrastructure", risk: "medium", participation: 52 },
  { name: "Ethiopia", signals: "0.8M", priority: "Agricultural Infrastructure", risk: "high", participation: 45 },
  { name: "Iran", signals: "1.2M", priority: "Transport Infrastructure", risk: "medium", participation: 48 },
  { name: "UAE", signals: "0.6M", priority: "Smart City Infrastructure", risk: "low", participation: 89 },
  { name: "Saudi Arabia", signals: "0.9M", priority: "Water Desalination", risk: "medium", participation: 72 },
  { name: "Indonesia", signals: "2.1M", priority: "Disaster Resilience", risk: "high", participation: 63 },
];

export const aiConversationFlow = [
  {
    role: "citizen" as const,
    message: "There has been no drinking water in our village for five days.",
    timestamp: "10:23 AM",
  },
  {
    role: "ai" as const,
    message: "I understand. I can help document this infrastructure issue. Can you tell me — how many households are affected in your village?",
    timestamp: "10:23 AM",
  },
  {
    role: "citizen" as const,
    message: "Around 200 households. Many families are buying water from tankers at very high prices.",
    timestamp: "10:24 AM",
  },
  {
    role: "ai" as const,
    message: "Thank you. Are schools, hospitals, or other essential services in your area also affected by this water shortage?",
    timestamp: "10:24 AM",
  },
  {
    role: "citizen" as const,
    message: "Yes, the local primary school and the community health center are both affected. Children cannot attend school properly.",
    timestamp: "10:25 AM",
  },
  {
    role: "ai" as const,
    message: "I have gathered enough information. Let me analyze this issue for you. Would you like to upload a photo of the affected area to strengthen the report?",
    timestamp: "10:25 AM",
  },
];

export const aiUnderstanding = {
  language: "Telugu",
  intent: "Water Supply Issue",
  category: "Water Infrastructure",
  location: "Prakasam District",
  urgency: "High",
  confidence: 94,
  affectedService: "Drinking Water",
  estimatedHouseholds: "200",
  healthRisk: "Moderate",
};

export const issueIntelligence = {
  title: "Drinking Water Shortage",
  location: "Prakasam District, Andhra Pradesh",
  priorityScore: 87,
  status: "High Priority",
  category: "Water Infrastructure",
  urgency: "Critical",
  estimatedPopulation: "8,420",
  healthRisk: "Moderate to High",
  similarReports: 234,
  growthTrend: "+18% this week",
  confidence: 94,
  factors: {
    citizenReports: 85,
    populationAffected: 78,
    urgency: 92,
    healthRisk: 70,
    infrastructureDeficit: 65,
    growthTrend: 82,
  },
  explanation:
    "Multiple citizen reports indicate a persistent water shortage affecting a high number of residents. The combination of duration, population impact and potential health risk increases the priority. Similar reports from neighboring areas suggest a systemic infrastructure failure requiring immediate attention.",
};

export const timelineSteps = [
  { label: "Citizen Submitted", date: "Jan 15, 2026", completed: true },
  { label: "Issue Understood", date: "Jan 15, 2026", completed: true },
  { label: "Issue Clustered", date: "Jan 16, 2026", completed: true },
  { label: "Priority Updated", date: "Jan 17, 2026", completed: true },
  { label: "Project Considered", date: "Jan 20, 2026", completed: true },
  { label: "Work Started", date: "Feb 1, 2026", completed: false },
  { label: "Project Completed", date: "—", completed: false },
  { label: "Citizen Notified", date: "—", completed: false },
];

export const mapData = [
  { id: 1, name: "Prakasam District", lat: 15.35, lng: 80.04, priority: 94, issues: 234, risk: "critical", category: "Water Infrastructure" },
  { id: 2, name: "Guntur District", lat: 16.31, lng: 80.44, priority: 89, issues: 187, risk: "high", category: "Road Infrastructure" },
  { id: 3, name: "Nellore District", lat: 14.44, lng: 79.99, priority: 86, issues: 156, risk: "high", category: "Water Infrastructure" },
  { id: 4, name: "Kurnool District", lat: 15.83, lng: 78.05, priority: 82, issues: 142, risk: "high", category: "Electricity Infrastructure" },
  { id: 5, name: "West Godavari", lat: 16.92, lng: 81.34, priority: 78, issues: 98, risk: "medium", category: "Water Infrastructure" },
  { id: 6, name: "Krishna District", lat: 16.18, lng: 81.13, priority: 75, issues: 112, risk: "medium", category: "Road Infrastructure" },
  { id: 7, name: "East Godavari", lat: 17.00, lng: 81.80, priority: 71, issues: 89, risk: "medium", category: "Healthcare Infrastructure" },
  { id: 8, name: "Chittoor District", lat: 13.22, lng: 79.10, priority: 68, issues: 76, risk: "medium", category: "Education Infrastructure" },
  { id: 9, name: "Visakhapatnam", lat: 17.69, lng: 83.22, priority: 62, issues: 95, risk: "low", category: "Road Infrastructure" },
  { id: 10, name: "Vizianagaram", lat: 18.11, lng: 83.40, priority: 58, issues: 67, risk: "low", category: "Water Infrastructure" },
  { id: 11, name: "Anantapur District", lat: 14.68, lng: 77.59, priority: 73, issues: 121, risk: "high", category: "Water Infrastructure" },
  { id: 12, name: "YSR Kadapa", lat: 14.47, lng: 78.82, priority: 66, issues: 88, risk: "medium", category: "Electricity Infrastructure" },
  { id: 13, name: "Tirupati", lat: 13.63, lng: 79.42, priority: 55, issues: 72, risk: "low", category: "Healthcare Infrastructure" },
  { id: 14, name: "Srikakulam", lat: 18.29, lng: 83.89, priority: 51, issues: 45, risk: "low", category: "Road Infrastructure" },
  { id: 15, name: "Vijayawada", lat: 16.51, lng: 80.65, priority: 84, issues: 198, risk: "high", category: "Water Infrastructure" },
];

export const chartData = {
  water: [
    { month: "Sep", reports: 1200, resolved: 800 },
    { month: "Oct", reports: 1450, resolved: 950 },
    { month: "Nov", reports: 1680, resolved: 1100 },
    { month: "Dec", reports: 1920, resolved: 1350 },
    { month: "Jan", reports: 2340, resolved: 1600 },
    { month: "Feb", reports: 2100, resolved: 1800 },
  ],
  roads: [
    { month: "Sep", reports: 980, resolved: 650 },
    { month: "Oct", reports: 1050, resolved: 720 },
    { month: "Nov", reports: 1120, resolved: 800 },
    { month: "Dec", reports: 1200, resolved: 900 },
    { month: "Jan", reports: 1350, resolved: 1050 },
    { month: "Feb", reports: 1280, resolved: 1150 },
  ],
  electricity: [
    { month: "Sep", reports: 850, resolved: 600 },
    { month: "Oct", reports: 920, resolved: 680 },
    { month: "Nov", reports: 1080, resolved: 750 },
    { month: "Dec", reports: 1250, resolved: 900 },
    { month: "Jan", reports: 1400, resolved: 1000 },
    { month: "Feb", reports: 1320, resolved: 1100 },
  ],
  healthcare: [
    { month: "Sep", reports: 620, resolved: 400 },
    { month: "Oct", reports: 680, resolved: 450 },
    { month: "Nov", reports: 750, resolved: 520 },
    { month: "Dec", reports: 820, resolved: 600 },
    { month: "Jan", reports: 900, resolved: 680 },
    { month: "Feb", reports: 850, resolved: 720 },
  ],
  education: [
    { month: "Sep", reports: 480, resolved: 350 },
    { month: "Oct", reports: 520, resolved: 380 },
    { month: "Nov", reports: 560, resolved: 420 },
    { month: "Dec", reports: 610, resolved: 470 },
    { month: "Jan", reports: 680, resolved: 530 },
    { month: "Feb", reports: 640, resolved: 550 },
  ],
};

export const policyCopilotQuestions = [
  "Which district has the highest water risk?",
  "Why is this issue ranked first?",
  "What if we invest ₹10 crore here?",
  "Which project could create the highest impact?",
  "Show me trends in healthcare infrastructure needs",
  "Compare water infrastructure across districts",
];

export const policyCopilotAnswer = {
  question: "Which district has the highest water risk?",
  answer:
    "Prakasam District currently has the highest water infrastructure risk score in the state. The AI assessment considers multiple factors including citizen signal volume, affected population, infrastructure age, and trend analysis.",
  evidence: [
    "234 citizen signals in the last 30 days",
    "8,420 residents directly affected",
    "Water supply infrastructure is 23 years old",
    "18% increase in reports week-over-week",
    "Neighboring districts showing similar patterns",
  ],
  keyFactors: [
    { factor: "Signal Volume", weight: 25 },
    { factor: "Population Impact", weight: 22 },
    { factor: "Infrastructure Age", weight: 20 },
    { factor: "Trend Growth", weight: 18 },
    { factor: "Health Risk", weight: 15 },
  ],
  recommendation:
    "Prioritize emergency water supply intervention in Prakasam District. Consider temporary tanker deployment while permanent infrastructure repair is planned. Estimated investment: ₹4.5 crore for immediate relief, ₹12 crore for long-term infrastructure upgrade.",
  confidence: 94,
  dataSources: [
    "BCIN Citizen Signal Database",
    "District Infrastructure Registry",
    "Population Census Data",
    "Health Department Records",
  ],
};
