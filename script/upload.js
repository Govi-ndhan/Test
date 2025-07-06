        let selectedFiles = [];
        let imageCount = 0;
        let videoCount = 0;
        let totalSize = 0;

        // Populate year dropdown
        function populateYears() {
            const yearSelect = document.getElementById('eventYear');
            const currentYear = new Date().getFullYear();
            
            for (let year = currentYear; year >= currentYear - 50; year--) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            }
        }

        // Initialize
        populateYears();

        // File input change handler
        document.getElementById('fileInput').addEventListener('change', handleFileSelect);

        // Drag and drop handlers
        const uploadArea = document.querySelector('.upload-area');
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = Array.from(e.dataTransfer.files);
            handleFiles(files);
        });

        function handleFileSelect(e) {
            const files = Array.from(e.target.files);
            handleFiles(files);
        }

        function handleFiles(files) {
            files.forEach(file => {
                // Validate file type
                if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
                    alert(`${file.name} is not a valid image or video file`);
                    return;
                }

                // Validate file size (50MB limit)
                if (file.size > 20 * 1024 * 1024) {
                    alert(`${file.name} is too large. Maximum file size is 20MB`);
                    return;
                }

                // Add to selected files if not already present
                if (!selectedFiles.find(f => f.name === file.name && f.size === file.size)) {
                    selectedFiles.push(file);
                    updateFilePreview();
                    updateStats();
                }
            });
        }

        function updateFilePreview() {
            const preview = document.getElementById('filePreview');
            preview.innerHTML = '';

            selectedFiles.forEach((file, index) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-file';
                removeBtn.innerHTML = '×';
                removeBtn.onclick = () => removeFile(index);

                const fileName = document.createElement('div');
                fileName.className = 'file-name';
                fileName.textContent = file.name;

                const fileSize = document.createElement('div');
                fileSize.className = 'file-size';
                fileSize.textContent = formatFileSize(file.size);

                fileItem.appendChild(removeBtn);

                // Create preview based on file type
                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.onload = () => URL.revokeObjectURL(img.src);
                    fileItem.appendChild(img);
                } else if (file.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.src = URL.createObjectURL(file);
                    video.controls = false;
                    video.muted = true;
                    video.onloadeddata = () => URL.revokeObjectURL(video.src);
                    fileItem.appendChild(video);
                }

                fileItem.appendChild(fileName);
                fileItem.appendChild(fileSize);
                preview.appendChild(fileItem);
            });
        }

        function removeFile(index) {
            selectedFiles.splice(index, 1);
            updateFilePreview();
            updateStats();
        }

        function updateStats() {
            imageCount = selectedFiles.filter(file => file.type.startsWith('image/')).length;
            videoCount = selectedFiles.filter(file => file.type.startsWith('video/')).length;
            totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

            document.getElementById('imageCount').textContent = imageCount;
            document.getElementById('videoCount').textContent = videoCount;
            document.getElementById('totalSize').textContent = formatFileSize(totalSize);

            const fileStats = document.getElementById('fileStats');
            fileStats.style.display = selectedFiles.length > 0 ? 'flex' : 'none';
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        }

        function resetForm() {
            document.getElementById('mediaUploadForm').reset();
            selectedFiles = [];
            updateFilePreview();
            updateStats();
            
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '🚀 Upload Media';
        }

gallery = document.querySelector(".gallery-link a");
gallery.addEventListener('click', () => {
    alert(" Available soon! ")
})