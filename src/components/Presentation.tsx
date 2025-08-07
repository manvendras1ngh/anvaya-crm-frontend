import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Mountain,
  Shield,
  Code,
  TrendingUp,
  Target,
  Globe,
  Database,
  Brain,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const AWTCPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title
    {
      id: 1,
      type: "title",
      content: {
        title: "AWTC",
        subtitle:
          "Artificial Intelligence based Web Application for Travellers Community",
        description:
          "A Community-Driven Platform for Offbeat Destinations and Trekking",
        author: "Submitted To: Kamalpreet Kaur Bagral (31662)",
        student: "Submitted By: Manvendra Vikram Singh (11804347)",
      },
    },

    // Slide 2: Problem Statement
    {
      id: 2,
      type: "content",
      content: {
        title: "The Gap in Travel Information Platforms",
        icon: Target,
        points: [
          "59% of travelers begin journeys without specific destinations",
          "Fragmentation between information sharing and booking platforms",
          "75% seek authentic local experiences but lack reliable sources",
          "Existing platforms focus on commercial, mainstream destinations",
          "Limited community-driven content for offbeat locations",
        ],
      },
    },

    // Slide 3: Market Opportunity
    {
      id: 3,
      type: "stats",
      content: {
        title: "Adventure Tourism: A Growing Market",
        icon: TrendingUp,
        stats: [
          {
            label: "Global Market Size",
            value: "$406.12B (2024) → $1.01T (2030)",
          },
          { label: "Growth Rate", value: "16.8% CAGR (vs 7% general travel)" },
          { label: "Target Demographic", value: "25-40 years (18.2% CAGR)" },
          {
            label: "Soft Adventure Segment",
            value: "65% of adventure tourism market",
          },
          { label: "Hiking Market", value: "$24.1B (2023) → $36.5B (2031)" },
        ],
      },
    },

    // Slide 4: Research Foundation
    {
      id: 4,
      type: "content",
      content: {
        title: "Academic Validation",
        icon: Brain,
        points: [
          "$10+ billion in travel purchases influenced by user-generated content",
          "74% of travelers use community comments as primary information sources",
          "Community-generated information more trusted than commercial sources",
          "Timeliness, accuracy, credibility predict 50% of trust variance",
          "Research Gap: No platforms specifically for offbeat destinations",
        ],
      },
    },

    // Slide 5: Solution Overview
    {
      id: 5,
      type: "solution",
      content: {
        title: "AWTC Platform Features",
        icon: Mountain,
        features: [
          {
            icon: "🏔️",
            title: "Offbeat Destination Focus",
            description:
              "Community-driven content for uncommercialized locations",
          },
          {
            icon: "🤝",
            title: "Authentic Community Building",
            description:
              "Forum discussions, reputation system, real-time collaboration",
          },
          {
            icon: "🤖",
            title: "AI-Powered Enhancement",
            description:
              "Content categorization, personalized recommendations, intelligent moderation",
          },
        ],
      },
    },

    // Slide 6: Technical Architecture
    {
      id: 6,
      type: "architecture",
      content: {
        title: "MERN Stack Implementation",
        icon: Code,
        components: [
          {
            name: "MongoDB",
            description: "Geospatial indexing, user profiles, content storage",
            color: "bg-green-500",
          },
          {
            name: "Express.js",
            description:
              "RESTful APIs, authentication middleware, file handling",
            color: "bg-gray-700",
          },
          {
            name: "React.js",
            description:
              "Component-based UI, PWA capabilities, real-time updates",
            color: "bg-blue-500",
          },
          {
            name: "Node.js",
            description:
              "Asynchronous processing, package management, API integration",
            color: "bg-green-600",
          },
        ],
      },
    },

    // Slide 7: Security Implementation
    {
      id: 7,
      type: "security",
      content: {
        title: "WebAuthn: Next-Generation Authentication",
        icon: Shield,
        comparison: {
          traditional: ["Passwords", "Phishing vulnerable", "Server breaches"],
          webauthn: [
            "Biometric/Hardware keys",
            "Phishing resistant",
            "No stored secrets",
          ],
        },
        benefits: [
          "50% reduction in support tickets",
          "6x faster login",
          "Enhanced security",
        ],
      },
    },

    // Slide 8: Data Acquisition
    {
      id: 8,
      type: "data",
      content: {
        title: "Multi-Source Content Population",
        icon: Database,
        tools: [
          { name: "Puppeteer", use: "Dynamic content from travel sites" },
        ],
        sources: [
          "Tourism board websites",
          "Weather APIs",
          "Public transport data",
          "Social media (with permissions)",
        ],
      },
    },

    // Slide 9: AI Integration
    {
      id: 9,
      type: "ai",
      content: {
        title: "Intelligent Content Management",
        icon: Brain,
        enhancement: [
          "Natural Language Processing for auto-categorization",
          "Image recognition for location tagging",
          "Sentiment analysis for community mood",
          "Content moderation automation",
        ],
        experience: [
          "Personalized destination recommendations",
          "AI-powered route optimization",
          "Multi-language translation support",
          "Intelligent chatbot for common queries",
        ],
      },
    },

    // Slide 10: Development Roadmap
    {
      id: 10,
      type: "roadmap",
      content: {
        title: "Phased Implementation Strategy",
        icon: Target,
        phases: [
          {
            phase: "Phase 1: MVP",
            duration: "3-4 months",
            tasks: [
              "Basic MERN stack setup",
              "WebAuthn authentication",
              "Core blog/forum functionality",
              "Initial web scraping",
            ],
          },
          {
            phase: "Phase 2: Community Features",
            duration: "2-3 months",
            tasks: [
              "Advanced forum capabilities",
              "Reputation system",
              "Mobile responsiveness",
              "Basic AI categorization",
            ],
          },
          {
            phase: "Phase 3: Platform Expansion",
            duration: "3-4 months",
            tasks: [
              "Advanced mapping integration",
              "Offline PWA capabilities",
              "Revenue feature rollout",
              "Comprehensive testing",
            ],
          },
        ],
      },
    },

    // Slide 11: Revenue Model
    {
      id: 11,
      type: "revenue",
      content: {
        title: "Sustainable Monetization Strategy",
        icon: TrendingUp,
        phases: [
          {
            phase: "Phase 1 (Year 1)",
            items: [
              "Freemium model with premium features",
              "Community memberships ($5-15/month)",
              "Local guide partnership commissions",
            ],
          },
          {
            phase: "Phase 2 (Year 2-3)",
            items: [
              "Curated small-group experiences (20-30% markup)",
              "Outdoor gear affiliate programs",
              "Sponsored content from tourism boards",
            ],
          },
          {
            phase: "Long-term",
            items: [
              "API licensing to other platforms",
              "Corporate team-building packages",
              "Mobile app premium features",
            ],
          },
        ],
      },
    },

    // Slide 12: Technology Stack
    {
      id: 12,
      type: "techstack",
      content: {
        title: "Complete Development Ecosystem",
        icon: Code,
        categories: [
          {
            category: "Frontend",
            technologies: ["React.js", "Redux", "Tailwind CSS", "PWA features"],
          },
          {
            category: "Backend & Database",
            technologies: [
              "Node.js",
              "Express.js",
              "MongoDB",
              "JWT",
              "WebAuthn",
            ],
          },
          {
            category: "Data & AI",
            technologies: [
              "Puppeteer",
              "OpenAI API",
              "TensorFlow.js",
            ],
          },
          {
            category: "Infrastructure",
            technologies: ["Vercel", "Sentry", "GitHub"],
          },
        ],
      },
    },

    // Slide 13: Conclusion
    {
      id: 13,
      type: "conclusion",
      content: {
        title: "The Future of Travel Communities",
        icon: Globe,
        opportunities: [
          "Serve the underserved adventure tourism market",
          "Connect travelers with authentic, offbeat experiences",
          "Build sustainable technology supporting local communities",
          "Pioneer AI-enhanced travel discovery platforms",
        ],
        nextSteps: [
          "Begin MVP development with core team",
          "Establish partnerships with tourism stakeholders",
          "Launch beta program with adventure travel communities",
          "Scale based on user feedback and market validation",
        ],
      },
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const renderSlide = () => {
    const slide = slides[currentSlide];
    const IconComponent = slide.content.icon as LucideIcon;

    switch (slide.type) {
      case "title":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
            <Mountain className="w-24 h-24 mb-8 text-blue-200" />
            <h1 className="text-6xl font-bold mb-4">{slide.content.title}</h1>
            <h2 className="text-2xl mb-6 max-w-4xl">
              {slide.content.subtitle}
            </h2>
            <p className="text-xl mb-8 text-blue-200">
              {slide.content.description}
            </p>
            <div className="space-y-2">
              <p className="text-lg">{slide.content.author}</p>
              <p className="text-lg">{slide.content.student}</p>
            </div>
          </div>
        );

      case "content":
        return (
          <div className="p-16">
            <div className="flex items-center mb-12">
              <IconComponent className="w-12 h-12 text-blue-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-800">
                {slide.content.title}
              </h1>
            </div>
            <div className="space-y-6">
              {slide.content.points?.map((point: string, index: number) => (
                <div key={index} className="flex items-start">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-3 mr-6 flex-shrink-0"></div>
                  <p className="text-2xl text-gray-700 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "stats":
        return (
          <div className="p-8 h-full overflow-y-auto">
            <div className="flex items-center mb-8">
              <IconComponent className="w-10 h-10 text-green-600 mr-4" />
              <h1 className="text-4xl font-bold text-gray-800">
                {slide.content.title}
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
              {slide.content.stats?.map((stat: any, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-l-4 border-green-500"
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-2xl font-bold text-green-600">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "solution":
        return (
          <div className="p-16">
            <div className="flex items-center mb-12">
              <IconComponent className="w-12 h-12 text-purple-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-800">
                {slide.content.title}
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {slide.content.features?.map((feature: any, index: number) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-purple-500"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{feature.icon}</span>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xl text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "architecture":
        return (
          <div className="p-16">
            <div className="flex items-center mb-12">
              <IconComponent className="w-12 h-12 text-indigo-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-800">
                {slide.content.title}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {slide.content.components?.map((component: any, index: number) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                  <div
                    className={`w-16 h-16 ${component.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {component.name}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {component.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "security":
        return (
          <div className="p-16">
            <div className="flex items-center mb-12">
              <IconComponent className="w-12 h-12 text-red-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-800">
                {slide.content.title}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-red-600 mb-4">
                  Traditional
                </h3>
                {slide.content.comparison?.traditional?.map((item: string, index: number) => (
                  <p key={index} className="text-lg text-gray-700 mb-2">
                    ❌ {item}
                  </p>
                ))}
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-4">
                  WebAuthn
                </h3>
                {slide.content.comparison?.webauthn?.map((item: string, index: number) => (
                  <p key={index} className="text-lg text-gray-700 mb-2">
                    ✅ {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Benefits
              </h3>
              {slide.content.benefits?.map((benefit: string, index: number) => (
                <p key={index} className="text-lg text-gray-700 mb-2">
                  🚀 {benefit}
                </p>
              ))}
            </div>
          </div>
        );

      case "data":
        return (
          <div className="p-16">
            <div className="flex items-center mb-12">
              <IconComponent className="w-12 h-12 text-purple-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-800">
                {slide.content.title}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-purple-600 mb-6">
                  Scraping Tools
                </h3>
                {slide.content.tools?.map((tool: any, index: number) => (
                  <div key={index} className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {tool.name}
                    </h4>
                    <p className="text-gray-600">{tool.use}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-purple-600 mb-6">
                  Data Sources
                </h3>
                {slide.content.sources?.map((source: string, index: number) => (
                  <p key={index} className="text-lg text-gray-700 mb-2">
                    • {source}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );

      case "ai":
        return (
          <div className="p-16">
            <div className="flex items-center mb-12">
              <IconComponent className="w-12 h-12 text-indigo-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-800">
                {slide.content.title}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-indigo-600 mb-6">
                  Content Enhancement
                </h3>
                {slide.content.enhancement?.map((item: string, index: number) => (
                  <p key={index} className="text-lg text-gray-700 mb-3">
                    🤖 {item}
                  </p>
                ))}
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-indigo-600 mb-6">
                  User Experience
                </h3>
                {slide.content.experience?.map((item: string, index: number) => (
                  <p key={index} className="text-lg text-gray-700 mb-3">
                    ✨ {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );

      case "revenue":
        return (
          <div className="p-8 h-full overflow-y-auto">
            <div className="flex items-center mb-8">
              <IconComponent className="w-10 h-10 text-green-600 mr-4" />
              <h1 className="text-4xl font-bold text-gray-800">
                {slide.content.title}
              </h1>
            </div>
            <div className="space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
              {slide.content.phases?.map((phase: any, index: number) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {phase.phase}
                  </h3>
                  <div className="space-y-2">
                    {phase.items?.map((item: string, itemIndex: number) => (
                      <p key={itemIndex} className="text-base text-gray-600">
                        💰 {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "techstack":
        return (
          <div className="p-16">
            <div className="flex items-center mb-12">
              <IconComponent className="w-12 h-12 text-blue-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-800">
                {slide.content.title}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {slide.content.categories?.map((category: any, index: number) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">
                    {category.category}
                  </h3>
                  <div className="space-y-2">
                    {category.technologies?.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "roadmap":
        return (
          <div className="p-8 h-full overflow-y-auto">
            <div className="flex items-center mb-8">
              <IconComponent className="w-10 h-10 text-orange-600 mr-4" />
              <h1 className="text-4xl font-bold text-gray-800">
                {slide.content.title}
              </h1>
            </div>
            <div className="space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
              {slide.content.phases?.map((phase: any, index: number) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-500"
                >
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mr-4">
                      {phase.phase}
                    </h3>
                    {phase.duration && (
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {phase.duration}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {phase.tasks?.map((task: string, taskIndex: number) => (
                      <p key={taskIndex} className="text-base text-gray-600">
                        • {task}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "conclusion":
        return (
          <div className="p-16">
            <div className="flex items-center mb-12">
              <IconComponent className="w-12 h-12 text-teal-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-800">
                {slide.content.title}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-teal-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-teal-600 mb-6">
                  AWTC represents a unique opportunity to:
                </h3>
                {slide.content.opportunities?.map((opportunity: string, index: number) => (
                  <p key={index} className="text-lg text-gray-700 mb-3">
                    🎯 {opportunity}
                  </p>
                ))}
              </div>
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-6">
                  Next Steps:
                </h3>
                {slide.content.nextSteps?.map((step: string, index: number) => (
                  <p key={index} className="text-lg text-gray-700 mb-3">
                    🚀 {step}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-8">
              {slide.content.title}
            </h1>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 relative overflow-hidden">
      {/* Main slide content */}
      <div className="w-full h-full">{renderSlide()}</div>

      {/* Navigation controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-white rounded-full shadow-lg px-6 py-3">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          disabled={currentSlide === 0}
        >
          <ChevronLeft
            className={`w-6 h-6 ${
              currentSlide === 0 ? "text-gray-300" : "text-gray-600"
            }`}
          />
        </button>

        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          disabled={currentSlide === slides.length - 1}
        >
          <ChevronRight
            className={`w-6 h-6 ${
              currentSlide === slides.length - 1
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 right-4 bg-white rounded-full shadow-lg px-4 py-2">
        <span className="text-sm font-semibold text-gray-600">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>

    </div>
  );
};

export default AWTCPresentation;
