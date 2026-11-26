import React from 'react';

function detectSetting(locationName = '', level = 1) {
  const loc = locationName.toLowerCase();
  if (loc.includes('taman') || loc.includes('kadipaten') || loc.includes('istana') || loc.includes('keraton') || level === 1) {
    return 'tamansari';
  }
  if (loc.includes('gunung') || loc.includes('puncak') || loc.includes('budeg') || loc.includes('pertapaan') || level >= 3) {
    return 'gunung';
  }
  return 'hutan';
}

export default function SceneBackdrop({ locationName, level }) {
  const setting = detectSetting(locationName, level);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Cahaya Matahari / Langit Hangat */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-amber-200/20 blur-[90px]" />

      {/* Awan Lembut */}
      <svg viewBox="0 0 1440 320" className="absolute top-12 left-0 w-full opacity-20 text-white fill-current">
        <path d="M180,120 C180,100 200,88 220,92 C230,72 260,72 272,90 C292,88 310,102 310,120 Z" />
        <path d="M1040,95 C1040,74 1064,62 1086,68 C1098,44 1134,44 1148,66 C1172,64 1192,78 1192,95 Z" />
      </svg>

      {/* Siluet Pegunungan Lapis Belakang */}
      <svg
        viewBox="0 0 1440 360"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[55%] text-black/15 fill-current"
      >
        <path d="M0,360 L0,210 L210,145 L440,215 L720,75 L1000,195 L1240,120 L1440,185 L1440,360 Z" />
      </svg>

      {/* Adegan Khusus: Tamansari / Kadipaten */}
      {setting === 'tamansari' && (
        <svg
          viewBox="0 0 1440 420"
          preserveAspectRatio="xMidYMax slice"
          className="absolute bottom-0 left-0 w-full h-[65%]"
        >
          {/* Atap Joglo Pendopo di Kejauhan */}
          <path d="M560,250 L720,175 L880,250 Z" fill="#042f2e" opacity="0.45" />
          <path d="M610,210 L720,150 L830,210 Z" fill="#042f2e" opacity="0.55" />
          <rect x="610" y="250" width="220" height="80" fill="#042f2e" opacity="0.35" />

          {/* Gapura Candi Bentar Kiri & Kanan */}
          <path d="M70,420 L70,220 L110,190 L130,145 L155,145 L165,260 L195,260 L195,420 Z" fill="#022c22" opacity="0.55" />
          <path d="M1370,420 L1370,220 L1330,190 L1310,145 L1285,145 L1275,260 L1245,260 L1245,420 Z" fill="#022c22" opacity="0.55" />

          {/* Pepohonan Taman */}
          <circle cx="240" cy="285" r="75" fill="#065f46" opacity="0.45" />
          <circle cx="310" cy="310" r="60" fill="#047857" opacity="0.45" />
          <circle cx="1190" cy="290" r="78" fill="#065f46" opacity="0.45" />
          <circle cx="1115" cy="315" r="55" fill="#047857" opacity="0.45" />

          {/* Kolam & Teratai Tamansari */}
          <path d="M0,330 Q720,305 1440,330 L1440,420 L0,420 Z" fill="#022c22" opacity="0.55" />
          <ellipse cx="420" cy="355" rx="34" ry="8" fill="#34d399" opacity="0.35" />
          <ellipse cx="1020" cy="360" rx="40" ry="9" fill="#34d399" opacity="0.35" />
        </svg>
      )}

      {/* Adegan Khusus: Hutan / Perjalanan */}
      {setting === 'hutan' && (
        <svg
          viewBox="0 0 1440 420"
          preserveAspectRatio="xMidYMax slice"
          className="absolute bottom-0 left-0 w-full h-[65%]"
        >
          <path d="M0,330 Q720,275 1440,330 L1440,420 L0,420 Z" fill="#022c22" opacity="0.55" />
          <polygon points="120,340 190,150 260,340" fill="#064e3b" opacity="0.6" />
          <polygon points="220,350 300,130 380,350" fill="#065f46" opacity="0.55" />
          <polygon points="1080,350 1160,135 1240,350" fill="#065f46" opacity="0.55" />
          <polygon points="1180,340 1260,165 1340,340" fill="#064e3b" opacity="0.6" />
        </svg>
      )}

      {/* Adegan Khusus: Puncak Gunung Budeg */}
      {setting === 'gunung' && (
        <svg
          viewBox="0 0 1440 420"
          preserveAspectRatio="xMidYMax slice"
          className="absolute bottom-0 left-0 w-full h-[70%]"
        >
          {/* Puncak Gunung Utama */}
          <path d="M320,420 L680,105 L760,115 L1120,420 Z" fill="#0f172a" opacity="0.38" />
          <path d="M0,420 L260,220 L540,360 L920,340 L1200,200 L1440,420 Z" fill="#022c22" opacity="0.5" />
          {/* Kabut Gunung */}
          <ellipse cx="720" cy="240" rx="340" ry="26" fill="#ffffff" opacity="0.14" />
          <ellipse cx="420" cy="290" rx="220" ry="20" fill="#ffffff" opacity="0.1" />
        </svg>
      )}
    </div>
  );
}