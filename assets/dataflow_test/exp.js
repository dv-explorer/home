// This is not a visible page in main page window
// It's a data workflow test page work for exp.html (if exp.html is solely set to main page)

import { homeAPI } from "../logic/hp_data.js";
window.onload = function () {
    let start = new Date().getTime();
    let result = homeAPI(["elements added to visualization"], false, true);
    let result_print = result.print();
    let end = new Date().getTime();
    console.log(result);

    let result_string = "\<strong\>Response\<\/strong\>\&nbsp\;=\&nbsp\;\{\<br\>\<br\>";
    Object.keys(result_print).forEach((key, i, keyArr) => {
        result_string = result_string + `\&nbsp\;\&nbsp\;\&nbsp\;\&nbsp\;${key}: \[${result_print[key]}\] \, \<br\>\<br\>`;
    });
    result_string  = result_string + "\&nbsp\;\}\<br\>";
    document.getElementById("data-display").innerHTML = "";
    document.getElementById("timer").innerHTML = "";
    document.getElementById("data-display").innerHTML = result_string;
    document.getElementById("timer").innerHTML = `Running time length: ${end - start}ms.`;
}