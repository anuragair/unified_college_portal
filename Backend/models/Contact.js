const { query } = require('../config/database');

class Contact {
  static async getAllContacts() {
    try {
      const contacts = await query('SELECT * FROM contacts ORDER BY createdAt DESC');
      return contacts;
    } catch (error) {
      console.error('Error fetching all contacts:', error);
      throw error;
    }
  }

  static async create(contactData) {
    try {
      const result = await query(
        `INSERT INTO contacts (name, email, subject, message, status) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          contactData.name,
          contactData.email,
          contactData.subject,
          contactData.message,
          'new'
        ]
      );

      // Fetch the created contact
      const newContact = await this.findById(result.insertId);
      return newContact;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const contacts = await query('SELECT * FROM contacts WHERE id = ?', [id]);
      return contacts[0] || null;
    } catch (error) {
      console.error('Error finding contact by ID:', error);
      throw error;
    }
  }

  static async updateStatus(id, status) {
    try {
      const validStatuses = ['new', 'read', 'replied'];
      if (!validStatuses.includes(status)) {
        throw new Error('Invalid status value');
      }

      await query(
        'UPDATE contacts SET status = ? WHERE id = ?',
        [status, id]
      );

      // Fetch updated contact
      const updatedContact = await this.findById(id);
      return updatedContact;
    } catch (error) {
      console.error('Error updating contact status:', error);
      throw error;
    }
  }

  static async getContactsByStatus(status) {
    try {
      const contacts = await query(
        'SELECT * FROM contacts WHERE status = ? ORDER BY createdAt DESC',
        [status]
      );
      return contacts;
    } catch (error) {
      console.error('Error fetching contacts by status:', error);
      throw error;
    }
  }

  static async deleteContact(id) {
    try {
      const result = await query('DELETE FROM contacts WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
}

module.exports = Contact;
