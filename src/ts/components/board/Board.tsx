import { App_I } from '../../App';
import Util from '../../util/Util';
import { List, List_I } from './List';
import { ListCreator } from './ListCreator';

export interface Board_I {
    id: string;
    created: number;
    color: number;
    lists: List_I[];
}

export function BoardObject(id: string, color: number, lists: List_I[]): Board_I {
    return { id: Util.getAvailableBoardId(id), created: Date.now(), color, lists };
}

export function Board(app: App_I) {
    Util.setColor(app.board.color);

    return <div id="board">
        <div id="boardTitle">{app.board.id}</div>
        {Lists(app)}
    </div>;
}

export function Lists(app: App_I) {
    return <div id="lists">
        {app.board.lists.map(list => List(app, list))}
        {ListCreator(app)}
    </div>;
}