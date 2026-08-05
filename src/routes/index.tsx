import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/frontera/Nav";
import { Hero } from "@/components/frontera/Hero";
import { ClientStrip } from "@/components/frontera/ClientStrip";
import { About } from "@/components/frontera/About";
import { Expertise } from "@/components/frontera/Expertise";
import { CaseStudies, type CaseStudyProps } from "@/components/frontera/CaseStudy";
import { Capabilities } from "@/components/frontera/Capabilities";
import { DarkBar } from "@/components/frontera/DarkBar";
import { useReveal } from "@/hooks/use-reveal";

import case1Portrait from "@/assets/frontera/case1-portrait.jpg";
import case1Thumb from "@/assets/frontera/case1-thumb.jpg";
import case2Portrait from "@/assets/frontera/case2-portrait.jpg";
import case2Thumb from "@/assets/frontera/case2-thumb.jpg";
import caseResearchPortrait from "@/assets/frontera/case-research-portrait.jpg";
import caseResearchThumb from "@/assets/frontera/case-research-thumb.jpg";
import case4Portrait from "@/assets/frontera/case4-portrait.jpg";
import case5Portrait from "@/assets/frontera/case5-portrait.jpg";
import case5Thumb from "@/assets/frontera/case5-thumb.jpg";
import case6Portrait from "@/assets/frontera/case6-portrait.jpg";
import case4Thumb from "@/assets/frontera/case4-thumb.jpg";
import case6Thumb from "@/assets/frontera/case6-thumb.jpg";
import case7Portrait from "@/assets/frontera/case7-portrait.jpg";
import case7Thumb from "@/assets/frontera/case7-thumb.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frontera Global — Behavioural Intelligence for Healthcare" },
      {
        name: "description",
        content:
          "AI-driven research, strategy and creative paired with behavioural science to help pharma teams change behaviour and deliver real-world impact.",
      },
      {
        property: "og:title",
        content: "Frontera Global — Behavioural Intelligence for Healthcare",
      },
      {
        property: "og:description",
        content: "AI-driven research, strategy and creative for pharma teams.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const launchTechniques = [
  {
    title: "Behavioural Evidence Synthesis",
    body: "Systematic consolidation of 45+ global and local data sources, including research reports, brand plans, medical strategy, patient journeys, and advisory boards.",
  },
  {
    title: "Behavioural Intelligence Modelling",
    body: "AI-enabled thematic analysis and TDF-based behavioural coding to identify decision drivers, barriers, country archetypes, and priority patient segments.",
  },
];

const caseResearch: CaseStudyProps = {
  id: "case-research",
  badge: "ONE",
  featured: true,
  metric: "Multi-market pathway intelligence",
  tags: ["Research + Intelligence", "EUR Region"],
  heroHeadline: "Uncovering how decisions are made across complex, multi-market pathways",
  summary:
    "AI-driven analysis and behavioural science helped map how patients, professionals, and systems behave across diverse reimbursement environments.",
  heroBody:
    "Launching across dual indications in highly diverse reimbursement environments required combining AI-driven analysis with behavioural science to map behaviour across patients, professionals, and systems — to identify archetypes and pathway friction and unlock real-world potential.",
  portrait: caseResearchPortrait,
  portraitAlt: "European doctor in modern hospital corridor",
  ctaSubject: "Case Study Request — Research & Intelligence",
  detailHeading: "Launch Strategy Optimisation / Validation",
  detailSub:
    "Using AI to reveal patterns in multiple care pathways and reimbursement challenges across dual indications.",
  thumb: caseResearchThumb,
  thumbAlt: "Behavioural intelligence dashboard presentation",
  objective:
    "Map how dual-indication pathways operate across markets, identifying behavioural, structural, and reimbursement barriers shaping access and adoption.",
  techniques: [
    {
      title: "Behavioural Evidence Synthesis",
      body: "Structured audit of global and local data to define care pathways, system dynamics, and market variability.",
    },
    {
      title: "Behavioural Intelligence Modelling",
      body: "AI-supported behavioural coding to identify archetypes, decision drivers, and friction points across patient and HCP journeys.",
    },
  ],
  roleOfAi:
    "Enabled large-scale, multi-language analysis — accelerating transcription, data processing, and consistent identification of patterns across markets and pathways, enabling accurate behavioural coding to reveal archetypes.",
  deliverables:
    "Care pathway maps, friction heatmaps, audience archetypes, and strategic risk frameworks to guide market planning and intervention design.",
  impact: [
    "Revealed systemic barriers beyond clinical factors — including reimbursement gating, referral ambiguity, and capacity constraints — limiting progression and scale.",
  ],
  outcome:
    "Provided a clear behavioural foundation for launch, enabling markets to plan with confidence, prioritise interventions, and unlock real-world adoption.",
};

const case1: CaseStudyProps = {
  id: "case-1",
  badge: "TWO",
  metric: "Launch strategy validation",
  tags: ["Launch Strategy", "Global"],
  heroHeadline: "Validating strategy through patient lens of real-world experience",
  heroBody:
    "Clinical advantage doesn't always translate into perceived value. We analysed patient and physician perspectives to identify where the strategy works, where it creates friction, and what's needed to ensure adoption.",
  portrait: case1Portrait,
  portraitAlt: "Woman hiking in mountain landscape",
  ctaSubject: "Case Study Request — Launch Strategy",
  detailHeading: "Launch Strategy Optimisation / Validation",
  detailSub: "Translating behavioural insight into how global strategy lands in markets.",
  thumb: case5Thumb,
  thumbAlt: "Tablet showing behavioural analysis interface",
  objective:
    "Understand how global asthma strategy will be experienced in real-world settings, identifying where patient behaviour may accelerate or delay adoption.",
  techniques: launchTechniques,
  roleOfAi:
    "Accelerated pattern recognition across large, complex datasets, enabling structured behavioural analysis, rapid synthesis, and consistent identification of key intervention points.",
  deliverables:
    "Mitigation blueprint, behavioural insight framework, and two-stage workshops to align leadership and refine targeted intervention strategies.",
  impact: [
    "Revealed critical gaps between strategy assumptions and patient reality, including normalisation of symptoms and delayed escalation, shaping where strategy would succeed or stall.",
    "Aligned global and regional teams on priority actions, enabling focused investment to support adoption and unlock early growth.",
  ],
  outcome:
    "Strengthened strategy execution by ensuring it is behaviourally viable, not just clinically robust, across markets.",
};

const case2: CaseStudyProps = {
  id: "case-2",
  badge: "THREE",
  featured: true,
  metric: "Patient support blueprint",
  tags: ["Journey Mapping", "Global"],
  heroHeadline: "Designing patient support through real-world behaviour and experience",
  summary:
    "Journey mapping and behavioural modelling defined the support patients need to adopt and sustain home treatment with confidence.",
  heroBody:
    "Clinical pathways don't always reflect how patients live with treatment. We mapped patient behaviours, influences, and moments that matter to define where support is needed, where friction occurs, and how to enable confident adoption at home.",
  portrait: case2Portrait,
  portraitAlt: "Woman walking dog outdoors",
  ctaSubject: "Case Study Request — Journey Mapping",
  detailHeading: "Translating Journey Mapping and Behaviour Modelling",
  detailSub: "Designing patient support through real-world behaviour and experience.",
  thumb: case2Thumb,
  thumbAlt: "Person reading at home with cat",
  objective:
    "Enable the successful global launch of home self-injection for a rare disease treatment by understanding how patients and professionals behave across the treatment journey.",
  techniques: [
    {
      title: "Behavioural Evidence Synthesis",
      body: "Integration of secondary research, PSP materials, stakeholder inputs, and real-world journey data to define key moments, needs, and system dynamics.",
    },
    {
      title: "Behavioural Intelligence Modelling",
      body: "Mapping patient and HCP behaviours, influences, and decision points using behavioural frameworks, identifying moments that matter, barriers, and drivers across the journey.",
    },
  ],
  roleOfAi:
    "Structured analysis of complex behavioural data to identify patterns across patient types, treatment stages, and markets — enabling faster, more consistent modelling of journeys and intervention points.",
  deliverables:
    "End-to-end patient experience map, PSP touchpoint architecture, and engagement blueprint to guide, design, and brief the global patient support programme.",
  impact: [
    "Defined the critical moments and support needs required to transition patients from clinical to home administration — including training, confidence-building, and adherence support across cycles.",
    "Enabled alignment on how support should evolve from onboarding through to long-term independence.",
  ],
  outcome:
    "Delivered a behaviourally-led blueprint for patient support, ensuring the programme is built around how patients actually experience, adopt, and sustain treatment in real life.",
};

const caseOmni: CaseStudyProps = {
  id: "case-omni",
  badge: "FOUR",
  metric: "Behaviour-led omnichannel planning",
  tags: ["Experience Design", "EUR Region"],
  heroHeadline: "From behavioural insight to coordinated omnichannel planning in markets",
  heroBody:
    "Omnichannel strategies often connect channels, but not behaviour. We designed a behaviour-led approach to align insight, planning, and execution — so engagement reflects how customers actually think, decide, and act.",
  portrait: case4Portrait,
  portraitAlt: "Confident professional looking out a city window",
  ctaSubject: "Case Study Request — Omnichannel Engagement Design",
  detailHeading: "Omnichannel Engagement Design",
  detailSub:
    "Harnessing behavioural insight into coordinated, real-world engagement across channels, journeys, and markets.",
  thumb: case4Thumb,
  thumbAlt: "Omnichannel strategy whiteboard",
  objective:
    "Define and enable a future-fit omnichannel approach that translates global strategy into practical, market-ready engagement, grounded in real-world customer behaviour and decision-making.",
  techniques: [
    {
      title: "Behavioural Evidence Synthesis",
      body: "Benchmarking industry best practice and synthesising internal and external data to define what good looks like in omnichannel — across journeys, behaviours, and outcomes.",
    },
    {
      title: "Behavioural Intelligence Modelling",
      body: "Combining market interviews, behavioural frameworks (COM-B, TDF), and real-world data to identify the true drivers and barriers of how customers think, feel, and act.",
    },
  ],
  roleOfAi:
    "Analysis of large datasets and benchmarking inputs to identify patterns in behaviour, channel effectiveness, and engagement models — accelerating insight generation and enabling scalable planning frameworks.",
  deliverables:
    "Modular omnichannel blueprint including journey-led planning frameworks, channel orchestration models, and decision rules — supported by practical toolkits, templates, and a 12–24 month strategic roadmap.",
  impact: [
    "Shifted omnichannel from channel-led execution to behaviour-led engagement, enabling markets to prioritise high-impact activities and align investment to what drives real decision-making.",
    "Created clarity on how global strategy should be applied locally, reducing fragmentation and improving consistency across markets.",
  ],
  outcome:
    "Established a scalable, embedded omnichannel capability — helping teams plan around behaviour and journeys, execute with confidence, and continuously optimise performance over time.",
};

const caseCreative: CaseStudyProps = {
  id: "case-creative",
  badge: "FIVE",
  metric: "Creative launch platform",
  tags: ["Creative Activation", "EUR Region"],
  heroHeadline: "Using creative identity to achieve relevance in a new disease space",
  heroBody:
    "Entering a new mental health disease area across Europe, fragmented care pathways and inconsistent engagement meant reshaping how the condition is understood and managed — so patients and professionals recognise need, build confidence, and act.",
  portrait: case5Portrait,
  portraitAlt: "Person in orange raincoat looking up after rain",
  ctaSubject: "Case Study Request — Creative Activation",
  detailHeading: "LAUNCH: From insight to behaviour change activation",
  detailSub:
    "A creative platform that reframes limitation, builds belief, and inspires audiences to see what's possible.",
  thumb: case1Thumb,
  thumbAlt: "Creative campaign mood board",
  objective:
    "Enable successful entry into a new disease space by reshaping how cognitive limitation is understood — building belief, confidence, and recognition of patient potential.",
  techniques: [
    {
      title: "Behavioural Evidence Synthesis",
      body: "Integration of global research, patient narratives, and stakeholder insight to uncover how cognitive impairment is experienced, interpreted, and internalised in daily life.",
    },
    {
      title: "Behavioural Intelligence Modelling",
      body: "Mapping beliefs, perceptions, and emotional responses to identify how limitation shapes identity and where opportunity exists to reframe potential.",
    },
  ],
  roleOfAi:
    "AI-supported exploration of visual identity, tone, and narrative — accelerating the development of creative territories, imagery, and storytelling that bring the concept of human potential to life.",
  deliverables:
    "Creative identity platform, campaign territory, and experience framework — including visual language, narrative system, and content to support engagement across patient and HCP journeys.",
  impact: [
    "Reframed the condition from limitation to possibility, enabling patients and professionals to see beyond impairment and engage with a more optimistic, forward-looking narrative.",
    "Built confidence in a new disease space, supporting recognition, emotional connection, and readiness to act.",
  ],
  outcome:
    "Established a distinctive, scalable identity that anchors engagement — ensuring the launch is not only understood clinically, but felt, believed, and acted on in real life.",
};

const caseActivation: CaseStudyProps = {
  id: "case-activation",
  badge: "SEVEN",
  featured: true,
  metric: "Automated activation model",
  tags: ["Experience Design + Automated Activation", "EUR Region"],
  heroHeadline: "Using targeted profiling and personalised outreach to drive clinic growth",
  summary:
    "A behaviour-led activation model used peer proof, intelligent profiling, and personalised outreach to engage high-potential clinics at scale.",
  heroBody:
    "In a competitive aesthetics market, clinics are not persuaded by product claims alone. We designed a behaviour-led activation model that used peer proof, target profiling and automated personalisation to show high-potential clinics what partnership could help them achieve.",
  portrait: case7Portrait,
  portraitAlt: "Aesthetics professional with facial treatment markings",
  ctaSubject: "Case Study Request — Experience Design + Automated Activation",
  detailHeading: "Behaviour-led activation for aesthetics clinics",
  detailSub:
    "Peer proof, target profiling and automated personalisation to drive preference and growth.",
  thumb: case7Thumb,
  thumbAlt: "Modern aesthetics clinic interior",
  objective:
    "Create a scalable activation approach to identify and engage high-potential aesthetics clinics across Europe, encouraging them to preferentially select the client's products by demonstrating the value achieved by influential peer clinics.",
  techniques: [
    {
      title: "Behavioural Modelling Through Peer Influence",
      body: "Using social proof and behavioural modelling, the programme showcased credible aesthetics professionals already achieving strong outcomes with the client's products. Rather than asking clinics to believe a product claim, the approach showed what people like them were achieving in practice.",
    },
    {
      title: "Target Profiling + Personalised Activation",
      body: "High-potential clinics were identified by market, profile, influence and likely growth opportunity. Personalised data was then inserted into campaign templates to create tailored outreach that felt relevant to each clinic, while automation enabled rapid scale and repeated follow-up.",
    },
  ],
  roleOfAi:
    "AI supported high-potential target identification, lookalike audience generation and personalisation at scale. Clay enabled personalised data collection and integration, while n8n workflows supported repeated outreach, response capture and adaptive follow-up.",
  deliverables:
    "Automated activation programme including target profiling, market-specific prospect lists, personalised outreach templates, peer-led content journeys, tailored landing pages, influencer case examples and response workflows.",
  impact: [
    "Shifted activation from broad product promotion to targeted persuasion by example, helping clinics understand the value of partnership through peer success.",
    'Created a "peloton strategy" across markets, where a small group of credible aesthetics professionals led growth by showing what was possible and encouraging others to follow.',
  ],
  outcome:
    "Delivered a scalable personalised activation model designed to double the audience working with the client by replacing generic product push with persuasive peer-led proof, targeted data and automated outreach.",
};

const casePerformance: CaseStudyProps = {
  id: "case-performance",
  badge: "SIX",
  metric: "Continuous patient feedback system",
  tags: ["Performance Optimisation", "Ex-US"],
  heroHeadline: "Embedding continuous patient feedback into global medical affairs strategy",
  heroBody:
    "A global pharma sought to strengthen how patient perspective informed global and affiliate medical affairs activity — ensuring patient experience shaped strategic planning, evidence generation, engagement, and communication development across therapy areas.",
  portrait: case6Portrait,
  portraitAlt: "AI and growth neural network visualization",
  ctaSubject: "Case Study Request — Performance Optimisation",
  detailHeading: "Injecting patient PoV into strategic decision-making",
  detailSub:
    "Continuous feedback to refine involvement of patient perspective in planning across global and affiliate medical affairs teams.",
  thumb: case6Thumb,
  thumbAlt: "Patient feedback strategy materials",
  objective:
    "Enable global and affiliate medical affairs teams to systematically integrate patient perspectives into strategic planning, evidence generation, stakeholder engagement, and communication development.",
  techniques: [
    {
      title: "Behavioural Evidence Synthesis",
      body: "Integration of patient journeys, social listening, advisory inputs, real-world evidence, and patient-reported outcomes to understand how patient experience should shape medical strategy and communications.",
    },
    {
      title: "Behavioural Intelligence Modelling",
      body: "Mapping behavioural drivers, emotional needs, engagement gaps, and communication barriers to identify where teams can improve relevance, empathy, and impact.",
    },
  ],
  roleOfAi:
    "AI-supported analysis accelerated synthesis of feedback, behavioural themes, and communication patterns — enabling faster identification of optimisation opportunities across engagement activities and markets.",
  deliverables:
    "Patient-centric planning frameworks, behavioural feedback systems, patient journey tools, communication optimisation guidance, engagement templates, and scalable implementation playbooks for global and affiliate teams.",
  impact: [
    "Created a scalable framework for embedding patient-centric thinking into campaign preparation and medical affairs planning across markets.",
    "Enabled teams to continuously refine engagement approaches using evolving patient feedback and real-world behavioural insight.",
  ],
  outcome:
    "Established a continuous behavioural optimisation model that helps medical affairs teams improve strategic relevance, strengthen patient alignment, and evolve communications based on real-world experience over time.",
};

function Index() {
  useReveal();
  const cases = [
    caseResearch,
    case1,
    case2,
    caseOmni,
    caseCreative,
    casePerformance,
    caseActivation,
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="pt-16">
        <Hero />
        <ClientStrip />
        <About />
        <Expertise />
        <CaseStudies cases={cases} />
        <Capabilities />
        <DarkBar />
      </main>
    </div>
  );
}
