const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { classifyPlayerSkill } = require('../utils/decisionTree');

// 0. Simpan nama pemain saat menekan tombol Play
router.post('/players', async (req, res) => {
  try {
    const rawName = typeof req.body.playerName === 'string' ? req.body.playerName.trim() : '';
    const playerName = rawName || 'Siswa';

    const [result] = await db.query(
      'INSERT INTO players (player_name) VALUES (?)',
      [playerName]
    );

    res.status(201).json({
      success: true,
      playerId: result.insertId,
      playerName
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 1. Ambil soal berdasarkan level & tingkat kesulitan (hasil Decision Tree)
router.get('/questions', async (req, res) => {
  try {
    const { level, difficulty } = req.query;
    let query = 'SELECT * FROM questions WHERE level = ?';
    const params = [level];

    if (difficulty) {
      query += ' AND difficulty = ?';
      params.push(difficulty);
    }

    const [rows] = await db.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Evaluasi kemampuan sementara (saat di tengah cerita menuju Level 4)
router.post('/evaluate', (req, res) => {
  const { correctAnswers, totalQuestions, totalAttempts, totalTimeSeconds } = req.body;
  const accuracyPercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const avgTimeSeconds = totalQuestions > 0 ? totalTimeSeconds / totalQuestions : 0;

  const skillLevel = classifyPlayerSkill({
    accuracyPercentage,
    totalAttempts,
    avgTimeSeconds,
    totalQuestions
  });

  res.json({
    success: true,
    skillLevel,
    accuracyPercentage: Number(accuracyPercentage.toFixed(2)),
    avgTimeSeconds: Number(avgTimeSeconds.toFixed(2))
  });
});

// 3. Simpan hasil akhir permainan ke database
router.post('/sessions', async (req, res) => {
  try {
    const {
      playerId = null,
      playerName = 'Siswa',
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      totalAttempts,
      totalTimeSeconds
    } = req.body;

    const accuracyPercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
    const avgTimeSeconds = totalQuestions > 0 ? totalTimeSeconds / totalQuestions : 0;

    const skillLevel = classifyPlayerSkill({
      accuracyPercentage,
      totalAttempts,
      avgTimeSeconds,
      totalQuestions
    });

    const [result] = await db.query(
      `INSERT INTO game_sessions 
      (player_id, player_name, total_questions, correct_answers, wrong_answers, accuracy_percentage, total_attempts, avg_time_seconds, skill_level) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [playerId, playerName, totalQuestions, correctAnswers, wrongAnswers, accuracyPercentage, totalAttempts, avgTimeSeconds, skillLevel]
    );

    res.json({
      success: true,
      sessionId: result.insertId,
      result: {
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        accuracyPercentage: Number(accuracyPercentage.toFixed(2)),
        skillLevel
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;