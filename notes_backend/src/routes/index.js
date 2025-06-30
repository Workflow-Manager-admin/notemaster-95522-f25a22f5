const express = require('express');
const healthController = require('../controllers/health');
const notesController = require('../controllers/notes');

const router = express.Router();

// Notes endpoints
router.post('/api/notes', notesController.createNote.bind(notesController));
router.get('/api/notes/user/:userId', notesController.getNotes.bind(notesController));
router.get('/api/notes/:id', notesController.getNoteById.bind(notesController));
router.put('/api/notes/:id', notesController.updateNote.bind(notesController));
router.delete('/api/notes/:id', notesController.deleteNote.bind(notesController));

// Health endpoint

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

module.exports = router;
