import React, { useState } from 'react';
import { storyChapters } from './data/storyData';
import MainMenu from './components/MainMenu';
import StoryScene from './components/StoryScene';
import QuestionScene from './components/QuestionScene';
import ResultScene from './components/ResultScene';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/game';

export default function App() {
  const [screen, setScreen] = useState('menu'); // 'menu' | 'story' | 'question' | 'result'
  const [playerId, setPlayerId] = useState(null);
  const [playerName, setPlayerName] = useState('Siswa');
  const [chapterIndex, setChapterIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [predictedSkill, setPredictedSkill] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [stats, setStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    totalAttempts: 0,
    totalTimeSeconds: 0
  });
  const [finalResult, setFinalResult] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const startGame = async (name) => {
    const finalName = name || 'Siswa';
    setPlayerName(finalName);

    let savedPlayerId = null;
    try {
      const res = await fetch(`${API_URL}/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: finalName })
      });
      const data = await res.json();
      if (data.success) {
        savedPlayerId = data.playerId;
        setPlayerId(data.playerId);
      }
    } catch (err) {
      console.error('Gagal menyimpan nama pemain ke database:', err);
    }

    setChapterIndex(0);
    setPredictedSkill(null);
    setStats({
      totalQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      totalAttempts: 0,
      totalTimeSeconds: 0
    });
    setScreen('story');
    return savedPlayerId;
  };

  const handleCompleteChapter = async (questionLevel) => {
    setIsLoading(true);
    try {
      let url = `${API_URL}/questions?level=${questionLevel}`;
      if (questionLevel === 4 && predictedSkill) {
        url += `&difficulty=${predictedSkill}`;
      }

      const res = await fetch(url);
      const json = await res.json();

      if (json.success && json.data.length > 0) {
        const randomQ = json.data[Math.floor(Math.random() * json.data.length)];
        setCurrentQuestion(randomQ);
        setScreen('question');
      } else {
        showToast('Soal untuk level ini belum tersedia di database.');
      }
    } catch (err) {
      console.error(err);
      showToast('Gagal terhubung ke server backend (pastikan Express berjalan di port 5000).');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSuccess = async ({ attempts, wrongCount, timeTakenSeconds }) => {
    const updatedStats = {
      totalQuestions: stats.totalQuestions + 1,
      correctAnswers: stats.correctAnswers + (wrongCount === 0 ? 1 : 0),
      wrongAnswers: stats.wrongAnswers + wrongCount,
      totalAttempts: stats.totalAttempts + attempts,
      totalTimeSeconds: stats.totalTimeSeconds + timeTakenSeconds
    };
    setStats(updatedStats);
    setIsLoading(true);

    try {
      if (chapterIndex < storyChapters.length - 1) {
        if (chapterIndex === 2) {
          try {
            const evalRes = await fetch(`${API_URL}/evaluate`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedStats)
            });
            const evalData = await evalRes.json();
            if (evalData.success) {
              setPredictedSkill(evalData.skillLevel);
            }
          } catch (err) {
            console.error('Gagal evaluasi Decision Tree:', err);
          }
        }

        setChapterIndex(chapterIndex + 1);
        setScreen('story');
      } else {
        const saveRes = await fetch(`${API_URL}/sessions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ playerId, playerName, ...updatedStats })
        });
        const saveData = await saveRes.json();
        if (saveData.success) {
          setFinalResult(saveData.result);
          setScreen('result');
        }
      }
    } catch (err) {
      console.error('Gagal memproses tahap berikutnya:', err);
      showToast('Terjadi kesalahan saat menyimpan hasil.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-svh w-full bg-[#f6f3eb]">
      {/* Notifikasi Toast Modern */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 max-w-sm animate-scene rounded-2xl border border-rose-200 bg-white px-4 py-3.5 shadow-xl flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 text-xs font-bold">
            !
          </span>
          <p className="text-sm font-medium text-slate-700 leading-snug">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-auto text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 backdrop-blur-xs">
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-2xl flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
            <span className="text-sm font-semibold text-slate-700">Memuat petualangan...</span>
          </div>
        </div>
      )}

      <div key={screen + chapterIndex} className="animate-scene">
        {screen === 'menu' && <MainMenu onStartGame={startGame} />}
        {screen === 'story' && (
          <StoryScene
            chapter={storyChapters[chapterIndex]}
            onCompleteChapter={handleCompleteChapter}
            onBackToMenu={() => setScreen('menu')}
          />
        )}
        {screen === 'question' && currentQuestion && (
          <QuestionScene
            question={currentQuestion}
            skillBadge={predictedSkill}
            onAnswerSuccess={handleAnswerSuccess}
            onBackToMenu={() => setScreen('menu')}
          />
        )}
        {screen === 'result' && finalResult && (
          <ResultScene
            playerName={playerName}
            result={finalResult}
            onPlayAgain={() => startGame(playerName)}
            onBackToMenu={() => setScreen('menu')}
          />
        )}
      </div>
    </div>
  );
}