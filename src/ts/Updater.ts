import { App_I } from "./App";
import { Board, Lists } from "./components/board/Board";
import { Card, Card_I } from "./components/board/Card";
import { Cards, List, List_I } from "./components/board/List";
import { BoardSelector } from "./components/sidebar/BoardSelector";
import LSUtil from "./util/LSUtil";

/**
 * Updates DOM elements and saves board to local storage
 */
export default class Updater {
    static boardSelector(app: App_I) {
        Updater.#update(app, "boardSelector", BoardSelector(app));
    }
    static board(app: App_I) {
        Updater.#update(app, "board", Board(app));
    }
    static lists(app: App_I) {
        Updater.#update(app, "lists", Lists(app));
    }
    static list(app: App_I, list: List_I) {
        Updater.#update(app, "list-" + list.id, List(app, list));
    }
    static cards(app: App_I, list: List_I) {
        Updater.#update(app, "cards-" + list.id, Cards(app, list));
    }
    static card(app: App_I, list: List_I, card: Card_I) {
        Updater.#update(app, "card-" + card.id, Card(app, list, card));
    }
    static #update(app: App_I, id: string, e: HTMLElement) {
        const old = document.getElementById(id)!;

        const scrollTop = old.scrollTop;
        const scrollLeft = old.scrollLeft;
        old.replaceWith(e);
        e.scrollTop = scrollTop;
        e.scrollLeft = scrollLeft;

        LSUtil.set(app.board);
    }
}