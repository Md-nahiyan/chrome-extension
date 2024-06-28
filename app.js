
const input = document.getElementById("input");
const saveLink = document.getElementById("btn1");
const tabLink = document.getElementById("btn2");
const deleteLink = document.getElementById("btn3");
const list = document.getElementById("list");

let allLinks = [];

let getLinkFormLocalStorage = JSON.parse(localStorage.getItem("links"))

if (getLinkFormLocalStorage) {
    allLinks = getLinkFormLocalStorage;
    renderArr(allLinks);
}

function renderArr (arr) {
    list.innerHTML = "";
    arr.forEach( item => {
        list.innerHTML += `
          <li><a href="${item}" class="link" target="_blank">${item}</a></li>
        `;
    });
}
//  save Link click//

saveLink.addEventListener("click", ()=> {
    let links = input.value;
    allLinks.push(links);
    input.value = "";
    localStorage.setItem("links", JSON.stringify(allLinks));
    renderArr (allLinks);
})

// Delete link click here //

deleteLink.addEventListener("click", ()=> {
    localStorage.clear();
    allLinks = [];
    // list.innerHTML = "";
    renderArr(allLinks);
})

// current tab link click here//

tabLink.addEventListener("click", ()=> {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = tabs[0].url;
        allLinks.push(activeTab);
        localStorage.setItem("links", JSON.stringify(allLinks));
        renderArr(allLinks);
      });
})