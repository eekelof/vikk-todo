import { Board, Board_I } from './components/board/Board';
import { Background } from './components/misc/Background';
import { Settings } from './components/misc/Settings';
import { SideBar } from './components/sidebar/SideBar';
import Util from './util/Util';

export interface App_I {
    board: Board_I
}

function App() {
    const app: App_I = { board: Util.getBoardOnStart() };
    return <div id="app">
        {Background()}
        {Board(app)}
        {SideBar(app)}
        {Settings()}
    </div>;
}
document.body.append(App());