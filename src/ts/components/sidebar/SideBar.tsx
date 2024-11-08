import { mdiBulletinBoard, mdiChevronLeft } from '@mdi/js';
import { App_I } from '../../App';
import { Icon } from '../misc/Icon';
import { BoardCreator } from './BoardCreator';
import { BoardSelector } from './BoardSelector';

export function SideBar(app: App_I) {
    const clickedHide = () => {
        document.getElementById("sidebar")!.classList.toggle("sidebarHidden");
        document.getElementById("board")!.classList.toggle("boardExpanded");
    };

    return <div id="sidebar">
        {BoardSelector(app)}
        <div class="sidebarTitle">
            <div class="hideToggle" onclick={clickedHide}> {Icon(mdiChevronLeft)} </div>
            {Icon(mdiBulletinBoard)}
            <div class="sidebarTitleText">Vikk Todo</div>
        </div>
        {BoardCreator(app)}
    </div>;
}