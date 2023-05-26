(function () {
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            console.log(data)
            const mainNav = document.getElementById('main-nav');
            mainNav.innerHTML = data;
        })
    ;

    // fetch('footer.html')
    //     .then(response => response.text())
    //     .then(data => {
    //         console.log(data)
    //         const mainNav = document.getElementById('main-footer');
    //         mainNav.innerHTML = data;
    //     })
    // ;
})()