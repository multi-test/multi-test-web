import { h } from "hyperapp";
import { I18N_CONTINUE } from "../../cattell/resources/labels";

export function Readme({ name, description, onClick }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>
                <button onClick={onClick}>{I18N_CONTINUE}</button>
            </p>
        </div>
    );
}
