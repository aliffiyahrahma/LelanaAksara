import React from 'react';

function detectRole(speaker = '', character = '') {
  const s = speaker.toLowerCase();
  const c = String(character || '');

  // Cek berdasarkan nama pembicara terlebih dahulu
  if (s.includes('narasi') || s.includes('narrator') || (!c && !s)) return 'narasi';
  if (s.includes('rara') || s.includes('kembang') || s.includes('putri') || s.includes('dewi')) return 'putri';
  if (s.includes('pangeran') || s.includes('kalang') || s.includes('joko') || s.includes('raden') || s.includes('patih') || s.includes('lembu')) return 'pangeran';
  if (s.includes('adipati') || s.includes('raja') || s.includes('prabu') || s.includes('sultan') || s.includes('betak')) return 'raja';
  if (s.includes('ibu') || s.includes('mbok') || s.includes('nyai') || s.includes('dayang')) return 'ibu';
  if (s.includes('pertapa') || s.includes('resi') || s.includes('kyai') || s.includes('begawan')) return 'pertapa';

  // Cadangan berdasarkan emoji
  if (c.includes('👸') || c.includes('👩')) return 'putri';
  if (c.includes('👑')) return 'raja';
  if (c.includes('🤴') || c.includes('🧑') || c.includes('⚔️') || c.includes('🛡️')) return 'pangeran';
  if (c.includes('👵')) return 'ibu';
  if (c.includes('🧙') || c.includes('👴')) return 'pertapa';

  return c ? 'pangeran' : 'narasi';
}

export default function CharacterAvatar({ speaker, character }) {
  const role = detectRole(speaker, character);

  if (role === 'narasi') {
    return null;
  }

  return (
    <div className="relative flex flex-col items-center select-none animate-scene">
      {/* Cahaya lembut di belakang karakter */}
      <div className="pointer-events-none absolute bottom-2 h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-amber-300/25 blur-2xl" />

      <svg
        viewBox="0 0 220 220"
        className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_14px_24px_rgba(15,23,42,0.35)]"
      >
        <defs>
          <linearGradient id="skinTone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAD2B4" />
            <stop offset="100%" stopColor="#EBB48D" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="royalMaroon" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#991B1B" />
            <stop offset="100%" stopColor="#450A0A" />
          </linearGradient>
          <linearGradient id="kebayaTeal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#115E59" />
          </linearGradient>
          <linearGradient id="princeIndigo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>

        {/* ================= RAJA / ADIPATI BETAK ================= */}
        {role === 'raja' && (
          <g>
            {/* Bahu & Beskap Kerajaan */}
            <path
              d="M34 220 C36 175 58 156 92 152 L128 152 C162 156 184 175 186 220 Z"
              fill="url(#royalMaroon)"
            />
            {/* Aksen Kerah Emas & Kalung Keraton */}
            <path d="M84 152 L110 198 L136 152" fill="none" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M74 162 Q110 192 146 162" fill="none" stroke="#FBBF24" strokeWidth="3.5" strokeDasharray="5 4" />
            <circle cx="110" cy="186" r="6" fill="url(#goldGrad)" />

            {/* Leher */}
            <rect x="96" y="132" width="28" height="26" rx="10" fill="#E3A982" />
            {/* Telinga */}
            <ellipse cx="64" cy="106" rx="8" ry="12" fill="#EBB48D" />
            <ellipse cx="156" cy="106" rx="8" ry="12" fill="#EBB48D" />
            {/* Kepala */}
            <ellipse cx="110" cy="104" rx="45" ry="46" fill="url(#skinTone)" />

            {/* Rambut samping */}
            <path d="M64 98 C64 74 75 66 86 64 L74 96 Z" fill="#1E293B" />
            <path d="M156 98 C156 74 145 66 134 64 L146 96 Z" fill="#1E293B" />

            {/* Kuluk / Mahkota Adipati Jawa */}
            <path d="M68 72 L74 36 L94 48 L110 20 L126 48 L146 36 L152 72 Z" fill="url(#goldGrad)" stroke="#92400E" strokeWidth="2" strokeLinejoin="round" />
            <rect x="64" y="64" width="92" height="14" rx="6" fill="#7F1D1D" stroke="url(#goldGrad)" strokeWidth="2.5" />
            <circle cx="110" cy="54" r="5.5" fill="#10B981" stroke="#FEF3C7" strokeWidth="1.5" />

            {/* Wajah Berwibawa */}
            <path d="M81 91 Q92 86 101 91" fill="none" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M119 91 Q128 86 139 91" fill="none" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="92" cy="102" r="4.5" fill="#1E293B" />
            <circle cx="128" cy="102" r="4.5" fill="#1E293B" />
            <circle cx="93.5" cy="100.5" r="1.5" fill="#FFFFFF" />
            <circle cx="129.5" cy="100.5" r="1.5" fill="#FFFFFF" />
            <path d="M110 104 L108 113 Q110 115 113 113" fill="none" stroke="#C98A63" strokeWidth="2" strokeLinecap="round" />
            {/* Kumis Kerajaan */}
            <path d="M89 122 Q100 114 110 120 Q120 114 131 122 Q120 125 110 122 Q100 125 89 122 Z" fill="#1E293B" />
            <path d="M101 129 Q110 135 119 129" fill="none" stroke="#9A5B3C" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )}

        {/* ================= PUTRI / RARA KEMBANG SORE ================= */}
        {role === 'putri' && (
          <g>
            {/* Sanggul Belakang */}
            <ellipse cx="110" cy="52" rx="28" ry="20" fill="#1E293B" />
            {/* Cunduk Mentul Emas (3 hiasan sanggul) */}
            <line x1="94" y1="42" x2="86" y2="20" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="85" cy="18" r="4.5" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" />
            <line x1="110" y1="38" x2="110" y2="14" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="110" cy="12" r="5" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" />
            <line x1="126" y1="42" x2="134" y2="20" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="135" cy="18" r="4.5" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" />

            {/* Untaian Bunga Melati di Samping Sanggul */}
            <circle cx="136" cy="58" r="5" fill="#FFFFFF" />
            <circle cx="143" cy="66" r="4.5" fill="#F8FAFC" />
            <circle cx="146" cy="75" r="4" fill="#FFFFFF" />

            {/* Bahu & Kebaya Teal */}
            <path
              d="M38 220 C42 176 62 158 93 153 L127 153 C158 158 178 176 182 220 Z"
              fill="url(#kebayaTeal)"
            />
            {/* Selendang Batik Oranye-Emas */}
            <path d="M54 176 Q95 194 148 220 L118 220 Q78 202 44 196 Z" fill="#F97316" opacity="0.9" />
            {/* Kutubaru & Bros Emas */}
            <path d="M92 153 L110 192 L128 153" fill="#FEF3C7" opacity="0.9" />
            <circle cx="110" cy="175" r="5" fill="url(#goldGrad)" />

            {/* Leher */}
            <rect x="97" y="133" width="26" height="25" rx="10" fill="#E8B490" />
            {/* Telinga + Anting */}
            <ellipse cx="66" cy="106" rx="7" ry="11" fill="#EBB48D" />
            <ellipse cx="154" cy="106" rx="7" ry="11" fill="#EBB48D" />
            <circle cx="66" cy="118" r="3.5" fill="#FBBF24" />
            <circle cx="154" cy="118" r="3.5" fill="#FBBF24" />

            {/* Kepala */}
            <ellipse cx="110" cy="104" rx="43" ry="45" fill="url(#skinTone)" />
            {/* Rambut Belah Tengah Halus */}
            <path d="M66 102 C65 66 88 55 110 56 C132 55 155 66 154 102 C145 78 125 73 110 76 C95 73 75 78 66 102 Z" fill="#1E293B" />

            {/* Pipi Merona */}
            <ellipse cx="83" cy="114" rx="7" ry="4" fill="#FB7185" opacity="0.32" />
            <ellipse cx="137" cy="114" rx="7" ry="4" fill="#FB7185" opacity="0.32" />

            {/* Mata Ramah */}
            <path d="M83 92 Q92 88 100 92" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M120 92 Q128 88 137 92" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="92" cy="103" r="4.5" fill="#1E293B" />
            <circle cx="128" cy="103" r="4.5" fill="#1E293B" />
            <circle cx="93.5" cy="101.2" r="1.6" fill="#FFFFFF" />
            <circle cx="129.5" cy="101.2" r="1.6" fill="#FFFFFF" />
            <path d="M110 105 L108.5 112 Q110 114 112 112" fill="none" stroke="#D1926C" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M101 124 Q110 132 119 124" fill="none" stroke="#BE4B5A" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* ================= PANGERAN KALANG / KESATRIA ================= */}
        {role === 'pangeran' && (
          <g>
            {/* Bahu & Busana Pangeran */}
            <path
              d="M36 220 C40 175 60 157 92 152 L128 152 C160 157 180 175 184 220 Z"
              fill="url(#princeIndigo)"
            />
            {/* Selempang Emas */}
            <path d="M68 158 L142 220 L166 220 L86 153 Z" fill="url(#goldGrad)" opacity="0.9" />
            <path d="M90 153 L110 185 L130 153" fill="none" stroke="#FDE68A" strokeWidth="4" strokeLinejoin="round" />

            {/* Leher */}
            <rect x="96" y="132" width="28" height="26" rx="10" fill="#E3A982" />
            <ellipse cx="65" cy="106" rx="8" ry="11" fill="#EBB48D" />
            <ellipse cx="155" cy="106" rx="8" ry="11" fill="#EBB48D" />
            {/* Kepala */}
            <ellipse cx="110" cy="104" rx="44" ry="45" fill="url(#skinTone)" />

            {/* Blangkon / Iket Kepala Jawa */}
            <path
              d="M64 95 C64 56 84 44 110 44 C136 44 156 56 156 95 C140 77 123 73 110 78 C97 73 80 77 64 95 Z"
              fill="#78350F"
            />
            <path d="M67 84 Q110 66 153 84" fill="none" stroke="#D97706" strokeWidth="3.5" />
            {/* Bros Emas di Depan Blangkon */}
            <polygon points="110,56 116,65 110,74 104,65" fill="url(#goldGrad)" stroke="#FEF3C7" strokeWidth="1" />

            {/* Ekspresi Tegas & Ramah */}
            <path d="M81 91 L101 94" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <path d="M139 91 L119 94" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="92" cy="103" r="4.5" fill="#1E293B" />
            <circle cx="128" cy="103" r="4.5" fill="#1E293B" />
            <circle cx="93.5" cy="101.5" r="1.5" fill="#FFFFFF" />
            <circle cx="129.5" cy="101.5" r="1.5" fill="#FFFFFF" />
            <path d="M110 105 L108 113 Q110 115 113 113" fill="none" stroke="#C98A63" strokeWidth="2" strokeLinecap="round" />
            <path d="M99 125 Q110 132 121 125" fill="none" stroke="#9A5B3C" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* ================= IBU / NYAI ================= */}
        {role === 'ibu' && (
          <g>
            <ellipse cx="110" cy="54" rx="25" ry="18" fill="#475569" />
            <path d="M38 220 C42 176 62 158 93 153 L127 153 C158 158 178 176 182 220 Z" fill="#9A3412" />
            <path d="M62 166 Q110 198 158 166" fill="none" stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" />
            <rect x="97" y="133" width="26" height="25" rx="10" fill="#E8B490" />
            <ellipse cx="66" cy="106" rx="7" ry="11" fill="#EBB48D" />
            <ellipse cx="154" cy="106" rx="7" ry="11" fill="#EBB48D" />
            <ellipse cx="110" cy="104" rx="43" ry="45" fill="url(#skinTone)" />
            <path d="M66 102 C65 66 88 55 110 56 C132 55 155 66 154 102 C145 78 125 73 110 76 C95 73 75 78 66 102 Z" fill="#475569" />
            <path d="M84 95 Q92 90 100 95" fill="none" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M120 95 Q128 90 136 95" fill="none" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M86 104 Q92 100 98 104" fill="none" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M122 104 Q128 100 134 104" fill="none" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M101 124 Q110 131 119 124" fill="none" stroke="#9A5B3C" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        )}

        {/* ================= PERTAPA / SESEPUH ================= */}
        {role === 'pertapa' && (
          <g>
            <path d="M36 220 C40 175 60 157 92 152 L128 152 C160 157 180 175 184 220 Z" fill="#57534E" />
            <path d="M82 152 L110 198 L138 152" fill="none" stroke="#D6D3D1" strokeWidth="5" />
            <rect x="96" y="132" width="28" height="26" rx="10" fill="#E3A982" />
            <ellipse cx="65" cy="106" rx="8" ry="11" fill="#EBB48D" />
            <ellipse cx="155" cy="106" rx="8" ry="11" fill="#EBB48D" />
            <ellipse cx="110" cy="104" rx="44" ry="45" fill="url(#skinTone)" />
            {/* Iket Putih */}
            <path d="M64 92 C64 56 84 44 110 44 C136 44 156 56 156 92 C140 75 122 72 110 75 C98 72 80 75 64 92 Z" fill="#F5F5F4" stroke="#D6D3D1" strokeWidth="2" />
            {/* Alis & Janggut Putih */}
            <path d="M81 92 Q92 87 101 92" fill="none" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M119 92 Q128 87 139 92" fill="none" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="92" cy="103" r="4" fill="#1E293B" />
            <circle cx="128" cy="103" r="4" fill="#1E293B" />
            <path d="M82 122 Q110 166 138 122 Q125 118 110 121 Q95 118 82 122 Z" fill="#F8FAFC" />
            <path d="M103 128 Q110 133 117 128" fill="none" stroke="#9A5B3C" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
}