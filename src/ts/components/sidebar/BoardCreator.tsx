import { mdiBulletinBoard, mdiDownload, mdiPlus, mdiUpload } from '@mdi/js';
import { App_I } from '../../App';
import Updater from '../../Updater';
import UDUtil from '../../util/UDUtil';
import Util from '../../util/Util';
import { Icon } from '../misc/Icon';

export function BoardCreator(app: App_I) {
    const clickedCreate = () => {
        const board = Util.createBoard();
        app.board = board || app.board;
        Updater.board(app);
        Updater.boardSelector(app);
    };

    return <div class="boardCreator">
        <div class="btn boardCreatorAddBtn" onclick={clickedCreate}> {Icon(mdiBulletinBoard)} {Icon(mdiPlus)}</div>
        <div class="btn boardCreatorUploadBtn" onclick={() => UDUtil.upload(app)}> {Icon(mdiUpload)} </div>
        <div class="btn boardCreatorDownloadBtn" onclick={() => UDUtil.download(app)}> {Icon(mdiDownload)} </div>
    </div>;
}