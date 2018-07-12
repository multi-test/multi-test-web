import { h } from "hyperapp";

export function ProfileForm({ name, gender, age }) {
    return (
        <form>
            <div>
                <label>Name</label>
                <input type="text" value={name}></input>
            </div>
            <div>
                <label>Gender</label>
                <input type="text" value={gender}></input>
            </div>
            <div>
                <label>Age</label>
                <input type="text" value={age}></input>
            </div>
        </form>
    );
}