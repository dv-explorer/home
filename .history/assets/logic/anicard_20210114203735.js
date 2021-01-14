import { VNS_panel, EL_panel } from './hp_panel.js';
import { init_card_display } from './hp_middle.js';
import { VideoData_Card } from './video_dataset.js';
import { downloads_loading } from './downloads.js';

const VISITED_PAGE_ARR = [];
const VISIT_PAGE = function (page_name = "", callback) {
    if(page_name.length <= 0) {
        return ;
    }
    VISITED_PAGE_ARR.push(page_name);
    callback();
}
let searched;

// const IS_PAGE_EXISTED = function (page_name = "") {
//     if(page_name.length > 0 && VISITED_PAGE_ARR.indexOf(page_name) >= 0) {
//         return true;
//     }

//     return false;
// }

export const vns_method_to_btn_name = str => {
    str = str || "";
    if(typeof str !== "string") return str;
    return str.substring(0, 1).toUpperCase() + str.substring(1);
};

window.onload = function () {
    searched = false;
    // 定位到tab
    VISIT_PAGE("home", openHomepage_ex);

    // setTimeout(() => 
    //     confirm("    目前 \[Homepage页面\] 正处于在结构整理与重建期，目前卡片信息除新增GIF文件以外已经全部导入。交互功能除GIF放大模态框功能外已全部开启。\n\n注：卡片和筛选栏icon图片将在 本周末 统一调整位置后上传，届时将向官网迁移全部内容，其他视觉和交互优化将会在下周陆续完成。 \n\n    2020\/12\/23")
    //     , 2400);
    
    // 搜索框重新绑定
    
    // 导航栏事件绑定
    document.querySelectorAll(".navbar-item").forEach((tab, i, nodes) => {
        let tab_name = tab.getAttribute("name");
        let callback;
        tab.onclick = function() {
            navRelocation(tab_name);
            if(tab_name === "home") {
                callback = openHomepage_ex;
            }
            if(tab_name === "video-dataset") {
                callback = openVideoDataset;
            }
            
            if(tab_name === "downloads") {
                callback = openDownloads;
            }

            if(tab_name === "about") {
                callback = openAbout;
            }

            VISIT_PAGE(tab_name, callback);
        };
    });
    
}

function navRelocation(name = "") {
    name = name || "home";
    // console.log(name + " tab clicked.");

    document.querySelectorAll(".navbar-item").forEach((tab, i, nodes) => {
        if(tab.getAttribute("name") === name) {
            if(!tab.classList.contains("active")) {
                tab.classList.add("active");
            }
        } else {
            if(tab.classList.contains("active")) {
                tab.classList.remove("active");
            }
        }
    });

    document.querySelector("main").innerHTML = "";
}

/* page loading methods */
function openHomepage_ex() {
    $.ajax({
        // url: "https://jkalan6991.gitee.io/video-explorer/assets/static/homepage_ex.html",
        url: "./assets/static/homepage_ex.html",
        type: "get",
        contentType: "text/html",
        dataType: "html",
        success: function(res) {
            document.querySelector("main").innerHTML = res;
            Homepage_ex_loading();
        }
    });
}


function openVideoDataset() {
    $.ajax({
        // url: "https://jkalan6991.gitee.io/video-explorer/assets/static/videodataset.html",
        url: "./assets/static/videodataset.html",
        type: "get",
        contentType: "text/html",
        dataType: "html",
        success: function(res) {
            document.querySelector("main").innerHTML = res;
            videoDataset_loading();
        }
    });
}


function openDownloads() {
    $.ajax({
        // url: "https://jkalan6991.gitee.io/video-explorer/assets/static/downloads.html",
        url: "./assets/static/downloads.html",
        type: "get",
        contentType: "text/html",
        dataType: "html",
        success: function(res) {
            document.querySelector("main").innerHTML = res;
            downloads_loading();
        }
    });
}


function openAbout() {
    $.ajax({
        // url: "https://jkalan6991.gitee.io/video-explorer/assets/static/about.html",
        url: "./assets/static/about.html",
        type: "get",
        contentType: "text/html",
        dataType: "html",
        success: function(res) {
            document.querySelector("main").innerHTML = res;
            $("#official-side").tooltip({ title: "learn more about iDVx Lab" });
        }
    });
}


function Homepage_ex_loading() {
    const sidebar_node = document.getElementById("sidebar-ex");
    const card_display_node = document.getElementById("card-display-ex");

    const vns_extraNode_html = `<span class="scrollSpy-btn-stop"></span>`;
    const vns_extraClass_toA_arr = ["${VNS_tag}"];
    const vns_extraAttribute_toA = {href: "#${VNS_tag}"};
    const el_extraClass_toA_arr = ["el-${EL_tag}", "active"];

    VNS_panel.appendTo(sidebar_node, vns_extraNode_html, vns_extraClass_toA_arr, vns_extraAttribute_toA, vns_method_to_btn_name);
    EL_panel.appendTo(sidebar_node, "", el_extraClass_toA_arr, {});

    init_card_display(card_display_node);
    searchBox_EventListener(card_display_node);
    modal_EventListener();
}

/* homepage init related methods */
function searchBox_EventListener(card_display_node = new HTMLElement()) {
    const SEARCH_BOX = document.querySelector(".searchbox-input");
    const BUTTON = document.querySelector(".searchbox-button");

    document.querySelector(".searchbox-button").onclick = () => {
        let search_text = document.querySelector(".searchbox-input").value;
        init_card_display(card_display_node, search_text);
        searched = true;
    }
    document.querySelector(".searchbox-input").onfocus = () => {
        document.querySelector(".searchbox-input").value = "";
        if(searched) {
            init_card_display(card_display_node);
        }
    }
    // document.querySelector(".searchbox-input").onblur = () => {
    //     let search_text = document.querySelector(".searchbox-input").value;
    //     document.querySelector(".searchbox-input").value = search_text ? search_text: "Search";
    // }
    document.querySelector(".searchbox-input").addEventListener('keydown', (event) => {
        let keyCode =  event.keyCode || event.which;
        if( keyCode === 13) {
            let search_text = document.querySelector(".searchbox-input").value;
            init_card_display(card_display_node, search_text);
            searched = true;
        }
    });
}

function modal_EventListener () {
    const modal_content_node = document.querySelector(".modal-content");
    $('#zooming-modal').on('hidden.bs.modal', function() {
        modal_content_node.className = "modal-content";
    });
    $('.modal-title').tooltip({title: "visit the data video"});
}


/* video dataset page init method */
const video_dataset_url = "./assets/json/video_dataset.json";
function videoDataset_loading() {
    const video_deck_node = document.querySelector(".video-deck");
    const empty_deck_node = document.querySelector("#empty-deck-single");

    $.getJSON(video_dataset_url, json => {

        // console.log("Cards loading ......");

        $.each(json, (i, video_item) => {
            // create card object
            let {
                id, video_title, year, video_source, video_link
            } = video_item;

            let vd_object = new VideoData_Card(video_item);

            // insert card object to the deck
            vd_object.appendTo(video_deck_node, empty_deck_node);

            if(i === json.length - 1) {
                // console.log("All cards were loaded on the page.");
            }
        });
    });
}
