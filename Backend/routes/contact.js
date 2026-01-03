const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

const router = express.Router();

// Submit contact form
router.post('/submit', [
  body('contactName').trim().notEmpty().withMessage('Name is required'),
  body('contactEmail').isEmail().withMessage('Valid email is required'),
  body('contactSubject').trim().notEmpty().withMessage('Subject is required'),
  body('contactMessage').trim().notEmpty().withMessage('Message is required')
], (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { contactName, contactEmail, contactSubject, contactMessage } = req.body;

    // Create contact entry
    const contact = Contact.create({
      name: contactName,
      email: contactEmail,
      subject: contactSubject,
      message: contactMessage
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
      data: {
        contactId: contact.id
      }
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit message. Please try again.'
    });
  }
});

// Get all contacts (Admin only - requires authentication middleware)
router.get('/all', (req, res) => {
  try {
    const contacts = Contact.getAllContacts();
    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

module.exports = router;

