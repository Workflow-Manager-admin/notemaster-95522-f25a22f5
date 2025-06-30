const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * Note model representing the notes table in the database
 * @typedef {Object} Note
 * @property {number} id - Unique identifier for the note
 * @property {string} title - Title of the note
 * @property {string} content - Content of the note
 * @property {number} user_id - ID of the user who owns the note
 * @property {Date} created_at - Timestamp when the note was created
 * @property {Date} updated_at - Timestamp when the note was last updated
 */
const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'notes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('Note model synchronized with database');
  })
  .catch(error => {
    console.error('Error synchronizing Note model:', error);
  });

module.exports = Note;
