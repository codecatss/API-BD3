function checkJWTToken() {
    const token = localStorage.getItem('jwt');

    if (!token) {
        window.location.href = 'user.login.html';
    }
}

window.addEventListener('load', checkJWTToken);