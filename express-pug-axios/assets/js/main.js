
const closeAlert = () => {
    const alert = document.querySelector(".js-alert");
    alert.style.opacity = '0';
    setTimeout(() => alert.remove(), 150);
}