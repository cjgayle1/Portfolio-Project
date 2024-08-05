

document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');

    closePopup.onclick = function() {
        popup.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    }
    
    
    let rightBox = document.querySelector('.right');
    let scrollPosition = 0;

    window.addEventListener('wheel', function(e) {
        const delta = e.deltaY;
        const rightBoxRect = rightBox.getBoundingClientRect();
        const atBottom = rightBox.scrollHeight - rightBox.scrollTop <= rightBox.clientHeight + 1; // Allow a 1px threshold for bottom
        const atTop = rightBox.scrollTop <= 1; // Allow a 1px threshold for top
        const isScrollingDown = delta > 0;
        const isScrollingUp = delta < 0;
        scrollPosition = document.documentElement.scrollTop || document.body.scrollTop; // Update the scroll position manually

        
        // When the page is scrolled to the top, and user attempts to scroll up
        if (isScrollingUp && scrollPosition === 0) {
            e.preventDefault(); // Prevent window from attempting to scroll further up
            if (!atTop) {
                // If the .right box isn't at its top, scroll it up
                rightBox.scrollTop += delta; // This moves the box up because delta is negative
            }
            return;
        }


        // Normal scrolling inside .right box conditions
        if ((isScrollingDown && !atBottom)) {
            e.preventDefault();
            rightBox.scrollTop += delta;
        }


        // No need for an additional condition for natural window scroll behavior
        // as it's the default action when the event is not prevented.
    }, { passive: false });


    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-90px";
    }
    prevScrollpos = currentScrollPos;
    }

    const themeCircles = document.querySelectorAll('.theme-circle');
    const hoverText = document.querySelector('.button-theme .hover-theme-text');

  themeCircles.forEach(circle => {
    circle.addEventListener('mouseenter', () => {
      // Apply hover effects
      hoverText.style.width = '100%';
      hoverText.style.filter = 'drop-shadow(0 0 23px var(--link-hover-color))';
    });

    circle.addEventListener('mouseleave', () => {
      // Reset hover effects
      hoverText.style.width = '0%';
      hoverText.style.filter = 'none';
    });
  });

// playing with radial light
    // const radialLight = document.createElement('div');
    // radialLight.style.position = 'absolute';
    // radialLight.style.borderRadius = '50%';
    // radialLight.style.backgroundColor = '#1e293b'; // Light color and intensity
    // radialLight.style.pointerEvents = 'none'; // Make sure the light doesn't interfere with mouse events
    // radialLight.style.mixBlendMode = 'screen'; // Blend mode for the light effect
    // radialLight.style.transition = 'background-color 0.3s'; // Smooth transition for the light color
    // radialLight.style.width = '600px'; // Increase the size for a broader light
    // radialLight.style.height = '600px';
    // radialLight.style.opacity = '20%';
    // radialLight.style.background = 'radial-gradient(circle closest-side, #0f172a 40%, #0f172a 70%)';
    // radialLight.style.boxShadow = '0 0 20px 10px #0f172a';
    // radialLight.style.pointerEvents = 'none';
    // radialLight.style.transition = 'opacity 0.3s';

    // document.body.appendChild(radialLight);

    // Update the position of the radial light based on mouse position

    // document.addEventListener('mousemove', function(e) {
    // const x = e.clientX - 300; // Adjust based on the size of the radial light to center it
    // const y = e.clientY - 300; // Adjust based on the size of the radial light to center it
    // radialLight.style.transform = `translate(${x}px, ${y}px)`;
    // });

    // Optional: Change the light intensity based on mouse speed

    // let lastX = 0;
    // let lastY = 0;
    // document.addEventListener('mousemove', function(e) {
    // const deltaX = Math.abs(e.clientX - lastX);
    // const deltaY = Math.abs(e.clientY - lastY);
    // const intensity = Math.min(0.5 + (deltaX + deltaY) / 1000, 1);
    // radialLight.style.backgroundColor = `rgba(255, 255, 255, ${intensity})`;
    // lastX = e.clientX;
    // lastY = e.clientY;
    // });

      

});

// theme handling
function applyTheme(themeName) {
    const theme = themes[themeName];
    Object.keys(theme).forEach(key => {
      document.documentElement.style.setProperty(key, theme[key]);
    });
  }

