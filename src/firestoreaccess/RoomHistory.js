import { db, anl, auth } from "../plugins/firebase";
export const COLLECTION_ROOM_HISTORY = db.collection("RoomHistory");

/**
 * 対局室を登録します。
 * @param {Object} roomInfo
 * @param {Array} horaInfoArr
 * @param {boolean} isNewRoom
 * @return string docId FireStoreへの操作が失敗した場合は空文字
 */
export const createRoomHistory = async (roomInfo) => {
    const uid = await getLoginUid();
    const writeVal = {
        uid: uid,
        ymd: roomInfo.ymd,
        no: roomInfo.battleNo,
        firstName: roomInfo.firstName,
        firstScore: roomInfo.firstScore,
        secondName: roomInfo.secondName,
        secondScore: roomInfo.secondScore,
        thirdName: roomInfo.thirdName,
        thirdScore: roomInfo.thirdScore,
        fourthName: roomInfo.fourthName,
        fourthScore: roomInfo.fourthScore,
    };
    const docId = COLLECTION_ROOM_HISTORY.doc().id;
    const eventName = "RoomHistory Created";
    let isSuccess = await setRoomInfo(docId, writeVal, eventName);
    if (!isSuccess) {
        return "";
    }
    return docId;
};

/**
 * 対局履歴を更新する
 * @param {string} docId
 * @param {Object} scoreInfo
 */
export const updateRoomHistory = async (docId, scoreInfo) => {
    const writeVal = {
        firstName: scoreInfo.first.name,
        firstScore: scoreInfo.first.score,
        secondName: scoreInfo.second.name,
        secondScore: scoreInfo.second.score,
        thirdName: scoreInfo.third.name,
        thirdScore: scoreInfo.third.score,
        fourthName: scoreInfo.fourth.name,
        fourthScore: scoreInfo.fourth.score,
    };
    await COLLECTION_ROOM_HISTORY.doc(docId)
        .update(writeVal)
        .then(() => {
            anl.logEvent("update Room History", {
                function: "updateRoomHistory",
            });
        })
        .catch((error) => {
            anl.logEvent("errorInfo", {
                function: "updateRoomHistory",
                msg: error,
            });
        });
};

/**
 * 対局情報を登録・更新する
 * @param {Objcet} roomInfo
 * @returns boolean isSuccess
 */
const setRoomInfo = async (docId, roomInfo, action) => {
    let isSuccess = false;
    await COLLECTION_ROOM_HISTORY.doc(docId)
        .set(roomInfo)
        .then(() => {
            isSuccess = true;
            anl.logEvent(action, {
                function: "setRoomInfo",
            });
        })
        .catch((error) => {
            anl.logEvent("errorInfo", {
                function: "setRoomInfo",
                msg: error,
            });
        });
    return isSuccess;
};

/**
 * 対局情報を削除する
 * @param {String} docId
 */
export const deleteRoomHistory = (docId) => {
    COLLECTION_ROOM_HISTORY.doc(docId).delete();
};

/**
 * 和了情報を登録・更新する
 * @param {Array} horaInfo
 * @returns boolean isSuccess
 */
export const setHoraInfo = async (docId, horaInfoArr) => {
    let isSuccess = true;
    const SUB_COLLECTION_HORA_HISTORY = COLLECTION_ROOM_HISTORY.doc(
        docId
    ).collection("horaHistory");
    horaInfoArr.map(async (horaInfo) => {
        const horaDocId =
            horaInfo.docId === ""
                ? SUB_COLLECTION_HORA_HISTORY.id
                : horaInfo.docId;
        const action =
            horaInfo.docId === "" ? "create horaInfo" : "update horaInfo";
        await SUB_COLLECTION_HORA_HISTORY.doc(horaDocId)
            .set(horaInfo)
            .then(() => {
                anl.logEvent(action, {
                    function: "setHoraInfo",
                });
            })
            .catch((error) => {
                anl.logEvent("errorInfo", {
                    function: "setHoraInfo",
                    msg: error,
                });
                isSuccess = false;
            });
    });
    return isSuccess;
};

/**
 * ユーザーの直近20件の対局履歴を取得します
 * @param {String} userId
 * @returns
 */
export const getRoomHistoryArr = async () => {
    const uid = await getLoginUid();
    let retArr = [];
    await COLLECTION_ROOM_HISTORY.where("uid", "==", uid)
        .orderBy("no", "desc")
        .limit(20)
        .get()
        .then((roomHistorySnapShot) => {
            roomHistorySnapShot.forEach((doc) => {
                const data = doc.data();
                const tmpObj = {
                    docId: doc.id,
                    uid: uid,
                    ymd: data.ymd,
                    battleNo: data.no,
                    firstName: data.firstName,
                    firstScore: data.firstScore,
                    secondName: data.secondName,
                    secondScore: data.secondScore,
                    thirdName: data.thirdName,
                    thirdScore: data.thirdScore,
                    fourthName: data.fourthName,
                    fourthScore: data.fourthScore,
                };
                retArr.push(tmpObj);
            });
        })
        .catch((error) => {
            console.log(error);
            anl.logEvent("errorInfo", {
                function: "getRoomHistoryArr",
                msg: error,
            });
        });
    return retArr;
};

/**
 * ログイン中のユーザーIDを取得する
 * @returns uid
 */
const getLoginUid = async () => {
    let uid = "";
    await auth.onAuthStateChanged(function(user) {
        if (user) {
            uid = user.uid;
        }
    });
    return uid;
};
