import { db, anl } from "../plugins/firebase";
import { createActionHistory } from "./ActionHistory";
/**
 * RoomHistory {
    no,
    uid,
    ymd,
    firstName,
    secondName,
    thirdName,
    fourthName,
    firstScore,
    secondScore,
    thirdScore,
    fourthScore,
    horaHistory {
        no,
        time,
        fromTo,
        yaku
    }
}
 */
export const COLLECTION_ROOM_HISTORY = db.collection("RoomHistory");

export const updateRoomHistory = async (roomInfo) => {
    //テーブル情報があるかどうかを調べる
    //あれば新規作成、無ければ上書き
    //行動履歴の記録
    //アナリティクスに通知
    //Rules側で入力チェックしないといけなくて、エラーの場合は登録画面に戻してきてエラー通知する
};
