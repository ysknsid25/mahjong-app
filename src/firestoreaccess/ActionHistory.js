import { db, anl } from "../plugins/firebase";
import { getTimeStamp } from "../constants/cmnfunc";

export const COLLECTION_ACTION = db.collection("ActionHistory");

/**
 * 行動履歴を書き込む
 * @param {String} action
 * @param {String} message
 */
export const createActionHistory = async (action, message) => {
    const actionHistoryRef = COLLECTION_ACTION.doc();
    const actionInfo = {
        action: action,
        datetime: getTimeStamp(),
        message: message,
        //@@ユーザーIDを認証情報から取得する
        userId: "hoge",
    };
    actionHistoryRef.set(actionInfo);
};

/**
 * ユーザーの直近5件の行動履歴を取得します
 * @param {String} userId
 * @returns
 */
export const getActionHistoryArr = async (userId) => {
    let retArr = [];
    await COLLECTION_ACTION.where("userId", "==", userId)
        .limit(5)
        .get()
        .then((actionHistorySnapShot) => {
            actionHistorySnapShot.forEach((doc) => {
                const data = doc.data();
                const tmpObj = {
                    action: data["action"],
                    datetime: data["datetime"],
                    message: data["message"],
                };
                retArr.push(tmpObj);
            });
        })
        .catch((error) => {
            anl.logEvent("errorInfo", {
                function: "getActionHistoryArr",
                msg: error,
            });
        });
    return retArr;
};
