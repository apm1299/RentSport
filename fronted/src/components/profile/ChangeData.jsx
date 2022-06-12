
const dataId = ['name', 'surnames', 'image', 'email', 'phoneNumber'];
const h2Id = ['h2-name', 'h2-surnames', 'h2-imagen', 'h2-email', 'h2-phoneNumber'];
const svgCheckId = ['svg-name-check', 'svg-surnames-check', 'svg-image-check', 'svg-email-check', 'svg-phoneNumber-check'];
const svgErrorId = ['svg-name-error', 'svg-surnames-error', 'svg-image-error', 'svg-email-error', 'svg-phoneNumber-error'];
const svgEditId = ['svg-name-edit', 'svg-surnames-edit', 'svg-image-edit', 'svg-email-edit', 'svg-phoneNumber-edit'];

export function changeData(number) {
    const data = document.getElementById(dataId[number]);
    const h2 = document.getElementById(h2Id[number]);
    const svgCheck = document.getElementById(svgCheckId[number]);
    const svgError = document.getElementById(svgErrorId[number]);
    const svgEdit = document.getElementById(svgEditId[number]);

    if (data.type === "hidden") {
        data.type = 'text';
        h2.hidden = true;
        svgCheck.removeAttribute("hidden");
        svgError.removeAttribute("hidden");
        svgEdit.setAttribute("hidden", "hidden");
        
    } else {
        data.type = 'hidden';
        h2.hidden = false;
        svgCheck.setAttribute("hidden", "hidden");
        svgError.setAttribute("hidden", "hidden");
        svgEdit.removeAttribute("hidden");
    }
}

export function changeDataImage(number) {
    const data = document.getElementById(dataId[number]);
    const svgCheck = document.getElementById(svgCheckId[number]);
    const svgError = document.getElementById(svgErrorId[number]);
    const svgEdit = document.getElementById(svgEditId[number]);
    if(data.hidden === true){
        data.hidden=false;
        svgCheck.removeAttribute("hidden");
        svgError.removeAttribute("hidden");
        svgEdit.setAttribute("hidden", "hidden");
    }else{
        data.hidden=true;
        svgCheck.setAttribute("hidden", "hidden");
        svgError.setAttribute("hidden", "hidden");
        svgEdit.removeAttribute("hidden");    }
}

export function changePasswordInput() {
    const container = document.getElementById('divChangePassword');
    const arrowUp = document.getElementById('arrow-sm-up');
    const arrowDown = document.getElementById('arrow-sm-down');

    if (container.hidden) {
        container.hidden = false;
        arrowUp.setAttribute("hidden", "hidden");
        arrowDown.removeAttribute("hidden");
    } else {
        container.hidden = true;
        arrowUp.removeAttribute("hidden");
        arrowDown.setAttribute("hidden", "hidden");
    }
}
