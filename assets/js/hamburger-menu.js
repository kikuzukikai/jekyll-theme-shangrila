/* Copyright (c) 2017 MvvmCross */var hamburgerMenu=openMenu("hamburger-menu");function openMenu(id){var element=document.getElementById(id);return function(){with(element.style){left=(left==="0px")?"-284px":"0px";}};}
$(document).click(function(){$('#hamburger-menu').toggle(flip++%2==1);});
