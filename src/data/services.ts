import type {
  Commitment,
  IndustrySolution,
  ProcessStep,
  Service,
} from "@/types";

export const services: Service[] = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    description:
      "Web applications and internal tools built around how your organization actually works, not around a template.",
    icon: "code-xml",
    deliverables: [
      "Requirements and scope you can review before we build",
      "Working software released in stages",
      "Source code and handover documentation",
    ],
  },
  {
    id: "ai-automation",
    title: "AI Integration and Automation",
    description:
      "Practical uses of AI and automation for repetitive work such as sorting requests, drafting replies and extracting data from documents.",
    icon: "brain-circuit",
    deliverables: [
      "A short assessment of where AI helps and where it does not",
      "Prototype of the highest-value workflow",
      "Clear notes on limits, review steps and costs",
    ],
  },
  {
    id: "business-inventory",
    title: "Business and Inventory Systems",
    description:
      "Stock control, sales records and reporting for shops, wholesalers and small businesses that have outgrown spreadsheets.",
    icon: "boxes",
    deliverables: [
      "Stock, supplier and sales tracking",
      "Reports owners can read without training",
      "Data import from existing spreadsheets",
    ],
  },
  {
    id: "education-systems",
    title: "Education Management Systems",
    description:
      "Student records, admissions, results and communication tools for schools and universities.",
    icon: "school",
    deliverables: [
      "Student and staff records",
      "Digital admissions and reporting workflows",
      "Role-based access for staff, students and parents",
    ],
  },
  {
    id: "web-design",
    title: "Website Design and Development",
    description:
      "Fast, accessible websites that explain what you do and make it easy for people to contact you.",
    icon: "globe",
    deliverables: [
      "Mobile-first design",
      "Search-friendly structure and metadata",
      "Contact and enquiry forms that really deliver",
    ],
  },
  {
    id: "mobile-apps",
    title: "Mobile Application Development",
    description:
      "Apps that stay usable on modest phones and unreliable connections, with careful use of data.",
    icon: "smartphone",
    deliverables: [
      "Lightweight, touch-friendly interfaces",
      "Behavior planned for weak or interrupted connections",
      "Release support for the platforms you choose",
    ],
  },
  {
    id: "it-consulting",
    title: "IT Consulting and Digital Transformation",
    description:
      "Independent advice on which systems to adopt, in what order, and how to move your team onto them.",
    icon: "compass",
    deliverables: [
      "Review of current tools and processes",
      "A prioritized, realistic roadmap",
      "Help evaluating vendors and proposals",
    ],
  },
  {
    id: "data-analytics",
    title: "Data Systems and Analytics",
    description:
      "Clean, connected data and dashboards that turn records into decisions.",
    icon: "bar-chart",
    deliverables: [
      "Data structure and clean-up plan",
      "Dashboards for the questions you ask most",
      "Documented sources so numbers can be traced",
    ],
  },
  {
    id: "cloud",
    title: "Cloud Architecture and Deployment",
    description:
      "Hosting and deployment set up to be reliable and affordable, starting with free tiers where they are enough.",
    icon: "cloud",
    deliverables: [
      "Deployment pipeline and environments",
      "Backup and security basics",
      "Cost notes so there are no surprises",
    ],
  },
];

export const industries: IndustrySolution[] = [
  {
    id: "education",
    title: "Schools and universities",
    icon: "graduation-cap",
    problem:
      "Records live in paper files and scattered spreadsheets, so admissions, results and reporting take far longer than they should.",
    workflows: [
      "Student records and digital admissions",
      "Results entry and report generation",
      "ID cards and verification",
    ],
  },
  {
    id: "smes",
    title: "Small and medium-sized businesses",
    icon: "store",
    problem:
      "Owners track sales, stock and customers in notebooks or chat threads and cannot see the whole picture.",
    workflows: [
      "Sales and expense tracking",
      "Customer records and follow-ups",
      "A business website that brings in enquiries",
    ],
  },
  {
    id: "retail-wholesale",
    title: "Retailers and wholesalers",
    icon: "boxes",
    problem:
      "Stock runs out unnoticed, or sits unsold, because nobody has a reliable count.",
    workflows: [
      "Inventory control and reorder alerts",
      "Supplier and purchase tracking",
      "Wholesale ordering and delivery coordination",
    ],
  },
  {
    id: "ngos",
    title: "NGOs and development organizations",
    icon: "hand-heart",
    problem:
      "Programme data is collected in many formats, which makes donor reporting slow and error-prone.",
    workflows: [
      "Data collection and case tracking",
      "Beneficiary and activity reporting",
      "Workflow automation for approvals",
    ],
  },
  {
    id: "public",
    title: "Public institutions",
    icon: "building",
    problem:
      "Citizens and staff depend on in-person visits and paper forms for services that could be requested and tracked online.",
    workflows: [
      "Online request and status tracking",
      "Digital records and reporting",
      "Accessible public information sites",
    ],
  },
  {
    id: "startups",
    title: "Entrepreneurs and startups",
    icon: "rocket",
    problem:
      "A good idea needs a working product before it can attract customers or funding, and budgets are small.",
    workflows: [
      "Prototype and first release",
      "Landing page and waiting list",
      "Architecture that can grow with you",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "Understand the problem, users, requirements, and success criteria.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Define the user experience, visual system, and technical architecture.",
  },
  {
    step: "03",
    title: "Build",
    description: "Develop, integrate, and test the solution.",
  },
  {
    step: "04",
    title: "Launch",
    description: "Deploy, configure, document, and hand over the product.",
  },
  {
    step: "05",
    title: "Improve",
    description: "Collect feedback, fix issues, and plan future enhancements.",
  },
];

/** Working principles. These are commitments, not measured claims. */
export const commitments: Commitment[] = [
  {
    title: "Designed around real operational needs",
    description:
      "We start from the work your team does today, not from a feature list.",
    icon: "clipboard-list",
  },
  {
    title: "Responsive and accessible",
    description:
      "Interfaces that work on small phones, with keyboard and screen reader support in mind.",
    icon: "eye",
  },
  {
    title: "Maintainable architecture",
    description:
      "Readable, documented code so you are never locked in to us.",
    icon: "layers",
  },
  {
    title: "Practical AI adoption",
    description:
      "AI where it measurably helps, and plain software where it does not.",
    icon: "sparkles",
  },
  {
    title: "Mobile-first",
    description:
      "Built for the devices and connections people actually use.",
    icon: "smartphone",
  },
  {
    title: "Transparent delivery",
    description:
      "Regular working releases and honest status, including what is not ready.",
    icon: "workflow",
  },
  {
    title: "Room to grow",
    description:
      "Solutions structured so features can be added without starting over.",
    icon: "gauge",
  },
];

export const values = [
  { title: "Innovation", icon: "lightbulb" as const },
  { title: "Reliability", icon: "shield-check" as const },
  { title: "Integrity", icon: "scale" as const },
  { title: "Accessibility", icon: "eye" as const },
  { title: "Customer focus", icon: "users" as const },
  { title: "Continuous improvement", icon: "refresh-cw" as const },
];
