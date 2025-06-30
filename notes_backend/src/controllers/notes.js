const notesService = require('../services/notes');

class NotesController {
  /**
   * @swagger
   * /api/notes:
   *   post:
   *     summary: Create a new note
   *     tags: [Notes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - content
   *               - user_id
   *             properties:
   *               title:
   *                 type: string
   *               content:
   *                 type: string
   *               user_id:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Note created successfully
   *       400:
   *         description: Invalid request body
   *       500:
   *         description: Server error
   */
  async createNote(req, res) {
    try {
      const note = await notesService.createNote(req.body);
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /api/notes/user/{userId}:
   *   get:
   *     summary: Get all notes for a user
   *     tags: [Notes]
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: List of notes
   *       500:
   *         description: Server error
   */
  async getNotes(req, res) {
    try {
      const notes = await notesService.getNotesByUserId(req.params.userId);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /api/notes/{id}:
   *   get:
   *     summary: Get a note by ID
   *     tags: [Notes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *       - in: query
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Note details
   *       404:
   *         description: Note not found
   *       500:
   *         description: Server error
   */
  async getNoteById(req, res) {
    try {
      const note = await notesService.getNoteById(req.params.id, req.query.userId);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /api/notes/{id}:
   *   put:
   *     summary: Update a note
   *     tags: [Notes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - content
   *               - user_id
   *             properties:
   *               title:
   *                 type: string
   *               content:
   *                 type: string
   *               user_id:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Note updated successfully
   *       404:
   *         description: Note not found
   *       500:
   *         description: Server error
   */
  async updateNote(req, res) {
    try {
      const note = await notesService.updateNote(
        req.params.id,
        req.body.user_id,
        req.body
      );
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /api/notes/{id}:
   *   delete:
   *     summary: Delete a note
   *     tags: [Notes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *       - in: query
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Note deleted successfully
   *       404:
   *         description: Note not found
   *       500:
   *         description: Server error
   */
  async deleteNote(req, res) {
    try {
      const deleted = await notesService.deleteNote(req.params.id, req.query.userId);
      if (!deleted) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new NotesController();
