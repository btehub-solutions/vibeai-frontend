import React from 'react';

interface DiagramProps {
  className?: string;
}

// ===== COURSE 6: Generative AI =====

export const AnalyticalVsGenerativeDiagram: React.FC<DiagramProps> = ({ className }) => (
  <svg viewBox="0 0 800 350" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="350" rx="16" fill="#0a0f1a"/>
    <text x="400" y="35" fill="#00E5A0" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">ANALYTICAL AI vs. GENERATIVE AI</text>
    {/* Left - Analytical */}
    <text x="200" y="70" fill="#3B82F6" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">ANALYTICAL AI</text>
    <rect x="60" y="90" width="120" height="50" rx="8" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="1.5"/>
    <text x="120" y="115" fill="#93C5FD" fontSize="11" textAnchor="middle" fontFamily="system-ui">📸 Input</text>
    <text x="120" y="130" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="system-ui">(Image/Data)</text>
    <line x1="180" y1="115" x2="210" y2="115" stroke="#3B82F6" strokeWidth="2"/>
    <text x="195" y="108" fill="#3B82F6" fontSize="16" fontFamily="system-ui">→</text>
    <rect x="210" y="90" width="120" height="50" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="1"/>
    <text x="270" y="115" fill="#E2E8F0" fontSize="11" textAnchor="middle" fontFamily="system-ui">🧠 Model</text>
    <text x="270" y="130" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="system-ui">(Classify/Predict)</text>
    <text x="335" y="108" fill="#3B82F6" fontSize="16" fontFamily="system-ui">→</text>
    <rect x="210" y="160" width="120" height="40" rx="8" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2"/>
    <text x="270" y="185" fill="#93C5FD" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">"Cat" ✅</text>

    {/* Divider */}
    <line x1="400" y1="55" x2="400" y2="320" stroke="#334155" strokeWidth="1" strokeDasharray="6"/>

    {/* Right - Generative */}
    <text x="600" y="70" fill="#A855F7" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">GENERATIVE AI</text>
    <rect x="460" y="90" width="120" height="50" rx="8" fill="#A855F7" fillOpacity="0.15" stroke="#A855F7" strokeWidth="1.5"/>
    <text x="520" y="115" fill="#C4B5FD" fontSize="11" textAnchor="middle" fontFamily="system-ui">💬 Prompt</text>
    <text x="520" y="130" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="system-ui">"A cat on mars"</text>
    <text x="585" y="108" fill="#A855F7" fontSize="16" fontFamily="system-ui">→</text>
    <rect x="600" y="90" width="120" height="50" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="1"/>
    <text x="660" y="115" fill="#E2E8F0" fontSize="11" textAnchor="middle" fontFamily="system-ui">🎨 Model</text>
    <text x="660" y="130" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="system-ui">(Generate/Create)</text>
    <text x="725" y="108" fill="#A855F7" fontSize="16" fontFamily="system-ui">→</text>
    <rect x="590" y="160" width="140" height="90" rx="8" fill="#A855F7" fillOpacity="0.1" stroke="#A855F7" strokeWidth="2"/>
    <text x="660" y="195" fill="#C4B5FD" fontSize="24" textAnchor="middle">🖼️</text>
    <text x="660" y="220" fill="#C4B5FD" fontSize="10" textAnchor="middle" fontFamily="system-ui">NEW image created</text>
    <text x="660" y="240" fill="#A855F7" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">Never existed before!</text>

    {/* Bottom comparison */}
    <rect x="60" y="270" width="280" height="50" rx="8" fill="#3B82F6" fillOpacity="0.05" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.3"/>
    <text x="200" y="295" fill="#3B82F6" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">🔍 "Is there a cat in this image?"</text>
    <text x="200" y="312" fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="system-ui">Recognizes patterns in existing data</text>

    <rect x="460" y="270" width="280" height="50" rx="8" fill="#A855F7" fillOpacity="0.05" stroke="#A855F7" strokeWidth="1" strokeOpacity="0.3"/>
    <text x="600" y="295" fill="#A855F7" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">✨ "Create a cat riding a skateboard"</text>
    <text x="600" y="312" fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="system-ui">Creates entirely new data distributions</text>
  </svg>
);

export const GANDiagram: React.FC<DiagramProps> = ({ className }) => (
  <svg viewBox="0 0 800 350" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="350" rx="16" fill="#0a0f1a"/>
    <text x="400" y="35" fill="#00E5A0" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">GAN: GENERATOR vs. DISCRIMINATOR</text>
    {/* Noise input */}
    <rect x="30" y="140" width="100" height="50" rx="8" fill="#334155" stroke="#475569" strokeWidth="1"/>
    <text x="80" y="162" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="system-ui">🎲 Random</text>
    <text x="80" y="178" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="system-ui">Noise (z)</text>
    {/* Generator */}
    <line x1="130" y1="165" x2="170" y2="165" stroke="#A855F7" strokeWidth="2"/>
    <rect x="170" y="130" width="160" height="70" rx="12" fill="#A855F7" fillOpacity="0.12" stroke="#A855F7" strokeWidth="2"/>
    <text x="250" y="158" fill="#C4B5FD" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">🎨 GENERATOR</text>
    <text x="250" y="178" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="system-ui">Creates fake images</text>
    <text x="250" y="193" fill="#A855F7" fontSize="9" textAnchor="middle" fontFamily="system-ui">(trying to fool discriminator)</text>
    {/* Fake image */}
    <line x1="330" y1="165" x2="380" y2="165" stroke="#A855F7" strokeWidth="2"/>
    <rect x="380" y="145" width="50" height="40" rx="4" fill="#A855F7" fillOpacity="0.2" stroke="#A855F7" strokeWidth="1"/>
    <text x="405" y="170" fill="#C4B5FD" fontSize="14" textAnchor="middle">🖼️</text>
    {/* Discriminator */}
    <line x1="430" y1="165" x2="470" y2="165" stroke="#F59E0B" strokeWidth="2"/>
    <rect x="470" y="130" width="160" height="70" rx="12" fill="#F59E0B" fillOpacity="0.12" stroke="#F59E0B" strokeWidth="2"/>
    <text x="550" y="158" fill="#FCD34D" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">🔍 DISCRIMINATOR</text>
    <text x="550" y="178" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="system-ui">Real or Fake?</text>
    <text x="550" y="193" fill="#F59E0B" fontSize="9" textAnchor="middle" fontFamily="system-ui">(trying to detect fakes)</text>
    {/* Real data */}
    <rect x="470" y="60" width="160" height="40" rx="8" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeWidth="1"/>
    <text x="550" y="82" fill="#6EE7B7" fontSize="10" textAnchor="middle" fontFamily="system-ui">📷 Real Training Images</text>
    <line x1="550" y1="100" x2="550" y2="130" stroke="#10B981" strokeWidth="1.5"/>
    {/* Output */}
    <line x1="630" y1="165" x2="680" y2="140" stroke="#10B981" strokeWidth="1.5"/>
    <line x1="630" y1="165" x2="680" y2="190" stroke="#EF4444" strokeWidth="1.5"/>
    <text x="720" y="143" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="system-ui">REAL ✅</text>
    <text x="720" y="195" fill="#EF4444" fontSize="11" fontWeight="bold" fontFamily="system-ui">FAKE ❌</text>
    {/* Feedback loop */}
    <path d="M 550 200 C 550 280, 250 280, 250 200" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6" fill="none"/>
    <text x="400" y="290" fill="#F59E0B" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">🔄 ADVERSARIAL FEEDBACK LOOP</text>
    <text x="400" y="308" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="system-ui">Both improve until fakes are indistinguishable from reality</text>
  </svg>
);

export const DiffusionProcessDiagram: React.FC<DiagramProps> = ({ className }) => (
  <svg viewBox="0 0 800 380" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="380" rx="16" fill="#0a0f1a"/>
    <text x="400" y="35" fill="#00E5A0" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">DIFFUSION: FORWARD (NOISE) → REVERSE (DENOISE)</text>
    {/* Forward process */}
    <text x="400" y="68" fill="#EF4444" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">FORWARD PROCESS (Adding Noise) →</text>
    {['🐕 Clear', '🐕 Noisy', '▓ Grainy', '░ Static', '⬜ Pure Noise'].map((label, i) => (
      <g key={i}>
        <rect x={60 + i * 145} y={85} width="120" height="80" rx="8" 
          fill={`rgba(239, 68, 68, ${0.05 + i * 0.04})`} 
          stroke="#EF4444" strokeWidth="1" strokeOpacity={0.3 + i * 0.15}/>
        <text x={120 + i * 145} y="130" fill="#E2E8F0" fontSize="20" textAnchor="middle">
          {['🐕', '🐕', '▓▓', '░░', '⬜'][i]}
        </text>
        <text x={120 + i * 145} y="155" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="system-ui">
          {label.split(' ')[1] || label.split(' ')[0]}
        </text>
        {i < 4 && <text x={185 + i * 145} y="125" fill="#EF4444" fontSize="16">→</text>}
      </g>
    ))}
    {/* Divider */}
    <line x1="60" y1="195" x2="740" y2="195" stroke="#334155" strokeWidth="1" strokeDasharray="6"/>
    {/* Reverse process */}
    <text x="400" y="225" fill="#00E5A0" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">← REVERSE PROCESS (Denoising with Text Conditioning)</text>
    {['⬜ Noise', '░ Shape', '▓ Detail', '🐕 Sharp', '🐕 HD Result'].map((label, i) => (
      <g key={i}>
        <rect x={60 + i * 145} y={240} width="120" height="80" rx="8" 
          fill={`rgba(0, 229, 160, ${0.05 + i * 0.04})`}
          stroke="#00E5A0" strokeWidth="1" strokeOpacity={0.3 + i * 0.15}/>
        <text x={120 + i * 145} y="285" fill="#E2E8F0" fontSize="20" textAnchor="middle">
          {['⬜', '░░', '▓▓', '🐕', '🐕'][i]}
        </text>
        <text x={120 + i * 145} y="310" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="system-ui">
          {label.split(' ')[1] || label.split(' ')[0]}
        </text>
        {i < 4 && <text x={185 + i * 145} y="280" fill="#00E5A0" fontSize="16">→</text>}
      </g>
    ))}
    {/* Text conditioning */}
    <rect x="280" y="340" width="240" height="28" rx="6" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="1"/>
    <text x="400" y="359" fill="#C4B5FD" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">📝 Text: "A golden retriever in sunlight"</text>
  </svg>
);

export const ControlNetDiagram: React.FC<DiagramProps> = ({ className }) => (
  <svg viewBox="0 0 800 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="300" rx="16" fill="#0a0f1a"/>
    <text x="400" y="35" fill="#00E5A0" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">CONTROLNET: STRUCTURAL CONTROL PIPELINE</text>
    {/* Source photo */}
    <rect x="30" y="70" width="160" height="120" rx="10" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="1.5"/>
    <text x="110" y="120" fill="#E2E8F0" fontSize="30" textAnchor="middle">🕺</text>
    <text x="110" y="150" fill="#93C5FD" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">Source Photo</text>
    <text x="110" y="165" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="system-ui">(Man dancing)</text>
    {/* Arrow */}
    <text x="210" y="130" fill="#3B82F6" fontSize="20">→</text>
    {/* Skeleton */}
    <rect x="240" y="70" width="160" height="120" rx="10" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="1.5"/>
    <text x="320" y="120" fill="#E2E8F0" fontSize="30" textAnchor="middle">💀</text>
    <text x="320" y="150" fill="#FCD34D" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">OpenPose Skeleton</text>
    <text x="320" y="165" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="system-ui">(Extracted pose)</text>
    {/* Arrow + text prompt */}
    <text x="420" y="115" fill="#F59E0B" fontSize="20">→</text>
    <rect x="415" y="140" width="130" height="30" rx="6" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="1"/>
    <text x="480" y="160" fill="#C4B5FD" fontSize="9" textAnchor="middle" fontFamily="system-ui">+ "An astronaut"</text>
    {/* ControlNet box */}
    <rect x="440" y="70" width="160" height="50" rx="10" fill="#00E5A0" fillOpacity="0.12" stroke="#00E5A0" strokeWidth="2"/>
    <text x="520" y="95" fill="#00E5A0" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">🔧 ControlNet</text>
    <text x="520" y="110" fill="#6EE7B7" fontSize="9" textAnchor="middle" fontFamily="system-ui">Structural Constraint</text>
    {/* Arrow */}
    <text x="620" y="130" fill="#00E5A0" fontSize="20">→</text>
    {/* Result */}
    <rect x="640" y="70" width="140" height="120" rx="10" fill="#00E5A0" fillOpacity="0.1" stroke="#00E5A0" strokeWidth="2"/>
    <text x="710" y="120" fill="#E2E8F0" fontSize="30" textAnchor="middle">🧑‍🚀</text>
    <text x="710" y="150" fill="#00E5A0" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">AI Output</text>
    <text x="710" y="165" fill="#6EE7B7" fontSize="9" textAnchor="middle" fontFamily="system-ui">(Same pose, new subject!)</text>
    {/* Bottom note */}
    <rect x="150" y="220" width="500" height="55" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="1"/>
    <text x="400" y="243" fill="#E2E8F0" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">Other ControlNet modes:</text>
    <text x="400" y="262" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="system-ui">🖊️ Canny Edge (Outlines) · 🎨 Lineart (Sketches) · 📐 Depth Map (3D perspective)</text>
  </svg>
);

export const VideoWorkflowDiagram: React.FC<DiagramProps> = ({ className }) => (
  <svg viewBox="0 0 800 280" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="280" rx="16" fill="#0a0f1a"/>
    <text x="400" y="35" fill="#00E5A0" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">AI VIDEO GENERATION WORKFLOW</text>
    {/* Pipeline blocks */}
    {[
      { x: 30, label: '📝 Text Prompt', sub: 'or Midjourney Image', color: '#8B5CF6' },
      { x: 195, label: '⬆️ Upscaler', sub: '4K Enhancement', color: '#3B82F6' },
      { x: 360, label: '🎬 Video Model', sub: 'Runway / Sora', color: '#00E5A0' },
      { x: 525, label: '🎥 Motion Data', sub: 'Camera + Physics', color: '#F59E0B' },
      { x: 660, label: '✅ Final MP4', sub: '60fps Output', color: '#10B981' },
    ].map((block, i) => (
      <g key={i}>
        <rect x={block.x} y={70} width="140" height="70" rx="10" fill={block.color} fillOpacity="0.1" stroke={block.color} strokeWidth="1.5"/>
        <text x={block.x + 70} y={100} fill={block.color} fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">{block.label}</text>
        <text x={block.x + 70} y={118} fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="system-ui">{block.sub}</text>
        {i < 4 && <text x={block.x + 155} y={105} fill="#64748B" fontSize="18">→</text>}
      </g>
    ))}
    {/* Challenges section */}
    <text x="400" y="175" fill="#F59E0B" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">⚠️ Current Challenges in AI Video:</text>
    {[
      { x: 80, label: '⏱️ Temporal Consistency', desc: 'Objects change shape over time' },
      { x: 310, label: '🌊 Physics Hallucination', desc: 'No real physics engine underneath' },
      { x: 540, label: '🔀 Morphing/Flickering', desc: 'Background elements disappear' },
    ].map((item, i) => (
      <g key={i}>
        <rect x={item.x} y={195} width="210" height="55" rx="8" fill="#EF4444" fillOpacity="0.05" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.3"/>
        <text x={item.x + 105} y={218} fill="#FCA5A5" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">{item.label}</text>
        <text x={item.x + 105} y={238} fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="system-ui">{item.desc}</text>
      </g>
    ))}
  </svg>
);

// ===== Mapping descriptions to SVG components =====
export const svgDiagramMap2: Record<string, React.FC<DiagramProps>> = {
  // Course 6
  "analytical ai classification generative ai noise prompt new image": AnalyticalVsGenerativeDiagram,
  "gan architecture generator discriminator looping training cycle": GANDiagram,
  "5 panels forward diffusion process clear photo noisier pure static": DiffusionProcessDiagram,
  "u-net architecture latent space compression stable diffusion": DiffusionProcessDiagram,
  "controlnet openpose source photograph stick figure skeleton astronaut": ControlNetDiagram,
  "comfyui node-based diagram routing text prompt k-sampler": ControlNetDiagram,
  "midjourney generations cinematic 35mm photography": ControlNetDiagram,
  "workflow graphic midjourney image upscaler runway image-to-video": VideoWorkflowDiagram,
  "split frame physics hallucination ai-generated person glass water morphing": VideoWorkflowDiagram,
  "elevenlabs generation interface voice setting sliders stability similarity": VideoWorkflowDiagram,
};

export function findSvgDiagram2(description: string): React.FC<DiagramProps> | null {
  const normalizedDesc = description.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  
  let bestMatch: React.FC<DiagramProps> | null = null;
  let bestScore = 0;
  
  for (const [key, component] of Object.entries(svgDiagramMap2)) {
    const keyWords = key.split(/\s+/).filter(w => w.length > 2);
    const matchCount = keyWords.filter(w => normalizedDesc.includes(w)).length;
    const matchRatio = matchCount / keyWords.length;
    
    if (matchRatio > bestScore && matchRatio > 0.4) {
      bestScore = matchRatio;
      bestMatch = component;
    }
  }
  
  return bestMatch;
}
