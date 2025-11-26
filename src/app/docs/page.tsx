"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  ChevronRight,
  Copy,
  Check,
  Package,
  BookOpen,
} from "lucide-react";

interface SDKMethod {
  name: string;
  description: string;
  signature: string;
  params?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  returns: string;
  example: string;
}

interface SDKSection {
  title: string;
  description: string;
  methods: SDKMethod[];
}

const sdkSections: SDKSection[] = [
  {
    title: "Getting Started",
    description: "Install and start using the SDK",
    methods: [
      {
        name: "Installation",
        description: "Add the SDK to your project",
        signature: "npm install @adsforge/sdk",
        returns: "void",
        example: `npm install @adsforge/sdk`,
      },
      {
        name: "Setup",
        description: "Configure the SDK (optional)",
        signature: "import { http } from '@adsforge/sdk'",
        returns: "void",
        example: `import { http } from '@adsforge/sdk'

http.defaults.baseURL = 'https://api.adsforge.io'
http.defaults.headers.common['Authorization'] = 'Bearer YOUR_API_KEY'`,
      },
    ],
  },
  {
    title: "Campaign Management",
    description: "Create and manage campaigns using AI or manual configuration",
    methods: [
      {
        name: "analyzeAndCreateCampaign",
        description:
          "Create a complete campaign from a natural language prompt - AI handles targeting, budgets, and ad copy.",
        signature:
          "analyzeAndCreateCampaign(prompt: string): Promise<Campaign>",
        params: [
          {
            name: "prompt",
            type: "string",
            required: true,
            description:
              "Describe your campaign goals, audience, budget, and duration",
          },
        ],
        returns: "Promise<Campaign>",
        example: `import { analyzeAndCreateCampaign } from '@adsforge/sdk'

// Create campaign from natural language
const campaign = await analyzeAndCreateCampaign(
  "MMA gym targeting men 18-35 in Europe, $15/day for 2 weeks, lead generation"
)

// Campaign is ready with targeting, budget, and ad copy
console.log(campaign.name, campaign.countries, campaign.budget)`,
      },
      {
        name: "publishCampaign",
        description: "Publish your campaign to Meta platforms",
        signature:
          "publishCampaign(campaignId: string): Promise<PublishResult>",
        params: [
          {
            name: "campaignId",
            type: "string",
            required: true,
            description: "ID of the campaign to publish",
          },
        ],
        returns: "Promise<{ success: boolean, campaignId: string }>",
        example: `import { publishCampaign } from '@adsforge/sdk'

const result = await publishCampaign('campaign_123')`,
      },
      {
        name: "getCampaigns",
        description: "Get all campaigns from your account",
        signature: "getCampaigns(): Promise<Campaign[]>",
        returns: "Promise<Campaign[]>",
        example: `import { getCampaigns } from '@adsforge/sdk'

const campaigns = await getCampaigns()
const active = campaigns.filter(c => c.status === 'ACTIVE')`,
      },
      {
        name: "updateStepFour",
        description: "Update campaign settings",
        signature:
          "updateStepFour(campaignId: string, campaign: Campaign): Promise<Result>",
        params: [
          {
            name: "campaignId",
            type: "string",
            required: true,
            description: "Campaign ID",
          },
          {
            name: "campaign",
            type: "Campaign",
            required: true,
            description: "Updated campaign settings",
          },
        ],
        returns: "Promise<{ success: boolean }>",
        example: `import { updateStepFour } from '@adsforge/sdk'

await updateStepFour('campaign_123', {
  name: 'Summer Sale',
  budget: { value: 50, budgetType: 'DAILY' },
  countries: ['US', 'CA']
})`,
      },
    ],
  },
  {
    title: "Meta Countries",
    description: "Get available targeting countries",
    methods: [
      {
        name: "getMetaCountries",
        description: "List all countries available for Meta ad targeting",
        signature: "getMetaCountries(): Promise<CountryResponse>",
        returns: "Promise<{ allCountries, englishSpeaking, spanishSpeaking }>",
        example: `import { getMetaCountries } from '@adsforge/sdk'

const { allCountries, englishSpeakingCountries } = await getMetaCountries()`,
      },
    ],
  },
  {
    title: "Meta Pages",
    description: "Access your Facebook Pages",
    methods: [
      {
        name: "getMetaPages",
        description: "Get all Facebook Pages connected to your account",
        signature: "getMetaPages(): Promise<Page[]>",
        returns: "Promise<Page[]>",
        example: `import { getMetaPages } from '@adsforge/sdk'

const pages = await getMetaPages()`,
      },
    ],
  },
  {
    title: "Meta Ad Accounts",
    description: "Manage your Meta ad accounts",
    methods: [
      {
        name: "getMetaAdAccounts",
        description:
          "Get all your Meta Ad Accounts with status and spending info",
        signature: "getMetaAdAccounts(): Promise<AdAccount[]>",
        returns: "Promise<AdAccount[]>",
        example: `import { getMetaAdAccounts } from '@adsforge/sdk'

const accounts = await getMetaAdAccounts()
const active = accounts.filter(a => a.status === 'ACTIVE')`,
      },
    ],
  },
  {
    title: "Meta Languages",
    description: "Get available targeting languages",
    methods: [
      {
        name: "getMetaLanguages",
        description: "List all languages available for ad targeting",
        signature: "getMetaLanguages(): Promise<Language[]>",
        returns: "Promise<Language[]>",
        example: `import { getMetaLanguages } from '@adsforge/sdk'

const languages = await getMetaLanguages()`,
      },
    ],
  },
  {
    title: "Meta Pixels",
    description: "Manage conversion tracking pixels",
    methods: [
      {
        name: "createMetaPixel",
        description: "Create a new tracking pixel",
        signature:
          "createMetaPixel(adAccountId: string, name: string): Promise<Pixel>",
        params: [
          {
            name: "adAccountId",
            type: "string",
            required: true,
            description: "Your Meta Ad Account ID",
          },
          {
            name: "name",
            type: "string",
            required: true,
            description: "Pixel name",
          },
        ],
        returns: "Promise<{ id, name, code }>",
        example: `import { createMetaPixel } from '@adsforge/sdk'

const pixel = await createMetaPixel('act_123456789', 'My Pixel')`,
      },
      {
        name: "getMetaPixels",
        description: "List all pixels for an ad account",
        signature: "getMetaPixels(adAccountId: string): Promise<Pixel[]>",
        params: [
          {
            name: "adAccountId",
            type: "string",
            required: true,
            description: "Your Meta Ad Account ID",
          },
        ],
        returns: "Promise<Pixel[]>",
        example: `import { getMetaPixels } from '@adsforge/sdk'

const pixels = await getMetaPixels('act_123456789')`,
      },
    ],
  },
  {
    title: "Reach Estimation",
    description: "Estimate potential audience reach",
    methods: [
      {
        name: "getReachEstimate",
        description: "Get estimated reach for your targeting criteria",
        signature:
          "getReachEstimate(options: ReachOptions): Promise<ReachEstimate>",
        params: [
          {
            name: "options.adAccountId",
            type: "string",
            required: true,
            description: "Ad Account ID",
          },
          {
            name: "options.ageMin",
            type: "number",
            required: true,
            description: "Min age",
          },
          {
            name: "options.ageMax",
            type: "number",
            required: true,
            description: "Max age",
          },
          {
            name: "options.platforms",
            type: "string[]",
            required: true,
            description: "['facebook', 'instagram']",
          },
          {
            name: "options.countryCodes",
            type: "string[]",
            required: true,
            description: "Country codes",
          },
        ],
        returns: "Promise<{ users_lower_bound, users_upper_bound }>",
        example: `import { getReachEstimate } from '@adsforge/sdk'

const estimate = await getReachEstimate({
  adAccountId: 'act_123456789',
  ageMin: 25,
  ageMax: 45,
  platforms: ['facebook', 'instagram'],
  countryCodes: ['US', 'CA']
})`,
      },
    ],
  },
  {
    title: "Meta Interests",
    description: "Search targeting interests",
    methods: [
      {
        name: "getMetaInterests",
        description: "Find interests for ad targeting",
        signature: "getMetaInterests(query: string): Promise<Interest[]>",
        params: [
          {
            name: "query",
            type: "string",
            required: true,
            description: "Search term",
          },
        ],
        returns: "Promise<Interest[]>",
        example: `import { getMetaInterests } from '@adsforge/sdk'

const interests = await getMetaInterests('fitness')`,
      },
    ],
  },
];

function MethodBadge({ name }: { name: string }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30">
      {name}
    </span>
  );
}

function CodeBlock({
  code,
  language = "typescript",
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100 z-10"
        title="Copy to clipboard"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </button>
      <pre className="bg-black/40 rounded-lg p-4 overflow-x-auto border border-white/5">
        <code className="text-sm font-mono text-gray-300">{code}</code>
      </pre>
    </div>
  );
}

export default function DocsPage() {
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);

  const toggleMethod = (key: string) => {
    setExpandedMethod(expandedMethod === key ? null : key);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Package className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">SDK Documentation</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AdsForge SDK
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              The official TypeScript SDK for AdsForge. Build powerful Meta
              advertising integrations with type-safe functions and real-time
              campaign management.
            </p>

            {/* Quick Start Cards */}
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12">
              <div className="bg-white/[0.02] border border-white/10 rounded-lg p-6 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold">Install</h3>
                </div>
                <code className="text-sm text-gray-400">
                  npm install @adsforge/sdk
                </code>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-lg p-6 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <Code2 className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold">Import</h3>
                </div>
                <code className="text-sm text-gray-400">
                  import &#123; getMetaPages &#125;
                </code>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-lg p-6 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-pink-400" />
                  <h3 className="font-semibold">TypeScript</h3>
                </div>
                <code className="text-sm text-gray-400">
                  Full type safety included
                </code>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SDK Sections */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="space-y-16">
          {sdkSections.map((section, sectionIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIdx * 0.1 }}
              className="space-y-6"
            >
              {/* Section Header */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {section.title}
                </h2>
                <p className="text-gray-400">{section.description}</p>
              </div>

              {/* Methods */}
              <div className="space-y-4">
                {section.methods.map((method, methodIdx) => {
                  const key = `${sectionIdx}-${methodIdx}`;
                  const isExpanded = expandedMethod === key;

                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur overflow-hidden hover:border-white/20 transition-colors"
                    >
                      {/* Method Header */}
                      <button
                        onClick={() => toggleMethod(key)}
                        className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <MethodBadge name={method.name} />
                          <p className="text-sm text-gray-400 truncate">
                            {method.description}
                          </p>
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {/* Method Details */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-white/10 px-6 py-6 space-y-6"
                        >
                          {/* Signature */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                              Function Signature
                            </h4>
                            <CodeBlock
                              code={method.signature}
                              language="typescript"
                            />
                          </div>

                          {/* Parameters */}
                          {method.params && method.params.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                                Parameters
                              </h4>
                              <div className="space-y-2">
                                {method.params.map((param) => (
                                  <div
                                    key={param.name}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/5"
                                  >
                                    <code className="font-mono text-sm text-blue-400 font-semibold">
                                      {param.name}
                                    </code>
                                    <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                      {param.type}
                                    </span>
                                    {param.required && (
                                      <span className="text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                                        required
                                      </span>
                                    )}
                                    <p className="text-sm text-gray-400 flex-1">
                                      {param.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Returns */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                              Returns
                            </h4>
                            <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                              <code className="text-sm font-mono text-green-400">
                                {method.returns}
                              </code>
                            </div>
                          </div>

                          {/* Example */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                              Example Usage
                            </h4>
                            <CodeBlock
                              code={method.example}
                              language="typescript"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Type Definitions Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Type Definitions
            </h2>
            <p className="text-gray-400">TypeScript interfaces for SDK types</p>
          </div>

          <div className="space-y-4">
            {/* Core Campaign Types */}
            <div className="bg-white/[0.02] border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Campaign Types
              </h3>
              <CodeBlock
                language="typescript"
                code={`interface Campaign {
  _id: string
  name: string
  status: 'PAUSED' | 'ACTIVE' | 'DRAFT' | 'COMPLETED'
  objective: 'OUTCOME_ENGAGEMENT' | 'OUTCOME_TRAFFIC' | 'OUTCOME_CONVERSIONS'
  budget: {
    value: number
    budgetType: 'DAILY' | 'LIFETIME'
  }
  countries: string[]
  genders: 'ALL' | 'MALE' | 'FEMALE'
  ageMin: number
  ageMax: number
  interests: Array<{
    name: string
    _id: string
  }>
  // Ad content
  headline: string
  primaryText: string
  description: string
  callToAction: string
  startTime: string
  endTime: string
  createdAt: string
  updatedAt: string
}`}
              />
            </div>

            {/* Meta Resource Types */}
            <div className="bg-white/[0.02] border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Meta Resource Types
              </h3>
              <CodeBlock
                language="typescript"
                code={`interface Page {
  id: string
  name: string
  category: string
  accessToken: string
  business: {
    id: string
    name: string
  }
}

interface AdAccount {
  id: string
  name: string
  status: string
  currency: string
  amount_spent: string
}

interface Country {
  key: string
  name: string
  country_code: string
  supports_region: boolean
  supports_city: boolean
}

interface Language {
  key: number
  name: string
}

interface Interest {
  id: string
  name: string
  audience_size_lower_bound: number
  audience_size_upper_bound: number
  path: string[]
  topic: string
}

interface Pixel {
  id: string
  name: string
  code: string
}`}
              />
            </div>

            {/* Response Types */}
            <div className="bg-white/[0.02] border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Response Types
              </h3>
              <CodeBlock
                language="typescript"
                code={`interface CountryResponse {
  allCountries: Country[]
  englishSpeakingCountries: Country[]
  spanishSpeakingCountries: Country[]
}

interface ReachEstimate {
  users_lower_bound: number
  users_upper_bound: number
  estimate_ready: boolean
}

interface PublishResult {
  success: boolean
  campaignId: string
}`}
              />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
