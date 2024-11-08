import { mdiChevronDown, mdiChevronLeft, mdiChevronRight, mdiChevronUp, mdiClose, mdiPaletteOutline } from '@mdi/js';
import { App_I } from '../../App';
import Updater from '../../Updater';
import { CARD_COLORS } from '../../util/Constants';
import { SmallIcon } from '../misc/Icon';
import { List_I } from './List';

export interface Card_I {
    id: string;
    title: string;
    color: number;
    fadeIn: boolean;
}

export function CardObject(title: string): Card_I {
    return { id: crypto.randomUUID(), title, color: 0, fadeIn: true };
}

export function Card(app: App_I, list: List_I, card: Card_I) {
    const clickedColor = () => {
        card.color = (card.color + 1) % CARD_COLORS.length;
        Updater.card(app, list, card);
    };

    const clickedRemove = () => {
        const i = list.cards.indexOf(card);
        list.cards.splice(i, 1);
        Updater.cards(app, list);
    };

    const clickedMove = (dir: number) => {
        card.fadeIn = true;
        const i = list.cards.indexOf(card);
        const j = i + dir;
        if (j < 0 || j >= list.cards.length)
            return;
        list.cards[i] = list.cards[j];
        list.cards[j] = card;
        Updater.cards(app, list);
    };

    const clickedMoveToList = (dir: number) => {
        card.fadeIn = true;
        const i = app.board.lists.indexOf(list);
        const nlist = app.board.lists[i + dir];
        if (!nlist)
            return;
        clickedRemove();
        nlist.cards.push(card);
        Updater.cards(app, nlist);
    };

    const fadeIn = card.fadeIn ? " fadeIn" : "";
    card.fadeIn = false;

    const className = (card.color == 0 ? "card" : "card cardColored") + fadeIn;
    return <div id={"card-" + card.id} class={className} style={{ backgroundColor: CARD_COLORS[card.color] }}>
        {card.title}
        {SmallIcon(mdiPaletteOutline, "cardIconColor", clickedColor)}
        {SmallIcon(mdiClose, "", clickedRemove)}
        {SmallIcon(mdiChevronUp, "cardIconUp", () => clickedMove(-1))}
        {SmallIcon(mdiChevronDown, "cardIconDown", () => clickedMove(1))}
        {SmallIcon(mdiChevronLeft, "cardIconLeft", () => clickedMoveToList(-1))}
        {SmallIcon(mdiChevronRight, "cardIconRight", () => clickedMoveToList(1))}
    </div >;
}