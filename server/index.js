const express = require('express');
const cors = require('cors');
const Entries = require('./models/Entries');
const Connect = require('./controllers/Connection');

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

// GET
app.get('/entries', async (req, res) => {
  try {
    const fetchedEntries = await Entries.find();
    res.status(200).json({ entries: fetchedEntries, message: 'All entries fetched successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entries' });
  }
});

// POST
app.post('/entries', async (req, res) => {
  try {
    const { entry } = req.body;

    if (!entry) {
      return res.status(400).json({ message: 'Entry is required' });
    }

    const newEntry = new Entries({ entry });
    const savedEntry = await newEntry.save();

    
    if (!savedEntry) {
      return res.status(500).json({ message: 'Error saving entry' });
    }

    res.status(201).json({ entry: savedEntry, message: 'Entry saved successfully' });
  } catch (error) {
    console.error('Error posting entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// DELETE
app.delete('/entries/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEntry = await Entries.findByIdAndDelete(id);

    if (!deletedEntry) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      res.status(200).json({ entry: deletedEntry, message: 'Entry deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting entry' });
  }
});

// UPDATE
app.put('/entries/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { updatedEntry } = req.body;

    if (!updatedEntry) {
      return res.status(400).json({ message: 'Updated entry is required' });
    }

    const updatedEntryDocument = await Entries.findByIdAndUpdate(id, { entry: updatedEntry }, { new: true });

    if (!updatedEntryDocument) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.status(200).json({ entry: updatedEntryDocument, message: 'Entry updated successfully' });
  } catch (error) {
    console.error('Error updating entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Database Connection
Connect();

// Start the server
app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});
