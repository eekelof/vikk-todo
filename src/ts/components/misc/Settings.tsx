import { mdiGithub, mdiThemeLightDark } from "@mdi/js";
import LSUtil from "../../util/LSUtil";
import { SmallIcon } from "./Icon";

export function Settings() {
    const toggleTheme = () => {
        document.body.classList.toggle("light");
        LSUtil.setTheme(document.body.classList.contains("light"));
    };
    if (LSUtil.getTheme())
        toggleTheme();

    return <div id="settings">
        <div class="themeToggle" onclick={() => toggleTheme()}>
            {SmallIcon(mdiThemeLightDark, "themeToggleIcon")}
        </div>
        <a href="https://github.com/eekelof/vikk-todo" target="blank" class="githubLink">
            {SmallIcon(mdiGithub, "githubLinkIcon")}
        </a>
    </div>;
}