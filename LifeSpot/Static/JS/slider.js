document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    let slideCount = slides.length;
    let slideWidth = slides[0].clientWidth;
    let autoScrollInterval;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dot');
    window.addEventListener('resize', () => {
        slideWidth = slides[0].clientWidth;
        updateSliderPosition();
    });
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoScroll();
    });
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoScroll();
    });
    function goToSlide(index) {
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }

        currentIndex = index;
        updateSliderPosition();
        updateDots();
    }
    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }
    slider.addEventListener('mousedown', dragStart);
    slider.addEventListener('touchstart', dragStart);
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('touchmove', drag);
    slider.addEventListener('mouseup', dragEnd);
    slider.addEventListener('mouseleave', dragEnd);
    slider.addEventListener('touchend', dragEnd);
    function dragStart(e) {
        if (e.type === 'touchstart') {
            startPos = e.touches[0].clientX;
        } else {
            startPos = e.clientX;
            e.preventDefault();
        }
        isDragging = true;
        slider.style.transition = 'none';
        clearInterval(autoScrollInterval);
    }
    function drag(e) {
        if (!isDragging) return;
        let currentPosition;
        if (e.type === 'touchmove') {
            currentPosition = e.touches[0].clientX;
        } else {
            currentPosition = e.clientX;
        }
        const diff = currentPosition - startPos;
        currentTranslate = prevTranslate + diff;
        slider.style.transform = `translateX(calc(-${currentIndex * slideWidth}px + ${diff}px))`;
    }
    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -100 && currentIndex < slideCount - 1) {
            currentIndex += 1;
        }
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1;
        }
        slider.style.transition = 'transform 0.5s ease';
        updateSliderPosition();
        updateDots();
        prevTranslate = currentIndex * -slideWidth;
        resetAutoScroll();
    }
    updateSliderPosition();
    startAutoScroll();
});