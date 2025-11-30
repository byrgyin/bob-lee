import "./footer.scss";
console.log('footer');
if (document.querySelector('.footer__year')) document.querySelector('.footer__year').textContent = new Date().getFullYear();