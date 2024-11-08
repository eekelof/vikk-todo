import { Board_I, BoardObject } from "../components/board/Board";
import { ListObject } from "../components/board/List";
import { ConfirmBox } from "../components/misc/ConfirmBox";
import { BG_COLORS } from "./Constants";
import LSUtil from "./LSUtil";

export default class Util {
    static getBoardOnStart() {
        const selected = localStorage.getItem("selectedBoard")!;
        const board = LSUtil.get(selected);
        return board || Util.createBoard("New Board", 0);
    }
    static createBoard(id = "New Board", color = Math.floor(Math.random() * BG_COLORS.length)): Board_I {
        const todoList = ListObject("Todo");
        const doingList = ListObject("Doing");
        const doneList = ListObject("Done");
        const board = BoardObject(id, color, [todoList, doingList, doneList]);
        LSUtil.set(board);
        return board;
    }
    static getAvailableBoardId(suggestion: string) {
        let id = suggestion;
        const ids = LSUtil.getIDs();
        for (let i = 2; ids.includes(id); i++)
            id = suggestion + " " + i;
        return id;
    }
    static showConfirmBox(text: string, name: string, onConfirm: () => void) {
        document.body.append(ConfirmBox(text, name, onConfirm));
    }
    static setColor(color: number) {
        const c = BG_COLORS[color % BG_COLORS.length];
        const r = document.querySelector(":root") as HTMLElement;
        r.style.setProperty('--bg', c[0]);
        r.style.setProperty('--bgBlob1', c[1]);
        r.style.setProperty('--bgBlob2', c[2]);
        r.style.setProperty('--bgBlob3', c[3]);
    }
}