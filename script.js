function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation()

function navbarAnimation() {
    gsap.to("#nav-part1 svg", {
        transform:"translateY(-100%)",
        scrollTrigger: {
            trigger: "#page1",
            scroller:".main",
            // markers:true,
            start:"top 0",
            end: "top -5%",
            scrub:true
        }
    })
    gsap.to("#nav-part2 #links", {
        transform:"translateY(-100%)",
        opacity:0,
        duration:0.4,
        scrollTrigger: {
            trigger: "#page1",
            scroller:".main",
            // markers:true,
            start:"top 0",
            end: "top -5%",
            scrub:true,
        }
    })
}
navbarAnimation()
function videoContainerAnimation() {
    var container = document.querySelector("#video-container")
    var play = document.querySelector(".play")
    container.addEventListener("mouseenter", function() {
        gsap.to(play, {
            opacity: 1,
            scale: 1,
            duration:0.6
        })
    })
    container.addEventListener("mouseleave", function() {
        gsap.to(play, {
            opacity:0,
            scale:0
        })
    })
    container.addEventListener("mousemove",function(dets) {
        gsap.to(play, {
            left:dets.x-50,
            top:dets.y-40,
            ease:"back.out"
        })
    })
}
videoContainerAnimation()
function loadingAnimation() {
    gsap.from("#page1 h1", {
        y: -60,
        opacity:0,
        stagger:0.2,
        delay:0.5,
        duration: 0.7
    })
    gsap.from("#video-container", {
        scale:0.8,
        opacity:0,
        delay:1.3,
        duration:0.5
    })
}
loadingAnimation()
function productAnimation () {
    gsap.from(".box", {
        // delay:6,
        y:300,
        opacity:0,
        stagger:1.3,
        duration:1,
        scrollTrigger: {
            trigger:"#page3",
            scroller:".main",
            // markers:true,
            start: "top 60%",
            end:"top 0",
            scrub:3
        }
    })
}
productAnimation()


function footerAnimation() {
    gsap.from(".footer", {
        y:-80,
        opacity:0,
        duration:0.7,
        scrollTrigger:{
            trigger:"#page5",
            scroller:".main",
            // markers:true,
            start:"top 70%",
            scrub:4,
            end:"top 70%"
        },
        stagger:0.8
    })
}
footerAnimation()
ScrollTrigger.config({ refreshPriority: 1 });
window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});
