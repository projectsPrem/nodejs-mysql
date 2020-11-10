function loadComments() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 & this.status == 200) {
            document.getElementById('comments').innerHTML = " "

            var result = this.responseText;
            var results = JSON.parse(result)
            results.forEach((comment) => {
                //rendering dom elements
                var node = document.createElement("div")
                var name = document.createElement("h4")
                var date = document.createElement('p')
                var message = document.createElement('h4')
                var divider = document.createElement('hr')

                node.className = "card-body"
                name.className = "card-title"
                date.className = "card-subtitle text-muted"

                var textName = document.createTextNode(comment.userName);
                var textDate = document.createTextNode(comment.date);
                var textMessage = document.createTextNode(comment.comment);


                name.appendChild(textName);
                date.appendChild(textDate);
                message.appendChild(textMessage);


                node.appendChild(name)
                node.appendChild(date)
                node.appendChild(message);
                node.appendChild(divider);

                document.getElementById('comments').appendChild(node)


            });
        }
    }

    xhttp.open('GET', '/home', true);
    //(requestMethod,?url,asynchronous)
    xhttp.send();

}

function insertComment() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respone = this.responseText;
            console.log(respone)
            loadComments();
        }
    }
    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;

    xhttp.open("POST", "/insert", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send('{"name":"' + name + '", "message":"' + message + '"}');

}