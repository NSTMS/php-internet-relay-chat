export function longPolling() {
    fetch("../php/index.php")
        .then(response => response.text())
        .then(data => {
            // Process the received messages
            if (data) {
                console.log(data);
            }
            longPolling();
        })
        .catch(error => {
            console.error(error);
            setTimeout(longPolling, 5000); // 5 seconds
        });
}

