import { mdiArrowLeft, mdiTrashCan } from "@mdi/js";
import { SmallIcon } from "./Icon";

export function ConfirmBox(text: string, name: string, onConfirm: () => void) {
    const clickedCancel = () => e.remove();
    const clickedConfirm = () => {
        onConfirm();
        e.remove();
    };

    const e = <div class="confirmBox" onclick={clickedCancel}>
        <div class="confirmBoxInner">
            <div class="confirmBoxText">{text}</div>
            <b>{name}</b>
            {SmallIcon(mdiArrowLeft, "confirmBoxCancel", clickedCancel)}
            {SmallIcon(mdiTrashCan, "confirmBoxConfirm", clickedConfirm)}
        </div>
    </div>;
    return e;
}