import { CSSProperties, useState } from 'react';
import styles from 'components/app/App.module.scss';
import { defaultArticleState } from 'src/constants/articleProps';
import clsx from 'clsx';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setNewParams={setArticleState}/>
			<Article />
		</div>
	);
};