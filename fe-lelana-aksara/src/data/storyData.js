export const storyChapters = [
  {
    id: 1,
    level: 1,
    title: "Pertemuan di Tamansari",
    background: "bg-gradient-to-b from-emerald-800 via-teal-700 to-amber-900", // Nanti bisa diganti URL gambar Tamansari
    locationName: "Tamansari Kadipaten Betak",
    dialogues: [
      {
        speaker: "Narasi",
        character: null,
        text: "Rara Kembang Sore merupakan putri dari Adipati Betak. Suatu hari, saat ia sedang berada di Tamansari, datanglah pamannya yang bernama Pangeran Kalang dengan tergesa-gesa."
      },
      {
        speaker: "Pangeran Kalang",
        character: "🤴", // Nanti diganti path gambar ilustrasi karakter 2D
        text: "Rara, tolong sembunyikan Paman! Paman sedang dikejar oleh Lembu Peteng!"
      },
      {
        speaker: "Rara Kembang Sore",
        character: "👸",
        text: "Baik Paman, segeralah bersembunyi di balik taman sebelah sana sebelum ia tiba."
      },
      {
        speaker: "Lembu Peteng",
        character: "🧔",
        text: "Permisi Tuan Putri... Apakah Tuan Putri melihat Pangeran Kalang melintas di Tamansari ini?"
      },
      {
        speaker: "Rara Kembang Sore",
        character: "👸",
        text: "Maaf Kisanak, sejak tadi aku hanya menikmati bunga di taman ini dan tidak melihat siapa pun lewat."
      }
    ],
    questionLevel: 1 // Tantangan Aksara Nglegena
  },
  {
    id: 2,
    level: 2,
    title: "Perselisihan & Sungai Lembupeteng",
    background: "bg-gradient-to-b from-slate-800 via-red-900 to-stone-900",
    locationName: "Tepi Sungai & Kadipaten Betak",
    dialogues: [
      {
        speaker: "Narasi",
        character: null,
        text: "Seiring waktu, Lembu Peteng dan Rara Kembang Sore saling jatuh hati. Namun Pangeran Kalang mengetahui hal itu dan melaporkannya kepada Adipati Betak."
      },
      {
        speaker: "Adipati Betak",
        character: "👑",
        text: "Berani sekali Lembu Peteng mendekati putriku! Kyai Kasan Besari, bantu aku mengejar dan menghentikannya!"
      },
      {
        speaker: "Kyai Kasan Besari",
        character: "👳",
        text: "Sendiko dawuh Adipati. Mari kita cari tempat persembunyiannya sekarang juga."
      },
      {
        speaker: "Narasi",
        character: null,
        text: "Pertempuran pun terjadi. Lembu Peteng kalah di tangan Kyai Kasan Besari dan jasadnya dihanyutkan ke sungai, yang kelak dikenal sebagai Sungai Lembupeteng."
      }
    ],
    questionLevel: 2 // Tantangan Sandhangan
  },
  {
    id: 3,
    level: 3,
    title: "Pelarian ke Desa Dadapan & Semedi Joko Bodo",
    background: "bg-gradient-to-b from-amber-700 via-orange-800 to-stone-900",
    locationName: "Desa Dadapan & Punggung Gunung",
    dialogues: [
      {
        speaker: "Narasi",
        character: null,
        text: "Merasa takut dikejar, Rara Kembang Sore melarikan diri hingga sampai di Desa Dadapan dan diasuh oleh Mbok Rondo Dadapan yang memiliki putra bernama Joko Bodo."
      },
      {
        speaker: "Joko Bodo",
        character: "🧑",
        text: "Rara Kembang Sore, maukah engkau menjadi istriku? Aku berjanji akan selalu menjagamu."
      },
      {
        speaker: "Rara Kembang Sore",
        character: "👸",
        text: "Aku bersedia menikah denganmu, asalkan kamu sanggup bersemedi tanpa bersuara sepatah kata pun di atas puncak gunung sana."
      },
      {
        speaker: "Joko Bodo",
        character: "🧑",
        text: "Baiklah! Demi dirimu, aku akan berangkat ke gunung dan bersemedi dalam diam sekarang juga!"
      }
    ],
    questionLevel: 3 // Tantangan Pasangan
  },
  {
    id: 4,
    level: 4,
    title: "Asal Mula Gunung Budeg",
    background: "bg-gradient-to-b from-indigo-950 via-stone-800 to-emerald-950",
    locationName: "Puncak Gunung Budeg",
    dialogues: [
      {
        speaker: "Narasi",
        character: null,
        text: "Sementara Joko Bodo bersemedi bisu, Rara Kembang Sore pergi meninggalkan desa. Mbok Rondo Dadapan yang kebingungan akhirnya menyusul anaknya ke atas gunung."
      },
      {
        speaker: "Mbok Rondo Dadapan",
        character: "👵",
        text: "Joko Bodo! Nak, ayo pulang! Kenapa kamu diam saja seperti orang tuli tidak menjawab panggilan ibumu?!"
      },
      {
        speaker: "Narasi",
        character: null,
        text: "Joko Bodo tetap membisu demi menjaga janjinya. Karena kecewa dan marah, terucaplah sabda dari mulut ibunya..."
      },
      {
        speaker: "Mbok Rondo Dadapan",
        character: "👵",
        text: "Dipanggil ibumu berkali-kali hanya diam membisu seperti batu... Jadilah kamu batu!"
      },
      {
        speaker: "Narasi",
        character: null,
        text: "Seketika tubuh Joko Bodo berubah menjadi batu besar. Peristiwa inilah yang dipercaya sebagai asal mula nama Gunung Budeg di Tulungagung."
      }
    ],
    questionLevel: 4 // Tantangan Adaptif sesuai hasil Decision Tree
  }
];