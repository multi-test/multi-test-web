import classnames from 'classnames';
import style from './style.css';

function Card({ question, className, index, a, b, c, active, enabled }) {
	const overlay = active ? null : (<a key="overlay" href="#back" enabled={enabled} class={style.overlay}>&nbsp;
		<span>№{index}</span>
	</a>);

	return (
		<form class={classnames(['pure-form', style.card, className])}>
			<fieldset>
				<legend>№{index}. {question}</legend>
				<label for={`answer_${index}_a`} class="pure-radio">
					<input type="radio" name={`answer_${index}`} id={`answer_${index}_a`} value="a" />
					&nbsp;{a}
				</label>
				<label for={`answer_${index}_b`} class="pure-radio">
					<input type="radio" name={`answer_${index}`} id={`answer_${index}_b`} value="b" />
					&nbsp;{b}
				</label>
				<label for={`answer_${index}_c`} class="pure-radio">
					<input type="radio" name={`answer_${index}`} id={`answer_${index}_c`} value="c" />
					&nbsp;{c}
				</label>
			</fieldset>
			{overlay}
		</form>
	);
}

export default Card;
