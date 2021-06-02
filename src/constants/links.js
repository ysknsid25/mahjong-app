export const noteUrl = "https://note.com/mahjanager";
export const googleFormUrl = "https://forms.gle/516aKVUFosamNFFb6";

const getTweetUrl = () => {
    const twitterUtl = "https://twitter.com/intent/tweet?";
    const url = encodeURIComponent(location.href);
    const tweet = "";
    const hashTags = "Mahjanager";
    return (
        twitterUtl + "text=" + tweet + "&hashtags=" + hashTags + "&url=" + url
    );
};

export const tweetUrl = getTweetUrl();
