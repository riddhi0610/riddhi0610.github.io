  var typed=new Typed(".text", {
    strings:["Software Engineer", "Youtuber", "Web Developer", "Lead Event Coordinator", "Student", "Game Developer", "Certified Consultant Associate", "Dancer"],
    typeSpeed:80,
    backSpeed:80,
    backDelay:1000,
    loop:true
  });

  let menu = document.querySelector('#menu-icon');
  let navbar = document.querySelector('.navbar');

  menu.onclick = () => {
    menu.classList.toggle('fa-xmark');
    menu.classList.toggle('fa-bars');

        if(menu.classList.contains('fa-xmark')){
            navbar.style.display = "flex";
        }else{
            navbar.style.display = "none";
        }
    
  };
