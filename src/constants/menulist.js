import { noteUrl, tweetUrl } from "./links";

export const menulist = [
    {
        name: "DashBoard",
        icon: "fas fa-chart-line",
        iconColor: "#191970",
        url: "Main",
        target: "",
    },
    {
        name: "Record Score",
        icon: "mdi-brush",
        iconColor: "#191970",
        url: "RecordScore",
        target: "",
    },
    {
        name: "About You",
        icon: "fas fa-user-circle",
        iconColor: "#191970",
        url: "Profile",
        target: "",
    },
    {
        name: "Feedback",
        icon: "fas fa-comment-dots",
        iconColor: "#191970",
        url: "Feedback",
        target: "",
    },
    {
        name: "Share Tweet",
        icon: "fab fa-twitter",
        iconColor: "#1DA1F2",
        url: tweetUrl,
        target: "blank",
    }, //リンクはtweetUrlから取得する
    {
        name: "Release Note",
        icon: "fas fa-sticky-note",
        iconColor: "#191970",
        url: noteUrl,
        target: "blank",
    },
    {
        name: "Logout",
        icon: "fas fa-sign-out-alt",
        iconColor: "#191970",
        url: "Top",
        target: "",
    },
];
