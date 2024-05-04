document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const combineButton = document.getElementById('combine-btn');
    const loadingScreen = document.getElementById('loading-screen');
    const preview = document.getElementById('preview');
    const coverContainer = document.getElementById('cover-container');
    const coverImage = document.getElementById('cover-image');
    const previewAudio = document.getElementById('preview-audio');
    const titleInput = document.getElementById('title-input');
    const singerInput = document.getElementById('singer-input');
    const coverInput = document.getElementById('cover-input');
    const downloadButton = document.getElementById('download-btn');

    let audioFiles = [];
    let coverFile = null;
    let combinedAudioBlob = null;
    let combinedAudioURL = null;

    // Handle drag and drop events
    uploadArea.addEventListener('dragover', e => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', e => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      audioFiles = Array.from(e.dataTransfer.files);
    });

    // Handle file input change event
    fileInput.addEventListener('change', e => {
      audioFiles = Array.from(e.target.files);
    });

    coverInput.addEventListener('change', e => {
      coverFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        coverImage.src = reader.result;
      };
      reader.readAsDataURL(coverFile);
    });

    combineButton.addEventListener('click', combineAudio);

    function combineAudio() {
      if (audioFiles.length < 2) {
        alert('Please select at least two audio files.');
        return;
      }

      loadingScreen.style.display = 'block';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        combineAudioFiles();
      }, 2000);
    }

    function combineAudioFiles() {
      // Simulate combining audio files
      // Replace this code with your actual combining logic
      combinedAudioBlob = new Blob(audioFiles, { type: 'audio/mp3' });
      combinedAudioURL = URL.createObjectURL(combinedAudioBlob);

      // Enable download button
      downloadButton.disabled = false;

      // Show preview of combined audio
      preview.style.display = 'block';
      previewAudio.src = combinedAudioURL;
      previewAudio.load();

      // Set cover image
      if (coverFile) {
        const reader = new FileReader();
        reader.onload = () => {
          coverImage.src = reader.result;
        };
        reader.readAsDataURL(coverFile);
      }
    }

    downloadButton.addEventListener('click', () => {
      if (!combinedAudioBlob) {
        alert('Please combine the audio files first.');
        return;
      }

      const downloadLink = document.createElement('a');
      downloadLink.href = combinedAudioURL;
      downloadLink.download = 'combined_song.mp3';
      downloadLink.click();
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
const fileInput = document.getElementById('file-input');
const selectedFilesGrid = document.getElementById('selected-files-grid');

let audioFiles = [];

// Handle file input change event
fileInput.addEventListener('change', e => {
  const newFiles = Array.from(e.target.files);
  audioFiles = [...audioFiles, ...newFiles];
  displaySelectedFiles();
});

// Display selected audio files
function displaySelectedFiles() {
  selectedFilesGrid.innerHTML = '';
  audioFiles.forEach((file, index) => {
    const card = document.createElement('div');
    card.className = 'selected-file-card';
    card.innerHTML = `
      <span class="file-index">${index + 1}.</span>
      <span class="file-name">${file.name}</span>
      
    `;
    selectedFilesGrid.appendChild(card);
  });
}

// Handle remove button click event
selectedFilesGrid.addEventListener('click', e => {
  if (e.target.classList.contains('remove-btn')) {
    const index = e.target.dataset.index;
    audioFiles.splice(index, 1);
    displaySelectedFiles();
  }
});

// Make the selected files grid sortable
new Sortable(selectedFilesGrid, {
  draggable: '.selected-file-card',
  handle: '.file-index',
  onEnd: ({ newIndex, oldIndex }) => {
    const movedFile = audioFiles.splice(oldIndex, 1)[0];
    audioFiles.splice(newIndex, 0, movedFile);
    displaySelectedFiles();
  },
});
});