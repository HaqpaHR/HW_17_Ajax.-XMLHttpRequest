const wrapper = document.createElement("div");
wrapper.className = "wrapper";
const url = "https://rickandmortyapi.com/api/character/?page=";
let page = 1;

function getData(url, onSuccess,onError, onStart, onEnd, onLast){
    const xhr = new XMLHttpRequest();
    
    xhr.open("GET", url)
    xhr.responseType = "json";

    xhr.onload = function() {
        if(xhr.status === 200){
            onSuccess(xhr.response);
            if(xhr.response.info.next === null){
                return onLast()
            }
        }else{
            onError(xhr.response);
        }
        onEnd()
    };
    
    xhr.onerror = function () {
        onError("Error sending request or Last Page");
        
    };

    xhr.onabort = function(){
        console.log("Abort");
        onEnd();
    };

    onStart();

    xhr.send();
};

function createListOfNames(characters){

    const list = document.createElement("ul");

    for(let names of characters){
        const listItem = document.createElement("li");
        listItem.innerText = names.name;

        list.append(listItem)
    }

    return list
};

function createButton(title){
    const button = document.createElement("button");
    button.innerText = title;

    button.addEventListener("click", (event) => {
        function onSuccess(data){
            const list = createListOfNames(data.results);
            const wrapper = document.querySelector(".wrapper");
            wrapper.append(list)
        };

        function onStart(){
            event.target.innerText = "Getting data...";
            event.target.disabled = true;
        };

        function onError(err) {
            console.error(err);
        }

        function onEnd(){
            event.target.innerText = "GET DATA";
            event.target.disabled = false;
        };
        function onLast(){
            
            event.target.innerText = "LAST PAGE!";
            event.target.disabled = true;
        };

        getData(url + page++, onSuccess, onError, onStart, onEnd, onLast);
    })
    return button;
};

document.body.prepend(createButton("GET DATA"));
document.body.appendChild(wrapper)