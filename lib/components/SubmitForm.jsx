import { h } from "hyperapp";

export function SubmitForm({ to, subject, message, thankYouUrl }) {
    return (
        <form method="POST" action={"https://formspree.io/" + to}>
            <input type="hidden" name="email" value="no-reply@noomorph.com" />
            <input type="hidden" name="_subject" value={subject} />
            <input type="hidden" name="_next" value={thankYouUrl} />
            <input type="text" name="_gotcha" style="display:none" />
            <input type="hidden" name="message" value={message} />
            <input type="hidden" name="_language" value='ru' />
            <input type="hidden" name="_format" value="plain" />

            <button type="submit">Сохранить результаты</button>
        </form>
    );
}

