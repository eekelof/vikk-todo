import { mdiPalette, mdiPencil, mdiTrashCan } from '@mdi/js';
import { App_I } from '../../App';
import Updater from '../../Updater';
import { BG_COLORS } from '../../util/Constants';
import LSUtil from '../../util/LSUtil';
import Util from '../../util/Util';
import { SmallIcon } from '../misc/Icon';

export function BoardSelector(app: App_I) {
    const ids = LSUtil.getIDs();
    return <div id="boardSelector"> {ids.map(id => BoardCard(app, id))} </div>;
}

function BoardCard(app: App_I, id: string) {
    const input = <input class="boardCardInput" type="text" maxlength="18" enterkeyhint="done" />;
    input.onclick = (e: MouseEvent) => e.stopPropagation();
    input.onkeydown = (e: KeyboardEvent) => {
        if (e.key != "Escape" && e.key != "Enter")
            return;
        LSUtil.remove(app.board.id);
        app.board.id = (e.key == "Enter") ? Util.getAvailableBoardId(input.value.trim()) || app.board.id : app.board.id;
        Updater.board(app);
        Updater.boardSelector(app);
    };
    input.onblur = () => {
        input.style.display = "none";
        inner.style.display = "block";
    };

    const clickedSelect = () => {
        const t = LSUtil.get(id);
        app.board = t || app.board;
        Updater.board(app);
        Updater.boardSelector(app);
    };

    const clickedEdit = (e: MouseEvent) => {
        e.stopPropagation();
        input.style.display = "block";
        inner.style.display = "none";
        input.focus();
        input.value = id;
    };

    const clickedColor = (e: MouseEvent) => {
        e.stopPropagation();
        app.board.color = (app.board.color + 1) % BG_COLORS.length;
        Updater.board(app);
    };

    const clickedRemove = (e: MouseEvent) => {
        e.stopPropagation();
        const onConfirm = () => {
            LSUtil.remove(id);
            Updater.boardSelector(app);
        };
        Util.showConfirmBox("Delete Board?", id, onConfirm);
    };

    const selected = app.board.id === id;

    const inner = <div class="boardCardInner">
        <div class="boardCardTitle">{id}</div>
        {selected ? [SmallIcon(mdiPencil, "boardCardEdit", clickedEdit), SmallIcon(mdiPalette, "boardCardColor", clickedColor)]
            : SmallIcon(mdiTrashCan, "boardCardRemove", clickedRemove)}
    </div>;
    return <div class={"btn boardCard" + (selected ? " boardCardSelected" : "")} onclick={clickedSelect}>
        {inner}
        {input}
    </div>;
}