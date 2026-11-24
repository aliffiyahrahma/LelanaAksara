import React, { useState } from 'react';
import { storyChapters } from './data/storyData';
import MainMenu from './components/MainMenu';
import StoryScene from './components/StoryScene';
import QuestionScene from './components/QuestionScene';
import ResultScene from './components/ResultScene';

const API_URL = 'http://localhost:5000/api/game';

export default function App() {
  const [screen, setScreen] = useState('menu'); // 'menu' | 'story' | 'question' | 'result'
  const [playerId, setPlayerId] = useState(null);
  const [playerName, setPlayerName] = useState('Siswa');
  const [chapterIndex, setChapterIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [predictedSkill, setPredictedSkill] = useState(null);

  const [stats, setStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    totalAttempts: 0,
    totalTimeSeconds: 0
  });
  const [finalResult, setFinalResult] = useState(null);

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
        alert('Soal untuk level ini belum tersedia di database.');
      }
    } catch (err) {
      console.error(err);
      alert('Gagal terhubung ke server backend (pastikan Express berjalan di port 5000).');
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
      try {
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
      } catch (err) {
        console.error('Gagal menyimpan hasil:', err);
      }
    }
  };

  return (
    <>
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
    </>
  );
}