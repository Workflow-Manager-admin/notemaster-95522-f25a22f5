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
   *                 minLength: 1
   *                 maxLength: 200
   *               content:
   *                 type: string
   *                 minLength: 1
   *               user_id:
   *                 type: integer
   *                 minimum: 1
   *     responses:
   *       201:
   *         description: Note created successfully
   *       400:
   *         description: Invalid request body
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: error
   *                 message:
   *                   type: string
   *                   example: Validation failed
   *                 errors:
   *                   type: array
   *                   items:
   *                     type: string
   *       500:
   *         description: Server error
   */
  async createNote(req, res) {
    try {
      const note = await notesService.createNote(req.body);
      res.status(201).json({
        status: 'success',
        data: note
      });
    } catch (error) {
      this.handleError(error, res);
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
   *           minimum: 1
   *     responses:
   *       200:
   *         description: List of notes
   *       400:
   *         description: Invalid user ID
   *       500:
   *         description: Server error
   */
  async getNotes(req, res) {
    try {
      const notes = await notesService.getNotesByUserId(parseInt(req.params.userId));
      res.json({
        status: 'success',
        data: notes
      });
    } catch (error) {
      this.handleError(error, res);
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
   *           minimum: 1
   *       - in: query
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *     responses:
   *       200:
   *         description: Note details
   *       400:
   *         description: Invalid request parameters
   *       404:
   *         description: Note not found
   *       500:
   *         description: Server error
   */
  async getNoteById(req, res) {
    try {
      const note = await notesService.getNoteById(req.params.id, req.query.userId);
      res.json({
        status: 'success',
        data: note
      });
    } catch (error) {
      this.handleError(error, res);
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
   *           minimum: 1
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
   *                 minLength: 1
   *                 maxLength: 200
   *               content:
   *                 type: string
   *                 minLength: 1
   *               user_id:
   *                 type: integer
   *                 minimum: 1
   *     responses:
   *       200:
   *         description: Note updated successfully
   *       400:
   *         description: Invalid request parameters
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
      res.json({
        status: 'success',
        data: note
      });
    } catch (error) {
      this.handleError(error, res);
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
   *           minimum: 1
   *       - in: query
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *     responses:
   *       200:
   *         description: Note deleted successfully
   *       400:
   *         description: Invalid request parameters
   *       404:
   *         description: Note not found
   *       500:
   *         description: Server error
   */
  async deleteNote(req, res) {
    try {
      await notesService.deleteNote(req.params.id, req.query.userId);
      res.json({
        status: 'success',
        message: 'Note deleted successfully'
      });
    } catch (error) {
      this.handleError(error, res);
    }
  }

  /**
   * Handle errors and send appropriate response
   * @private
   */
  handleError(error, res) {
    console.error('Error:', error);
    
    const errorResponse = {
      status: 'error',
      message: error.message
    };

    switch (error.name) {
      case 'ValidationError':
        res.status(400).json(errorResponse);
        break;
      case 'NotFoundError':
        res.status(404).json(errorResponse);
        break;
      case 'DatabaseError':
        res.status(500).json(errorResponse);
        break;
      default:
        res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
    }
  }
}

module.exports = new NotesController();
