export function Icon(path: string, className = "", onclick?: any) {
    return <svg class={"icon " + className} viewBox="0 0 24 24" onclick={onclick}><path d={path} /></svg>;
}

export function SmallIcon(path: string, className = "", onclick?: any) {
    return Icon(path, "iconSmall " + className, onclick);
}