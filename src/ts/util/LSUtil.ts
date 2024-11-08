import { Board_I } from "../components/board/Board";

export default class LSUtil {
    static LS_PREFIX = "lb-" as const;

    static getIDs(): string[] {
        const ids = Object.keys(localStorage).filter(k => k.startsWith(LSUtil.LS_PREFIX));
        const res = ids.map(k => k.slice(LSUtil.LS_PREFIX.length));
        return res.sort((a, b) => LSUtil.get(b)!.created - LSUtil.get(a)!.created);
    }
    static set(board: Board_I) {
        localStorage.setItem(LSUtil.LS_PREFIX + board.id, JSON.stringify(board));
        localStorage.setItem("selectedBoard", board.id);
    }
    static get(id: string): Board_I | null {
        const board = localStorage.getItem(LSUtil.LS_PREFIX + id);
        return board ? JSON.parse(board) : null;
    }
    static remove(id: string) {
        localStorage.removeItem(LSUtil.LS_PREFIX + id);
    }

    static getTheme(): boolean {
        return JSON.parse(localStorage.getItem("theme") ?? "false");
    }
    static setTheme(isLight: boolean) {
        localStorage.setItem("theme", isLight.toString());
    }
}