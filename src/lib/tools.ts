export type Tool = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  website: string;
  icon: string;
  categories: string[];
  useCases: string[];
  targetUsers: string[];
  pricingModel: 'free' | 'freemium' | 'paid' | 'open_source';
  hasFreeTier: boolean;
  startingPriceUsd: number;
  apiAvailable: boolean;
  selfHostable: boolean;
  localRun: boolean;
  dockerSupport: boolean;
  ollamaSupport: boolean;
  openSource: boolean;
  githubUrl?: string;
  githubStars?: number;
  licenseType?: string;
  ossHealthScore: number;
  commitFrequency: 'daily' | 'weekly' | 'monthly' | 'inactive';
  wrapperDepthScore: number;
  trustScore: number;
  affiliateRisk: boolean;
  privacyScore: 'high' | 'medium' | 'low';
  gdprCompliant: boolean;
  dataStored: boolean;
  trainsOnData: boolean;
  matchScore?: number;
  trustWarnings?: string[];
  escapeFrom?: string[];
  monthlyCostUsd?: number;
};

export const tools: Tool[] = [
  {
    id: '1', slug: 'chatgpt', name: 'ChatGPT', icon: '💬',
    tagline: 'OpenAI\'nin güçlü dil modeli. En yaygın AI asistan.',
    website: 'https://chat.openai.com',
    categories: ['chatbot'], useCases: ['writing','coding','research'],
    targetUsers: ['normal','creator','developer','startup','enterprise'],
    pricingModel: 'freemium', hasFreeTier: true, startingPriceUsd: 20,
    apiAvailable: true, selfHostable: false, localRun: false, dockerSupport: false, ollamaSupport: false,
    openSource: false, ossHealthScore: 0, commitFrequency: 'daily',
    wrapperDepthScore: 95, trustScore: 82, affiliateRisk: false,
    privacyScore: 'medium', gdprCompliant: true, dataStored: true, trainsOnData: true,
    monthlyCostUsd: 20, escapeFrom: ['openai'],
  },
  {
    id: '2', slug: 'open-webui', name: 'Open WebUI', icon: '🌐',
    tagline: 'Self-hostable ChatGPT arayüzü — Ollama ile yerel çalışır, tamamen ücretsiz.',
    website: 'https://openwebui.com',
    categories: ['chatbot'], useCases: ['writing','coding','research'],
    targetUsers: ['developer','startup','enterprise'],
    pricingModel: 'open_source', hasFreeTier: true, startingPriceUsd: 0,
    apiAvailable: true, selfHostable: true, localRun: true, dockerSupport: true, ollamaSupport: true,
    openSource: true, githubUrl: 'https://github.com/open-webui/open-webui', githubStars: 52000,
    licenseType: 'MIT', ossHealthScore: 91, commitFrequency: 'daily',
    wrapperDepthScore: 88, trustScore: 90, affiliateRisk: false,
    privacyScore: 'high', gdprCompliant: true, dataStored: false, trainsOnData: false,
    monthlyCostUsd: 0, matchScore: 91,
  },
  {
    id: '3', slug: 'librechat', name: 'LibreChat', icon: '🗨️',
    tagline: 'Çoklu model desteği, OpenAI API uyumlu, self-host.',
    website: 'https://librechat.ai',
    categories: ['chatbot'], useCases: ['writing','coding','research'],
    targetUsers: ['developer','startup'],
    pricingModel: 'open_source', hasFreeTier: true, startingPriceUsd: 0,
    apiAvailable: true, selfHostable: true, localRun: true, dockerSupport: true, ollamaSupport: true,
    openSource: true, githubUrl: 'https://github.com/danny-avila/LibreChat', githubStars: 20000,
    licenseType: 'MIT', ossHealthScore: 85, commitFrequency: 'daily',
    wrapperDepthScore: 82, trustScore: 88, affiliateRisk: false,
    privacyScore: 'high', gdprCompliant: true, dataStored: false, trainsOnData: false,
    monthlyCostUsd: 0, matchScore: 87,
  },
  {
    id: '4', slug: 'jan', name: 'Jan', icon: '🦙',
    tagline: 'Tamamen offline çalışan local LLM uygulaması. Privacy-first.',
    website: 'https://jan.ai',
    categories: ['chatbot'], useCases: ['writing','research'],
    targetUsers: ['normal','developer'],
    pricingModel: 'open_source', hasFreeTier: true, startingPriceUsd: 0,
    apiAvailable: true, selfHostable: false, localRun: true, dockerSupport: false, ollamaSupport: false,
    openSource: true, githubUrl: 'https://github.com/janhq/jan', githubStars: 24000,
    licenseType: 'AGPL', ossHealthScore: 83, commitFrequency: 'daily',
    wrapperDepthScore: 85, trustScore: 92, affiliateRisk: false,
    privacyScore: 'high', gdprCompliant: true, dataStored: false, trainsOnData: false,
    monthlyCostUsd: 0, matchScore: 84,
  },
  {
    id: '5', slug: 'cursor', name: 'Cursor', icon: '⌨️',
    tagline: 'AI destekli kod editörü. GitHub Copilot\'tan daha akıllı.',
    website: 'https://cursor.sh',
    categories: ['coding'], useCases: ['coding'],
    targetUsers: ['developer','startup'],
    pricingModel: 'freemium', hasFreeTier: true, startingPriceUsd: 20,
    apiAvailable: false, selfHostable: false, localRun: false, dockerSupport: false, ollamaSupport: false,
    openSource: false, ossHealthScore: 0, commitFrequency: 'daily',
    wrapperDepthScore: 70, trustScore: 75, affiliateRisk: false,
    privacyScore: 'medium', gdprCompliant: false, dataStored: true, trainsOnData: false,
    monthlyCostUsd: 20, escapeFrom: ['cursor'],
    trustWarnings: ['Kapalı kaynak', 'Veriler sunucuda işleniyor'],
  },
  {
    id: '6', slug: 'continue-dev', name: 'Continue.dev', icon: '🔧',
    tagline: 'VS Code ve JetBrains için açık kaynak AI coding asistanı.',
    website: 'https://continue.dev',
    categories: ['coding'], useCases: ['coding'],
    targetUsers: ['developer'],
    pricingModel: 'open_source', hasFreeTier: true, startingPriceUsd: 0,
    apiAvailable: true, selfHostable: true, localRun: true, dockerSupport: false, ollamaSupport: true,
    openSource: true, githubUrl: 'https://github.com/continuedev/continue', githubStars: 21000,
    licenseType: 'Apache-2.0', ossHealthScore: 88, commitFrequency: 'daily',
    wrapperDepthScore: 90, trustScore: 91, affiliateRisk: false,
    privacyScore: 'high', gdprCompliant: true, dataStored: false, trainsOnData: false,
    monthlyCostUsd: 0, matchScore: 89,
  },
  {
    id: '7', slug: 'cline', name: 'Cline', icon: '🤖',
    tagline: 'VS Code için AI coding agent. Çoklu model desteği.',
    website: 'https://github.com/cline/cline',
    categories: ['coding'], useCases: ['coding'],
    targetUsers: ['developer'],
    pricingModel: 'open_source', hasFreeTier: true, startingPriceUsd: 0,
    apiAvailable: true, selfHostable: true, localRun: true, dockerSupport: false, ollamaSupport: true,
    openSource: true, githubUrl: 'https://github.com/cline/cline', githubStars: 30000,
    licenseType: 'Apache-2.0', ossHealthScore: 87, commitFrequency: 'daily',
    wrapperDepthScore: 88, trustScore: 89, affiliateRisk: false,
    privacyScore: 'high', gdprCompliant: true, dataStored: false, trainsOnData: false,
    monthlyCostUsd: 0, matchScore: 83,
  },
  {
    id: '8', slug: 'midjourney', name: 'Midjourney', icon: '🎨',
    tagline: 'En güçlü AI görsel üretici. Discord üzerinden kullanılıyor.',
    website: 'https://midjourney.com',
    categories: ['image'], useCases: ['design'],
    targetUsers: ['creator','normal'],
    pricingModel: 'paid', hasFreeTier: false, startingPriceUsd: 10,
    apiAvailable: false, selfHostable: false, localRun: false, dockerSupport: false, ollamaSupport: false,
    openSource: false, ossHealthScore: 0, commitFrequency: 'weekly',
    wrapperDepthScore: 80, trustScore: 78, affiliateRisk: false,
    privacyScore: 'low', gdprCompliant: false, dataStored: true, trainsOnData: true,
    monthlyCostUsd: 10, escapeFrom: ['adobe','midjourney'],
    trustWarnings: ['Ücretsiz katman yok', 'Verilerle model eğitiliyor', 'Discord bağımlılığı'],
  },
  {
    id: '9', slug: 'stable-diffusion', name: 'Stable Diffusion', icon: '🖼️',
    tagline: 'Açık kaynak görsel üretimi. Yerel çalışır, sınırsız üretim.',
    website: 'https://stability.ai',
    categories: ['image'], useCases: ['design'],
    targetUsers: ['creator','developer'],
    pricingModel: 'open_source', hasFreeTier: true, startingPriceUsd: 0,
    apiAvailable: true, selfHostable: true, localRun: true, dockerSupport: true, ollamaSupport: false,
    openSource: true, githubUrl: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui', githubStars: 145000,
    licenseType: 'AGPL', ossHealthScore: 82, commitFrequency: 'weekly',
    wrapperDepthScore: 95, trustScore: 88, affiliateRisk: false,
    privacyScore: 'high', gdprCompliant: true, dataStored: false, trainsOnData: false,
    monthlyCostUsd: 0, matchScore: 88,
  },
  {
    id: '10', slug: 'flux', name: 'Flux', icon: '⚡',
    tagline: 'Yeni nesil açık kaynak görsel modeli. Kalite çok yüksek.',
    website: 'https://blackforestlabs.ai',
    categories: ['image'], useCases: ['design'],
    targetUsers: ['creator','developer'],
    pricingModel: 'freemium', hasFreeTier: true, startingPriceUsd: 0,
    apiAvailable: true, selfHostable: true, localRun: true, dockerSupport: true, ollamaSupport: false,
    openSource: true, githubUrl: 'https://github.com/black-forest-labs/flux', githubStars: 19000,
    licenseType: 'Apache-2.0', ossHealthScore: 85, commitFrequency: 'weekly',
    wrapperDepthScore: 92, trustScore: 86, affiliateRisk: false,
    privacyScore: 'high', gdprCompliant: true, dataStored: false, trainsOnData: false,
    monthlyCostUsd: 0, matchScore: 85,
  },
  {
    id: '11', slug: 'notion-ai', name: 'Notion AI', icon: '📓',
    tagline: 'Notion\'un yapay zeka eklentisi. Yazma ve özetleme.',
    website: 'https://notion.so',
    categories: ['writing','productivity'], useCases: ['writing','research'],
    targetUsers: ['normal','creator','startup'],
    pricingModel: 'freemium', hasFreeTier: false, startingPriceUsd: 10,
    apiAvailable: false, selfHostable: false, localRun: false, dockerSupport: false, ollamaSupport: false,
    openSource: false, ossHealthScore: 0, commitFrequency: 'weekly',
    wrapperDepthScore: 55, trustScore: 70, affiliateRisk: true,
    privacyScore: 'low', gdprCompliant: true, dataStored: true, trainsOnData: false,
    monthlyCostUsd: 10, escapeFrom: ['notion'],
    trustWarnings: ['İnce wrapper (GPT-4 üstü)', 'Ek ücret gerekli', 'Vendor lock-in riski'],
  },
  {
    id: '12', slug: 'obsidian', name: 'Obsidian', icon: '💎',
    tagline: 'Yerel not alma uygulaması. AI eklentileri ile güçlenir.',
    website: 'https://obsidian.md',
    categories: ['writing','productivity'], useCases: ['writing','research'],
    targetUsers: ['normal','creator','developer'],
    pricingModel: 'freemium', hasFreeTier: true, startingPriceUsd: 0,
    apiAvailable: false, selfHostable: false, localRun: true, dockerSupport: false, ollamaSupport: false,
    openSource: false, githubStars: 0, ossHealthScore: 75, commitFrequency: 'monthly',
    wrapperDepthScore: 80, trustScore: 85, affiliateRisk: false,
    privacyScore: 'high', gdprCompliant: true, dataStored: false, trainsOnData: false,
    monthlyCostUsd: 0, matchScore: 82,
  },
  {
    id: '13', slug: 'github-copilot', name: 'GitHub Copilot', icon: '🐙',
    tagline: 'GitHub\'ın AI kod tamamlayıcısı. Editor\'lara entegre.',
    website: 'https://github.com/features/copilot',
    categories: ['coding'], useCases: ['coding'],
    targetUsers: ['developer'],
    pricingModel: 'paid', hasFreeTier: true, startingPriceUsd: 10,
    apiAvailable: false, selfHostable: false, localRun: false, dockerSupport: false, ollamaSupport: false,
    openSource: false, ossHealthScore: 0, commitFrequency: 'daily',
    wrapperDepthScore: 65, trustScore: 72, affiliateRisk: false,
    privacyScore: 'medium', gdprCompliant: true, dataStored: true, trainsOnData: false,
    monthlyCostUsd: 10, escapeFrom: ['github'],
    trustWarnings: ['Microsoft/OpenAI bağımlılığı', 'Kod verileriniz buluta gider'],
  },
  {
    id: '14', slug: 'aider', name: 'Aider', icon: '💡',
    tagline: 'Terminal tabanlı AI coding asistanı. Git entegrasyonu.',
    website: 'https://aider.chat',
    categories: ['coding'], useCases: ['coding'],
    targetUsers: ['developer'],
    pricingModel: 'open_source', hasFreeTier: true, startingPriceUsd: 0,
    apiAvailable: true, selfHostable: true, localRun: true, dockerSupport: false, ollamaSupport: true,
    openSource: true, githubUrl: 'https://github.com/paul-gauthier/aider', githubStars: 23000,
    licenseType: 'Apache-2.0', ossHealthScore: 84, commitFrequency: 'daily',
    wrapperDepthScore: 86, trustScore: 90, affiliateRisk: false,
    privacyScore: 'high', gdprCompliant: true, dataStored: false, trainsOnData: false,
    monthlyCostUsd: 0, matchScore: 80,
  },
  {
    id: '15', slug: 'elevenlabs', name: 'ElevenLabs', icon: '🎙️',
    tagline: 'En gerçekçi AI ses klonlama ve metin-konuşma.',
    website: 'https://elevenlabs.io',
    categories: ['audio'], useCases: ['voiceover'],
    targetUsers: ['creator','startup'],
    pricingModel: 'freemium', hasFreeTier: true, startingPriceUsd: 5,
    apiAvailable: true, selfHostable: false, localRun: false, dockerSupport: false, ollamaSupport: false,
    openSource: false, ossHealthScore: 0, commitFrequency: 'daily',
    wrapperDepthScore: 85, trustScore: 78, affiliateRisk: true,
    privacyScore: 'medium', gdprCompliant: true, dataStored: true, trainsOnData: false,
    monthlyCostUsd: 5, escapeFrom: ['elevenlabs'],
  },
  {
    id: '16', slug: 'coqui-tts', name: 'Coqui TTS', icon: '🐸',
    tagline: 'Açık kaynak metin-konuşma. Yerel çalışır, ücretsiz.',
    website: 'https://coqui.ai',
    categories: ['audio'], useCases: ['voiceover'],
    targetUsers: ['developer','creator'],
    pricingModel: 'open_source', hasFreeTier: true, startingPriceUsd: 0,
    apiAvailable: true, selfHostable: true, localRun: true, dockerSupport: true, ollamaSupport: false,
    openSource: true, githubUrl: 'https://github.com/coqui-ai/TTS', githubStars: 37000,
    licenseType: 'MPL-2.0', ossHealthScore: 72, commitFrequency: 'monthly',
    wrapperDepthScore: 90, trustScore: 85, affiliateRisk: false,
    privacyScore: 'high', gdprCompliant: true, dataStored: false, trainsOnData: false,
    monthlyCostUsd: 0, matchScore: 76,
    trustWarnings: ['Geliştirme yavaşladı — aylık commit'],
  },
  {
    id: '17', slug: 'zapier', name: 'Zapier', icon: '⚡',
    tagline: 'No-code otomasyon platformu. 5000+ uygulama entegrasyonu.',
    website: 'https://zapier.com',
    categories: ['automation'], useCases: ['automation'],
    targetUsers: ['normal','startup','enterprise'],
    pricingModel: 'freemium', hasFreeTier: true, startingPriceUsd: 20,
    apiAvailable: true, selfHostable: false, localRun: false, dockerSupport: false, ollamaSupport: false,
    openSource: false, ossHealthScore: 0, commitFrequency: 'daily',
    wrapperDepthScore: 70, trustScore: 72, affiliateRisk: true,
    privacyScore: 'medium', gdprCompliant: true, dataStored: true, trainsOnData: false,
    monthlyCostUsd: 20, escapeFrom: ['zapier'],
    trustWarnings: ['Pahalı büyüme eğrisi', 'Veri üçüncü taraflardan geçer'],
  },
  {
    id: '18', slug: 'n8n', name: 'n8n', icon: '🔄',
    tagline: 'Self-hostable workflow otomasyonu. Zapier alternatifi, açık kaynak.',
    website: 'https://n8n.io',
    categories: ['automation'], useCases: ['automation'],
    targetUsers: ['developer','startup'],
    pricingModel: 'open_source', hasFreeTier: true, startingPriceUsd: 0,
    apiAvailable: true, selfHostable: true, localRun: false, dockerSupport: true, ollamaSupport: false,
    openSource: true, githubUrl: 'https://github.com/n8n-io/n8n', githubStars: 48000,
    licenseType: 'Apache-2.0', ossHealthScore: 90, commitFrequency: 'daily',
    wrapperDepthScore: 88, trustScore: 87, affiliateRisk: false,
    privacyScore: 'high', gdprCompliant: true, dataStored: false, trainsOnData: false,
    monthlyCostUsd: 0, matchScore: 90,
  },
  {
    id: '19', slug: 'adobe-firefly', name: 'Adobe Firefly', icon: '🦋',
    tagline: 'Adobe\'nin AI görsel aracı. Creative Cloud entegreli.',
    website: 'https://firefly.adobe.com',
    categories: ['image'], useCases: ['design'],
    targetUsers: ['creator'],
    pricingModel: 'freemium', hasFreeTier: true, startingPriceUsd: 5,
    apiAvailable: false, selfHostable: false, localRun: false, dockerSupport: false, ollamaSupport: false,
    openSource: false, ossHealthScore: 0, commitFrequency: 'daily',
    wrapperDepthScore: 75, trustScore: 70, affiliateRisk: false,
    privacyScore: 'low', gdprCompliant: true, dataStored: true, trainsOnData: true,
    monthlyCostUsd: 5, escapeFrom: ['adobe'],
    trustWarnings: ['Creative Cloud bağımlılığı', 'Verilerle model eğitilir'],
  },
  {
    id: '20', slug: 'comfyui', name: 'ComfyUI', icon: '🎛️',
    tagline: 'Node tabanlı SD arayüzü. Tam kontrol, yerel çalışır.',
    website: 'https://github.com/comfyanonymous/ComfyUI',
    categories: ['image'], useCases: ['design'],
    targetUsers: ['creator','developer'],
    pricingModel: 'open_source', hasFreeTier: true, startingPriceUsd: 0,
    apiAvailable: true, selfHostable: true, localRun: true, dockerSupport: true, ollamaSupport: false,
    openSource: true, githubUrl: 'https://github.com/comfyanonymous/ComfyUI', githubStars: 61000,
    licenseType: 'GPL', ossHealthScore: 88, commitFrequency: 'daily',
    wrapperDepthScore: 95, trustScore: 92, affiliateRisk: false,
    privacyScore: 'high', gdprCompliant: true, dataStored: false, trainsOnData: false,
    monthlyCostUsd: 0, matchScore: 82,
  },
];

export const stackPresets = [
  {
    id: 'student',
    name: 'Öğrenci Stack',
    icon: '🎓',
    description: 'Sıfır bütçeyle maksimum güç. Tüm araçlar ücretsiz.',
    totalMonthlyCost: 0,
    tools: ['open-webui', 'continue-dev', 'stable-diffusion', 'obsidian', 'n8n'],
  },
  {
    id: 'solo-founder',
    name: 'Solo Kurucu Stack',
    icon: '🚀',
    description: 'Tek başına bir şirket gibi çalış. Minimum maliyet, maksimum verim.',
    totalMonthlyCost: 5,
    tools: ['open-webui', 'cursor', 'flux', 'n8n', 'obsidian'],
  },
  {
    id: 'youtube-automation',
    name: 'YouTube Otomasyon Stack',
    icon: '🎬',
    description: 'Script, ses, görsel — hepsini AI ile otomatize et.',
    totalMonthlyCost: 0,
    tools: ['open-webui', 'coqui-tts', 'stable-diffusion', 'n8n'],
  },
  {
    id: 'privacy-first',
    name: 'Privacy-First Stack',
    icon: '🔒',
    description: 'Hiçbir verin buluta gitmesin. Tamamen yerel, tamamen özgür.',
    totalMonthlyCost: 0,
    tools: ['jan', 'aider', 'stable-diffusion', 'obsidian'],
  },
  {
    id: 'low-end-laptop',
    name: 'Düşük Donanım Stack',
    icon: '💻',
    description: 'Eski veya zayıf bilgisayarda bile çalışır.',
    totalMonthlyCost: 0,
    tools: ['open-webui', 'continue-dev', 'obsidian'],
  },
];

export const escapeModes = [
  { id: 'openai', name: 'Escape OpenAI', icon: '🏴', color: '#6366F1', fromCost: 72, toCost: 3 },
  { id: 'adobe', name: 'Escape Adobe', icon: '🎨', color: '#E85D4A', fromCost: 55, toCost: 0 },
  { id: 'zapier', name: 'Escape Zapier', icon: '⚡', color: '#F59E0B', fromCost: 50, toCost: 0 },
  { id: 'notion', name: 'Escape Notion', icon: '📓', color: '#18181B', fromCost: 20, toCost: 0 },
  { id: 'github', name: 'Escape GitHub Copilot', icon: '🐙', color: '#374151', fromCost: 10, toCost: 0 },
];

export function getAlternatives(slug: string, limit = 5): Tool[] {
  const source = tools.find(t => t.slug === slug);
  if (!source) return [];
  return tools
    .filter(t => t.slug !== slug && t.categories.some(c => source.categories.includes(c)))
    .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
    .slice(0, limit);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.tagline.toLowerCase().includes(q) ||
    t.categories.some(c => c.includes(q)) ||
    t.useCases.some(u => u.includes(q))
  );
}
