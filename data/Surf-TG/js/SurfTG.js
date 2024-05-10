    function createPopupForm(event) {
        event.preventDefault();
        var currentPageUrl = window.location.href;
        document.getElementById('parent_dir').value = currentPageUrl;

    }

    function submitCreateForm() {
        document.getElementById('createFolderModal').style.display = 'none';
    }

    function openPostEditPopupForm(event, img, type, size, title, cid, ctype) {
        event.preventDefault();
        document.getElementById('edit_filethumbnail').value = img;
        document.getElementById('edit_file_type').value = type;
        document.getElementById('edit_file_size').value = size;
        document.getElementById('edit_fileName').value = title;
        document.getElementById('edit_file_id').value = cid;
        document.getElementById('edit_file_folder_id').value = ctype;
    }

    function openEditPopupForm(event, img, ctype, cid, title) {
        event.preventDefault();
        document.getElementById('edit_thumbnail').value = img;
        document.getElementById('edit_folderName').value = title;
        document.getElementById('edit_folder_id').value = cid;
        document.getElementById('edit_parent').value = ctype;
    }


    function deleteItem() {
        var parentId = document.getElementById('edit_parent').value;
        var id = document.getElementById('edit_folder_id').value;
        if (confirm("Are you sure you want to delete this item?")) {
            fetch('/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ delete_id: id, parent: parentId })
            })
                .then(response => {
                    if (response.ok) {
                        window.location.href = response.url;
                    } else {
                        console.error('Failed to delete item');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    function submitEditForm() {
        document.getElementById('editFolderModal').style.display = 'none';
    }

    function deleteFileItem() {
        var id = document.getElementById('edit_file_id').value;
        var parentId = document.getElementById('edit_file_folder_id').value;

        if (confirm("Are you sure you want to delete this item?")) {
            fetch('/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ delete_id: id, parent: parentId })
            })
                .then(response => {
                    if (response.ok) {
                        window.location.href = response.url;
                    } else {
                        console.error('Failed to delete item');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    function submitEditFileForm() {
        document.getElementById('editModal').style.display = 'none';
    }


    document.addEventListener("DOMContentLoaded", function () {
        let lazyImages = document.querySelectorAll('.lzy_img');
        let imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    });


    $(document).ready(function () {
        $('#folderSearch').on('input', function () {
            const query = $(this).val().trim();
            if (query.length > 0) {
                searchFolders(query);
            } else {
                $('#folderDropdown').empty();
            }
        });

        function searchFolders(query) {
            $.ajax({
                url: '/searchDbFol',
                method: 'GET',
                data: { query: query },
                success: function (response) {
                    $('#folderDropdown').empty();
                    $('#folderDropdown').append('<option value="" selected disabled>Select a folder</option>');
                    response.forEach(function (folder) {
                        $('#folderDropdown').append(`<option value="${folder._id}">${folder.name}</option>`);
                    });
                    enableSendButton();
                },
                error: function (err) {
                    console.error('Failed to fetch folder names:', err);
                }
            });
        }
    });

    function enableSendButton() {
        $('#sendButton').prop('disabled', false);
    }

    function submitSendForm() {
        $('#folderId').val($('#folderDropdown').val());
        $('#sendPopupForm').submit();
        document.getElementById('sendFileModal').style.display = 'none';
    }
    function checkSendButton() {
        const checkboxes = document.querySelectorAll('.form-check-input');
        let sendButton = document.getElementById('sendButton');
        let selectedIds = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                sendButton.disabled = false;
                selectedIds.push(checkbox.getAttribute('data-id'));
            }
        });

        document.getElementById('selectedIds').value = selectedIds.join(',');
    }


    $(document).ready(function () {
        $('#sendButton').on('click', function () {
            sendPopupForm();
        });
    });
    window.onload = function () {
        var errorPopup = document.getElementById("errorPopup");
        var errorMessage = errorPopup.querySelector("strong").innerText.trim();

        if (errorMessage !== "Oh snap! Invalid username or password") {
            errorPopup.style.display = "none";
        }
    };

    const player = new Plyr('#player', {
        // Options (https://github.com/sampotts/plyr)
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen', 'pip', 'airplay', 'settings', "play-large", 'duration'],
        hideControls: false,
        keyboard: { focused: true, global: true },
        loop: { active: false },
    });

    const videolink = window.location.href;
    const downloadlink = videolink.replace("/watch/", "/");
    function vlc_player() {
        const openDownloadLink = downloadlink;
        const openVlc = `vlc://${openDownloadLink}`;
        window.location.href = openVlc;
    }
    function mx_player_free() {
        const openDownloadLink = downloadlink;
        const openMx = `intent:${openDownloadLink}#Intent;package=com.mxtech.videoplayer.ad;end`;
        window.location.href = openMx;
    }
    function mx_player_paid() {
        const openDownloadLink = downloadlink;
        const openMx = `intent:${openDownloadLink}#Intent;package=com.mxtech.videoplayer.pro;end`;
        window.location.href = openMx;
    }
    function download() {
        const openDownloadLink = downloadlink;
        window.location.href = openDownloadLink;
    }

    function copyUrl() {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                alert('URL copied to clipboard!');
            })
            .catch((error) => {
                console.error('Failed to copy URL: ', error);
            });
    }

    function updateVideoSource() {
        const videoElement = document.getElementById('player');
        const currentUrl = window.location.href;
        const newSrc = currentUrl.replace("/watch/", "/");
        videoElement.src = newSrc;
    }
    window.onload = function () {
        updateVideoSource();
    };
