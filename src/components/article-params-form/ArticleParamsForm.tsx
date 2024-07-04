import { useState, FormEvent, useRef } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type TArticleFormProps = {
	setNewParams: (newState: ArticleStateType) => void
}

export const ArticleParamsForm = ({ setNewParams }: TArticleFormProps) => {
	const rootRef = useRef(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [articleParams, setArticleParams] = useState(defaultArticleState);

	function toggleMenu() {
		setIsMenuOpen(!isMenuOpen);
	}

	function handleOptionChange(key: string, option: OptionType) {
		setArticleParams({ ...articleParams, [key]: option });
	}

	function handleSubmitOptions(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setNewParams(articleParams);
	}

	function handleResetOptions() {
		setNewParams(defaultArticleState);
		setArticleParams(defaultArticleState);
	}

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(!isMenuOpen),
		onChange: setIsMenuOpen,
	})

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={toggleMenu} isOpen={isMenuOpen} />
			<aside className={clsx(styles.container, { [styles.container_open]: isMenuOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmitOptions}
					onReset={handleResetOptions}>
					<Text as='h2' weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						options={fontFamilyOptions}
						selected={articleParams.fontFamilyOption}
						onChange={(selected) => {
							handleOptionChange('fontFamilyOption', selected);
						}} />
					<RadioGroup
						name='fontSize'
						title='Размер Шрифта'
						options={fontSizeOptions}
						selected={articleParams.fontSizeOption}
						onChange={(selected) => {
							handleOptionChange('fontSizeOption', selected);
						}}
					/>
					<Select
						title={'Цвет шрифта'}
						options={fontColors}
						selected={articleParams.fontColor}
						onChange={(selected) => {
							handleOptionChange('fontColor', selected);
						}} />
					<Separator />
					<Select
						title={'Цвет фона'}
						options={backgroundColors}
						selected={articleParams.backgroundColor}
						onChange={(selected) => {
							handleOptionChange('backgroundColor', selected);
						}} />
					<Select
						title={'Ширина контента'}
						options={contentWidthArr}
						selected={articleParams.contentWidth}
						onChange={(selected) => {
							handleOptionChange('contentWidth', selected);
						}} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};