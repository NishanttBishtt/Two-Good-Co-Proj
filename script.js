function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true,
        multiplier: 1.2, // Adjust speed
        smartphone: { smooth: true, breakpoint: 0 }, // Enable smooth scrolling on mobile
        tablet: { smooth: true }
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.querySelector(".main").style.transform
            ? "transform"
            : "fixed"
    });

    // Fix: Ensure ScrollTrigger refreshes properly
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 1000); // Small delay to ensure proper loading
}
locomotiveAnimation();

function navbarAnimation() {
    gsap.to("#nav-part1 svg", {
        transform: "translateY(-100%)",
        scrollTrigger: {
            trigger: "#page1",
            scroller: ".main",
            start: "top 0",
            end: "top -5%",
            scrub: true,
            pin: window.innerWidth > 768 // Disable pinning on mobile
        }
    });

    gsap.to("#nav-part2 #links", {
        transform: "translateY(-100%)",
        opacity: 0,
        duration: 0.4,
        scrollTrigger: {
            trigger: "#page1",
            scroller: ".main",
            start: "top 0",
            end: "top -5%",
            scrub: true,
        }
    });
}
navbarAnimation();

function videoContainerAnimation() {
    var container = document.querySelector("#video-container");
    var play = document.querySelector(".play");

    container.addEventListener("mouseenter", () => {
        gsap.to(play, { opacity: 1, scale: 1, duration: 0.6 });
    });

    container.addEventListener("mouseleave", () => {
        gsap.to(play, { opacity: 0, scale: 0 });
    });

    function movePlayButton(e) {
        let x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        let y = e.clientY || (e.touches ? e.touches[0].clientY : 0);
        gsap.to(play, { left: x - 50, top: y - 40, ease: "back.out" });
    }

    container.addEventListener("mousemove", movePlayButton);
    container.addEventListener("touchmove", movePlayButton); // Fix for touch devices
}
videoContainerAnimation();

function loadingAnimation() {
    gsap.from("#page1 h1", {
        y: -60,
        opacity: 0,
        stagger: 0.2,
        delay: 0.5,
        duration: 0.7
    });

    gsap.from("#video-container", {
        scale: 0.8,
        opacity: 0,
        delay: 1.3,
        duration: 0.5
    });
}
loadingAnimation();

function productAnimation() {
    gsap.from(".box", {
        y: 300,
        opacity: 0,
        stagger: 0.3, // Faster stagger for smoother effect
        duration: 1,
        scrollTrigger: {
            trigger: "#page3",
            scroller: ".main",
            start: "top 80%", // Adjusted for better mobile trigger
            end: "top 0",
            scrub: 2
        }
    });
}
productAnimation();

function footerAnimation() {
    gsap.from(".footer", {
        y: -80,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
            trigger: "#page5",
            scroller: ".main",
            start: "top 80%", // Adjusted trigger point
            scrub: 3,
            end: "top 50%"
        },
        stagger: 0.5
    });
}
footerAnimation();

// 🔄 Force ScrollTrigger to refresh after resize
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        console.log("ScrollTrigger refreshed on resize");
    }, 500);
});
