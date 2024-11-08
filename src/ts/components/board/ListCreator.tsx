import { mdiListBoxOutline, mdiPlus } from '@mdi/js';
import { App_I } from '../../App';
import Updater from '../../Updater';
import { Icon } from '../misc/Icon';
import { ListObject } from './List';

export function ListCreator(app: App_I) {
    const input = <input class="listCreatorInput" type="text" placeholder="New List" maxlength="16" enterkeyhint="done" />;
    const clickedCreate = () => {
        const title = input.value.trim() || "List";
        app.board.lists.push(ListObject(title));
        Updater.lists(app);
    };

    input.onkeydown = (e: KeyboardEvent) => {
        if (e.key === "Enter")
            clickedCreate();
    };

    return <div class="list listCreator">
        {input}
        <div class="btn listCreatorAddBtn" onclick={clickedCreate}>
            {Icon(mdiListBoxOutline)}
            {Icon(mdiPlus)}
        </div>
    </div>;
}