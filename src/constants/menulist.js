import { noteUrl, tweetUrl } from "./links";

export const menulist = [
    {
        name: "DashBoard",
        icon: "fas fa-chart-line",
        iconColor: "#191970",
        url: "Main",
    },
    {
        name: "Record Score",
        icon: "mdi-brush",
        iconColor: "#191970",
        url: "RecordScore",
    },
    {
        name: "About You",
        icon: "fas fa-user-circle",
        iconColor: "#191970",
        url: "Profile",
    },
    {
        name: "Feedback",
        icon: "fas fa-comment-dots",
        iconColor: "#191970",
        url: "Feedback",
    },
    {
        name: "Share Tweet",
        icon: "fab fa-twitter",
        iconColor: "#1DA1F2",
        url: tweetUrl,
    }, //リンクはtweetUrlから取得する
    {
        name: "Release Note",
        icon: "fas fa-sticky-note",
        iconColor: "#191970",
        url: noteUrl,
    },
    {
        name: "Logout",
        icon: "fas fa-sign-out-alt",
        iconColor: "#191970",
        url: "Top",
    },
];
