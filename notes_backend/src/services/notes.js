const Note = require('../models/note');
const { NotFoundError, DatabaseError } = require('../utils/errors');

class NotesService {
  /**
   * Create a new note
   * @param {Object} noteData - Data for creating the note
   * @returns {Promise<Note>} Created note
   */
  async createNote(noteData) {
    try {
      const note = await Note.create(noteData);
      return note;
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        throw new ValidationError(error.message);
      }
      throw new DatabaseError('Failed to create note: ' + error.message);
    }
  }

  /**
   * Get all notes for a user
   * @param {number} userId - ID of the user
   * @returns {Promise<Note[]>} List of notes
   */
  async getNotesByUserId(userId) {
    try {
      const notes = await Note.findAll({
        where: { user_id: userId },
        order: [['updated_at', 'DESC']]
      });
      return notes;
    } catch (error) {
      throw new DatabaseError('Failed to fetch notes: ' + error.message);
    }
  }

  /**
   * Get a note by ID
   * @param {number} noteId - ID of the note
   * @param {number} userId - ID of the user
   * @returns {Promise<Note>} Note object
   */
  async getNoteById(noteId, userId) {
    try {
      const note = await Note.findOne({
        where: { id: noteId, user_id: userId }
      });
      
      if (!note) {
        throw new NotFoundError('Note not found');
      }
      
      return note;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to fetch note: ' + error.message);
    }
  }

  /**
   * Update a note
   * @param {number} noteId - ID of the note to update
   * @param {number} userId - ID of the user
   * @param {Object} updateData - Data to update
   * @returns {Promise<Note>} Updated note
   */
  async updateNote(noteId, userId, updateData) {
    try {
      const note = await Note.findOne({
        where: { id: noteId, user_id: userId }
      });

      if (!note) {
        throw new NotFoundError('Note not found');
      }

      const updatedNote = await note.update(updateData);
      return updatedNote;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error.name === 'SequelizeValidationError') {
        throw new ValidationError(error.message);
      }
      throw new DatabaseError('Failed to update note: ' + error.message);
    }
  }

  /**
   * Delete a note
   * @param {number} noteId - ID of the note to delete
   * @param {number} userId - ID of the user
   * @returns {Promise<boolean>} True if deleted
   */
  async deleteNote(noteId, userId) {
    try {
      const deleted = await Note.destroy({
        where: { id: noteId, user_id: userId }
      });
      
      if (deleted === 0) {
        throw new NotFoundError('Note not found');
      }
      
      return true;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to delete note: ' + error.message);
    }
  }
}

module.exports = new NotesService();
