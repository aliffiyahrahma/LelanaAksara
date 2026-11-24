/**
 * Klasifikasi Kemampuan Pemain menggunakan Decision Tree
 * Input: { accuracyPercentage, totalAttempts, avgTimeSeconds, totalQuestions }
 * Output: 'Beginner' | 'Intermediate' | 'Advanced'
 */
function classifyPlayerSkill({ accuracyPercentage, totalAttempts, avgTimeSeconds, totalQuestions }) {
  const attemptRatio = totalAttempts / (totalQuestions || 1);

  // Node Akar (Root): Cek Persentase Jawaban Benar
  if (accuracyPercentage < 60) {
    return 'Beginner';
  }

  // Cabang Akurasi Tinggi (>= 80%)
  if (accuracyPercentage >= 80) {
    // Cek jumlah percobaan (jika nyaris tanpa salah/ulang & waktu cepat <= 20 detik)
    if (attemptRatio <= 1.3 && avgTimeSeconds <= 20) {
      return 'Advanced';
    }
    // Akurasi bagus tapi butuh banyak percobaan atau waktu cukup lama
    return 'Intermediate';
  }

  // Cabang Akurasi Menengah (60% - 79%)
  if (attemptRatio > 2.0 || avgTimeSeconds > 30) {
    return 'Beginner';
  }

  return 'Intermediate';
}

module.exports = { classifyPlayerSkill };