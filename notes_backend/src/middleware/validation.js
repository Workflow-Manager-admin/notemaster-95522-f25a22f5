const validateNote = (req, res, next) => {
  const { title, content, user_id } = req.body;

  const errors = [];

  // Title validation
  if (!title) {
    errors.push('Title is required');
  } else if (typeof title !== 'string') {
    errors.push('Title must be a string');
  } else if (title.length < 1 || title.length > 200) {
    errors.push('Title must be between 1 and 200 characters');
  }

  // Content validation
  if (!content) {
    errors.push('Content is required');
  } else if (typeof content !== 'string') {
    errors.push('Content must be a string');
  } else if (content.length < 1) {
    errors.push('Content cannot be empty');
  }

  // User ID validation
  if (!user_id) {
    errors.push('User ID is required');
  } else if (!Number.isInteger(user_id) || user_id <= 0) {
    errors.push('User ID must be a positive integer');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  const userId = parseInt(req.query.userId || req.body.user_id);

  if (!id || id <= 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid note ID',
      errors: ['Note ID must be a positive integer']
    });
  }

  if (!userId || userId <= 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid user ID',
      errors: ['User ID must be a positive integer']
    });
  }

  req.params.id = id;
  req.query.userId = userId;
  next();
};

module.exports = {
  validateNote,
  validateId
};
