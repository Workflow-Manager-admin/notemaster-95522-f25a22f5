const notesService = require('../services/notes');

class NotesController {
  /**
   * @swagger
   * /api/notes:
   *   post:
   *     summary: Create a new note
   *     description: Creates a new note with the provided title, content, and user ID
   *     tags: [Notes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Note'
   *     responses:
   *       201:
   *         description: Note created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessResponse'
   *             example:
   *               status: 'success'
   *               data:
   *                 id: 1
   *                 title: 'Meeting Notes'
   *                 content: 'Discuss project timeline'
   *                 user_id: 1
   *                 created_at: '2024-01-20T10:00:00.000Z'
   *                 updated_at: '2024-01-20T10:00:00.000Z'
   *       400:
   *         $ref: '#/components/responses/ValidationError'
   *       500:
   *         $ref: '#/components/responses/ServerError'
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
   *     description: Retrieves all notes belonging to the specified user ID, ordered by last update
   *     tags: [Notes]
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: The ID of the user whose notes to retrieve
   *     responses:
   *       200:
   *         description: List of notes retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessResponse'
   *             example:
   *               status: 'success'
   *               data: [
   *                 {
   *                   id: 1,
   *                   title: 'Meeting Notes',
   *                   content: 'Discuss project timeline',
   *                   user_id: 1,
   *                   created_at: '2024-01-20T10:00:00.000Z',
   *                   updated_at: '2024-01-20T10:00:00.000Z'
   *                 }
   *               ]
   *       400:
   *         $ref: '#/components/responses/ValidationError'
   *       500:
   *         $ref: '#/components/responses/ServerError'
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
   *     description: Retrieves a specific note by its ID. The user must own the note to access it.
   *     tags: [Notes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: The ID of the note to retrieve
   *       - in: query
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: The ID of the user requesting the note
   *     responses:
   *       200:
   *         description: Note retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessResponse'
   *             example:
   *               status: 'success'
   *               data:
   *                 id: 1
   *                 title: 'Meeting Notes'
   *                 content: 'Discuss project timeline'
   *                 user_id: 1
   *                 created_at: '2024-01-20T10:00:00.000Z'
   *                 updated_at: '2024-01-20T10:00:00.000Z'
   *       400:
   *         $ref: '#/components/responses/ValidationError'
   *       404:
   *         $ref: '#/components/responses/NotFoundError'
   *       500:
   *         $ref: '#/components/responses/ServerError'
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
   *     description: Updates an existing note. The user must own the note to update it.
   *     tags: [Notes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: The ID of the note to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Note'
   *     responses:
   *       200:
   *         description: Note updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessResponse'
   *             example:
   *               status: 'success'
   *               data:
   *                 id: 1
   *                 title: 'Updated Meeting Notes'
   *                 content: 'Updated project timeline'
   *                 user_id: 1
   *                 created_at: '2024-01-20T10:00:00.000Z'
   *                 updated_at: '2024-01-20T11:00:00.000Z'
   *       400:
   *         $ref: '#/components/responses/ValidationError'
   *       404:
   *         $ref: '#/components/responses/NotFoundError'
   *       500:
   *         $ref: '#/components/responses/ServerError'
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
   *     description: Deletes a specific note. The user must own the note to delete it.
   *     tags: [Notes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: The ID of the note to delete
   *       - in: query
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: The ID of the user requesting deletion
   *     responses:
   *       200:
   *         description: Note deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 message:
   *                   type: string
   *                   example: Note deleted successfully
   *       400:
   *         $ref: '#/components/responses/ValidationError'
   *       404:
   *         $ref: '#/components/responses/NotFoundError'
   *       500:
   *         $ref: '#/components/responses/ServerError'
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
  /**
   * @swagger
   * /api/notes/backup/{userId}:
   *   post:
   *     summary: Backup all notes for a user
   *     description: Creates a backup file of all notes for the specified user and uploads it to Supabase Storage
   *     tags: [Notes]
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: The ID of the user whose notes to backup
   *     responses:
   *       200:
   *         description: Backup created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 data:
   *                   type: object
   *                   properties:
   *                     filename:
   *                       type: string
   *                       example: notes_backup_1_2024-01-20T10-00-00.json
   *                     url:
   *                       type: string
   *                       example: https://storage.url/notes-backup.json
   *                     timestamp:
   *                       type: string
   *                       format: date-time
   *                     note_count:
   *                       type: integer
   *                       example: 10
   *       400:
   *         $ref: '#/components/responses/ValidationError'
   *       500:
   *         $ref: '#/components/responses/ServerError'
   */
  async backupNotes(req, res) {
    try {
      const userId = parseInt(req.params.userId);
      
      if (!userId || userId <= 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid user ID',
          errors: ['User ID must be a positive integer']
        });
      }

      const backupDetails = await notesService.backupNotes(userId);
      res.json({
        status: 'success',
        data: backupDetails
      });
    } catch (error) {
      this.handleError(error, res);
    }
  }

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
