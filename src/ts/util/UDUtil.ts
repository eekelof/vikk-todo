import { App_I } from "../App";
import Updater from "../Updater";
import Util from "./Util";

export default class UDUtil {
    static upload(app: App_I) {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".json";
        fileInput.onchange = () => {
            const file = fileInput.files?.item(0);
            if (!file)
                return;

            const reader = new FileReader();
            reader.onload = () => {
                const board = JSON.parse(reader.result as string);
                app.board = board;
                app.board.id = Util.getAvailableBoardId(board.id);

                Updater.board(app);
                Updater.boardSelector(app);
            };
            reader.readAsText(file);
        };
        fileInput.click();
    }
    static download(app: App_I) {
        const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(app.board));
        const a = document.createElement("a");
        a.href = data;
        a.download = "board-" + app.board.id + ".json";
        a.click();
    }
}