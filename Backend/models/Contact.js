const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/contacts.json');

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize contacts file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

class Contact {
  static getAllContacts() {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading contacts file:', error);
      return [];
    }
  }

  static saveContacts(contacts) {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing contacts file:', error);
      return false;
    }
  }

  static create(contactData) {
    const contacts = this.getAllContacts();

    const newContact = {
      id: Date.now().toString(),
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      message: contactData.message,
      createdAt: new Date().toISOString(),
      status: 'new' // new, read, replied
    };

    contacts.push(newContact);
    this.saveContacts(contacts);

    return newContact;
  }

  static findById(id) {
    const contacts = this.getAllContacts();
    return contacts.find(c => c.id === id);
  }

  static updateStatus(id, status) {
    const contacts = this.getAllContacts();
    const contactIndex = contacts.findIndex(c => c.id === id);
    
    if (contactIndex === -1) {
      return null;
    }

    contacts[contactIndex].status = status;
    this.saveContacts(contacts);

    return contacts[contactIndex];
  }
}

module.exports = Contact;

