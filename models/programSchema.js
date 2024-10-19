const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,  // URL for the image at the program level
    required: false // Optional
  },
  imageUrl2: {
    type: String,  // URL for the image at the program level
    required: false // Optional
  },
  sections: [
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        songUrl: {
            type: String,  // URL for the song in this section
            required: false // Optional
        },
        songTitle: {
          type: String,  // URL for the song in this section
          required: false // Optional
        },
        songDesc: {
          type: String,  // URL for the song in this section
          required: false // Optional
        }

    }
  ]
});

// Create a model from the schema
const Program = mongoose.model('Program', programSchema);

module.exports = Program;