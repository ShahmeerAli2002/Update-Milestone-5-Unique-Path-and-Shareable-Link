document.addEventListener('DOMContentLoaded', function () {
    // Create rain drop animation
    function createRainDrop() {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * window.innerWidth + 'px';
        drop.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        document.body.appendChild(drop);
        setTimeout(() => drop.remove(), 2000);
    }

    function startRain() {
        for(let i = 0; i < 50; i++) {
            setTimeout(createRainDrop, i * 100);
        }
    }

    startRain();

    // Animate text content with fade-in effect
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
    textElements.forEach((element, index) => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.transition = 'opacity 1s';
            element.style.opacity = '1';
        }, index * 200);
    });

    // Function to update profile image from device
    document.getElementById('update-image-btn').addEventListener('click', function() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        
        fileInput.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const profileImage = document.getElementById('profile-image');
                    profileImage.style.animation = 'fadeIn 1s';
                    profileImage.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
        
        fileInput.click();
    });

    // Make text editable on button click with animation
    document.querySelectorAll('.buttons').forEach(button => {
        button.addEventListener('click', function() {
            const parentElement = this.parentElement;
            const textElements = parentElement.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
            textElements.forEach(element => {
                element.style.animation = 'pulse 0.5s';
                element.contentEditable = true;
                element.focus();
            });
        });
    });

    // Download PDF functionality with animation
    document.getElementById('download-btn').addEventListener('click', function() {
        this.style.animation = 'bounce 0.5s';
        const resume = document.getElementById('resume-container');
        html2canvas(resume, { scale: 2 }).then(function(canvas) {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
            pdf.save('resume.pdf');
        });
    });

    // Share functionality with unique link generation and animation
    document.getElementById('share-btn').addEventListener('click', function() {
        this.style.animation = 'bounce 0.5s';
        const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const baseURL = window.location.origin + window.location.pathname;
        const shareableLink = `${baseURL}?resume=${uniqueId}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My Resume',
                text: 'Check out my resume!',
                url: shareableLink
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(shareableLink).then(() => {
                alert('Unique resume link copied to clipboard!');
            });
        }
    });

});