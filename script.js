document.addEventListener("DOMContentLoaded", function () {
    const brandVideoSection = document.getElementById("brand-video");
    const socialWallSection = document.getElementById("social-wall");
    const brandVideo = document.getElementById("brandVideo");
    const socialWallContainer = document.querySelector('#social-wall .wbctA');
    let autoScrollInterval;
    let scrollWatchdogInterval;
    let lastScrollTop = 0;

    // Function to save the current scroll position
    function saveScrollPosition() {
        if (socialWallContainer) {
            localStorage.setItem('scrollPosition', socialWallContainer.scrollTop);
        }
    }

    // Function to restore the scroll position
    function restoreScrollPosition() {
        if (socialWallContainer) {
            const savedPosition = localStorage.getItem('scrollPosition');
            if (savedPosition !== null) {
                setTimeout(() => {
                    socialWallContainer.scrollTop = parseFloat(savedPosition);
                }, 500);
            }
        }
    }

    // Play the brand video, then show the social wall
    brandVideo.onended = function () {
        brandVideoSection.style.display = "none";
        socialWallSection.style.display = "block";
    
        // Trigger a resize event to force re-render
        window.dispatchEvent(new Event('resize'));
    
        setTimeout(() => {
            restoreScrollPosition(); // Restore scroll position
            startAutoScroll(); // Start the auto-scrolling
            startScrollWatchdog(); // Monitor scroll activity
        }, 1000); 
    };
    

    // Automatically reload the page every 1 minute for testing
    setTimeout(function () {
        window.location.reload();
    }, 1.8 * 60 * 1000); 

    function startAutoScroll() {
        function autoScroll() {
            if (socialWallContainer) {
                socialWallContainer.scrollBy({
                    top: 1,
                    behavior: 'smooth'
                });

                saveScrollPosition(); // Save scroll position

                if (socialWallContainer.scrollTop + socialWallContainer.clientHeight >= socialWallContainer.scrollHeight) {
                    socialWallContainer.scrollTop = 0; // Reset to the top
                }
            }
        }

        autoScrollInterval = setInterval(autoScroll, 30);
    }

    function startScrollWatchdog() {
        scrollWatchdogInterval = setInterval(function () {
            if (socialWallContainer.scrollTop === lastScrollTop) {
                console.log("Scroll position stuck, reloading content...");
                reloadSocialWall(); // Reload the social wall content
            }
            lastScrollTop = socialWallContainer.scrollTop;
        }, 60000);
    }

    // Reload the social wall content by reloading the script
    function reloadSocialWall() {
        if (socialWallContainer) {
            const wbctB = document.querySelector('.wbctB');
            if (wbctB) {
                socialWallContainer.removeChild(wbctB); // Remove the old content
            }
            // Recreate the embed
            const newDiv = document.createElement('div');
            newDiv.classList.add('wbctB');
            newDiv.setAttribute('data-val', 'yqz46'); // Use the same data-val
            socialWallContainer.appendChild(newDiv);

            // Re-run the script to load Onstipe content again
            const script = document.createElement('script');
            script.defer = true;
            script.src = "https://onstipe.com/web/js/webembed.js";
            document.body.appendChild(script);
        }
    }

    // Save scroll position before unloading the page
    window.addEventListener('beforeunload', saveScrollPosition);

    // Reload the social wall every 10 minutes to refresh the content
    setInterval(reloadSocialWall, 10 * 60 * 1000); 
});








