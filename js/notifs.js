function isMobile() {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
}
if (isMobile()) {
    document.body.classList.add("mobile");
    scrollToShow = 330
}




var notifsAmount = 0;
var target = document.getElementById("notif");

function loadNotif(cclass, ttext, func) {
    var thisNotif = notifsAmount;
    notifsAmount += 1;
    const newDiv = document.createElement('div');
    newDiv.className = 'notifHolder';
    newDiv.id = 'notifHolder' + thisNotif.toString()
    if (cclass != "blue") {
        newDiv.innerHTML = `
        <input onclick="removeNotif(${thisNotif}, true)" type="image" src="pics/main/notif/x.webp" width="50px" class="xButton">
        <div class="${cclass}">
            <img src="pics/main/notif/${cclass}.webp" width="50px">
            <p class="notifText">${ttext}</p>
            <div class="timeLine"></div>
        </div>
        `;
    }
    else {
        newDiv.innerHTML = `
        <input onclick="removeNotif(${thisNotif}, true)" type="image" src="pics/main/notif/x.webp" width="50px" class="xButton">
        <div class="${cclass}">
            <div style="display: flex;">
                <img src="pics/main/notif/${cclass}.webp" width="50px" style="margin-right: 20%">
                <button class="confirmButton" onclick="${func}(); removeNotif(${thisNotif}, true)">Yes</button>
                <button class="confirmButton" onclick="removeNotif(${thisNotif}, true)">No</button>
            </div>
            <p class="notifText">${ttext}</p>
            <div class="timeLine"></div>
        </div>
        `;
    }
    target.insertAdjacentElement('afterend', newDiv);
    removeNotif(thisNotif, false);
}

function removeNotif(toRemove, removeUsingButton) {
    const theNotif = document.getElementById("notifHolder" + toRemove)
    if (!removeUsingButton) {
        setTimeout(() => {
            theNotif.style.animation = "backTop"
            theNotif.style.animationDuration = "0.5s"
        }, 8000
        )
    
        setTimeout(() => {
            if (theNotif) {
                theNotif.remove()
            }
        }, 8200
        )
    }
    else {
        theNotif.style.animation = "backTop"
        theNotif.style.animationDuration = "0.5s"
        setTimeout(() => {
            if (theNotif) {
                theNotif.remove()
            }
        }, 200
        )
    }
}



const menu = document.getElementById("burgerMenu");
function switchBurgerMenu() {
    if (menu.style.display == "flex") {
        menu.style.display = "none";
    }
    else{
        menu.style.display = "flex";
    }
}
