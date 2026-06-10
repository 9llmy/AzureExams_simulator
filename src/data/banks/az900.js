/**
 * AZ-900 (Azure Fundamentals) starter question bank.
 *
 * This is a preview bank that demonstrates how any Azure certification
 * plugs into the simulator. The engine automatically adapts: when a bank
 * holds fewer questions than the exam's configured questionCount, the
 * attempt simply uses every available question and the welcome screen
 * shows a preview notice. Grow this file toward the full count over time —
 * no other code changes are needed.
 *
 * Question shapes (identical contract to every other bank):
 *  - single:  { type:"single", options:[...], correct:[i] }
 *  - multi:   { type:"multi",  pick:N, options:[...], correct:[i,j,...] }
 *  - matrix:  { type:"matrix", statements:[...], matrixAnswers:[...] }
 *             matrix convention: 0 = "Yes", 1 = "No"
 */
export const AZ900_BANK = [
  { id: 1, domain: "Cloud Concepts", type: "single",
    q: "Your company hosts part of an application in its on-premises datacenter and deploys the rest of the workload to Azure, with the two environments working together. Which cloud model does this describe?",
    options: ["Public cloud", "Private cloud", "Hybrid cloud", "Community cloud"],
    correct: [2],
    explanation: "A hybrid cloud combines on-premises infrastructure (or a private cloud) with public cloud services and lets workloads span both." },
  { id: 2, domain: "Cloud Concepts", type: "single",
    q: "Which expenditure model best describes the cloud's pay-as-you-go pricing?",
    options: ["Capital expenditure (CapEx)", "Operational expenditure (OpEx)", "Fixed-asset depreciation", "Up-front perpetual licensing"],
    correct: [1],
    explanation: "Pay-as-you-go is operational expenditure: you pay for what you consume rather than investing capital in physical infrastructure up front." },
  { id: 3, domain: "Azure Architecture and Services", type: "single",
    q: "What are Azure availability zones?",
    options: ["Physically separate datacenter locations within an Azure region", "Separate billing accounts within a subscription", "Geographies that contain multiple Azure regions", "Virtual networks that span multiple subscriptions"],
    correct: [0],
    explanation: "Availability zones are physically separate datacenters within a region, each with independent power, cooling, and networking, used to protect against datacenter-level failures." },
  { id: 4, domain: "Azure Architecture and Services", type: "single",
    q: "Which Azure service lets you run small pieces of event-driven code without provisioning or managing servers?",
    options: ["Azure Virtual Machines", "Azure Functions", "Azure Virtual Desktop", "Azure Bastion"],
    correct: [1],
    explanation: "Azure Functions is a serverless compute service: code runs in response to events and the platform manages the underlying servers." },
  { id: 5, domain: "Azure Management and Governance", type: "single",
    q: "You need to estimate the monthly cost of an Azure solution before deploying anything. Which tool should you use?",
    options: ["Azure Pricing Calculator", "Azure Advisor", "Microsoft Cost Management", "Azure Monitor"],
    correct: [0],
    explanation: "The Pricing Calculator estimates costs for planned deployments; Cost Management analyzes spending on resources that already exist." },
  { id: 6, domain: "Azure Architecture and Services", type: "single",
    q: "Which service provides cloud-based identity and access management for Azure?",
    options: ["Microsoft Entra ID (formerly Azure Active Directory)", "Azure DDoS Protection", "Azure Key Vault", "Microsoft Defender for Cloud"],
    correct: [0],
    explanation: "Microsoft Entra ID is Azure's identity and access management service, handling sign-in and access to resources." },
  { id: 7, domain: "Azure Management and Governance", type: "single",
    q: "You must ensure that every newly created Azure resource includes a specific tag. Which service should you use?",
    options: ["Azure Policy", "Role-based access control (RBAC)", "Azure Monitor", "Microsoft Entra ID"],
    correct: [0],
    explanation: "Azure Policy enforces organizational standards on resources, such as requiring tags; RBAC controls who can perform actions, not how resources are configured." },
  { id: 8, domain: "Cloud Concepts", type: "multi", pick: 2,
    q: "Which two characteristics are benefits of moving services to the cloud?",
    options: ["Elasticity", "High availability", "A guarantee of zero downtime", "Elimination of all security responsibilities"],
    correct: [0, 1],
    explanation: "Elasticity and high availability are core cloud benefits. No provider guarantees zero downtime, and security remains a shared responsibility." },
  { id: 9, domain: "Azure Architecture and Services", type: "multi", pick: 2,
    q: "Which two services are examples of platform as a service (PaaS)?",
    options: ["Azure App Service", "Azure SQL Database", "Azure Virtual Machines", "An on-premises Hyper-V host"],
    correct: [0, 1],
    explanation: "App Service and Azure SQL Database are managed platforms where you bring code or data; Virtual Machines are IaaS and Hyper-V is on-premises." },
  { id: 10, domain: "Cloud Concepts", type: "matrix",
    q: "For each statement about the shared responsibility model, select Yes if it is true. Otherwise, select No.",
    statements: ["In infrastructure as a service (IaaS), the customer is responsible for patching the guest operating system.", "In software as a service (SaaS), the customer manages the underlying physical network.", "The customer is always responsible for their data, accounts, and identities, regardless of service model."],
    matrixAnswers: [0, 1, 0],
    explanation: "IaaS customers manage the OS and above; the provider always owns the physical network; and information, accounts, and identities always remain the customer's responsibility." },
  { id: 11, domain: "Azure Architecture and Services", type: "matrix",
    q: "For each statement about Azure resource groups, select Yes if it is true. Otherwise, select No.",
    statements: ["A resource can exist in only one resource group at a time.", "Deleting a resource group deletes all of the resources it contains.", "A resource group can contain resources from only a single Azure region."],
    matrixAnswers: [0, 0, 1],
    explanation: "Resources belong to exactly one group, and deleting the group removes its contents — but a group may hold resources from different regions." },
  { id: 12, domain: "Cloud Concepts", type: "matrix",
    q: "For each statement about cloud economics, select Yes if it is true. Otherwise, select No.",
    statements: ["The consumption-based model requires significant up-front costs.", "Compute charges for a virtual machine stop while it is deallocated.", "Economies of scale allow cloud providers to offer lower prices than most individual companies could achieve on their own."],
    matrixAnswers: [1, 0, 0],
    explanation: "Consumption pricing avoids up-front investment; deallocated VMs stop accruing compute charges (storage still bills); and providers' massive scale lowers per-unit costs." },
];
