export const noteUrl = "https://note.com/mahjanager";

const getTweetUrl = () => {
    const twitterUtl = "https://twitter.com/intent/tweet?";
    const url = encodeURIComponent(location.href);
    const tweet = "テストtweetだお";
    const hashTags = "Mahjanager";
    return (
        twitterUtl + "text=" + tweet + "&hashtags=" + hashTags + "&url=" + url
    );
};

export const tweetUrl = getTweetUrl();
