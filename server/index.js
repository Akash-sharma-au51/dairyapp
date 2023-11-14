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
    const newEntry = new Entries({ entry });
    const savedEntry = await newEntry.save();

    if (!savedEntry) {
      res.status(500).json({ message: 'Error posting entry' });
    } else {
      res.status(201).json({ entry: savedEntry, message: 'Entry saved successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error posting entry' });
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
    const { entry } = req.body;
    const updatedEntry = await Entries.findByIdAndUpdate(id, { entry }, { new: true });

    if (!updatedEntry) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      res.status(200).json({ entry: updatedEntry, message: 'Entry updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating entry' });
  }
});

// Database Connection
Connect();

// Start the server
app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});
