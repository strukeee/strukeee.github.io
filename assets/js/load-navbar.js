document.addEventListener('DOMContentLoaded', function() {
    // 加载导航栏
    const baseUrl = window.location.origin;
    fetch(`/components/navbar.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;

            // 设置当前活动页面的导航项高亮
            const currentPage = window.location.pathname.split('/').pop();
            const navLinks = document.querySelectorAll('.nav-link');

            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop();
                if (linkPage === currentPage ||
                    (currentPage === '' && linkPage === 'index.html')) {
                    link.classList.add('active');
                }
            });
        });
});