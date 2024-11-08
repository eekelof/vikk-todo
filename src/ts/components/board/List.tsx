import { mdiChevronLeft, mdiChevronRight, mdiTrashCan } from '@mdi/js';
import { App_I } from '../../App';
import Updater from '../../Updater';
import Util from '../../util/Util';
import { SmallIcon } from '../misc/Icon';
import { Card, Card_I, CardObject } from './Card';

export interface List_I {
    id: string;
    title: string;
    cards: Card_I[];
    fadeIn: boolean;
}

export function ListObject(title: string): List_I {
    return { id: crypto.randomUUID(), title, cards: [], fadeIn: true };
}

export function List(app: App_I, list: List_I) {
    const cardInput = <input class="cardInput" type="text" placeholder="New Card" maxlength="512" enterkeyhint="done" />;
    cardInput.onkeydown = (e: KeyboardEvent) => {
        if (e.key != "Enter" || cardInput.value.length === 0)
            return;
        const card = CardObject(cardInput.value);
        list.cards.unshift(card);
        cardInput.value = "";
        Updater.cards(app, list);
    };

    const lists = app.board.lists;

    const clickedRemove = () => {
        const onConfirm = () => {
            const i = lists.indexOf(list);
            lists.splice(i, 1);
            Updater.lists(app);
        };
        if (list.cards.length > 0)
            return Util.showConfirmBox("Delete List?", list.title, onConfirm);
        onConfirm();
    };

    const clickedMove = (dir: number) => {
        list.fadeIn = true;
        const i = lists.indexOf(list);
        const j = i + dir;
        if (j < 0 || j >= lists.length)
            return;
        lists[i] = lists[j];
        lists[j] = list;
        Updater.lists(app);
    };

    const fadeIn = list.fadeIn ? " fadeIn" : "";
    list.fadeIn = false;

    return <div id={"list-" + list.id} class={"list" + fadeIn}>
        <div class="listTitle">{list.title}</div>
        {SmallIcon(mdiTrashCan, "", clickedRemove)}
        {SmallIcon(mdiChevronLeft, "listIconLeft", () => clickedMove(-1))}
        {SmallIcon(mdiChevronRight, "listIconRight", () => clickedMove(1))}
        {cardInput}
        {Cards(app, list)}
    </div>;
}

export function Cards(app: App_I, list: List_I) {
    return <div id={"cards-" + list.id} class="cards">
        {list.cards.map(card => Card(app, list, card))}
    </div>;
}