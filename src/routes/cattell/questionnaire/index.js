import { h } from 'preact';
import style from './style';
import Card from '../../../components/card';
import questions from '../resources/questions';

function CattellQuestionnaire({ session }) {
	return (
		<div>
			<h2>Тест Кеттела</h2>
			<div class={style.cattellQuestionnaire}>
				<div class={style.cattellStrip}>
					{questions.map((question, index) => (
						<Card className={style.cattellCard} {...question} index={index + 1} active={index === 1} enabled={index === 0} />
					))}
				</div>
			</div>
		</div>
	);
}

export default CattellQuestionnaire;
