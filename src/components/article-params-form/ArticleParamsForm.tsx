import { useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function toggleMenu() {
		setIsMenuOpen(!isMenuOpen);
	}

	return (
		<>
			<ArrowButton onClick={toggleMenu} isOpen={isMenuOpen} />
			<aside className={clsx(styles.container, { [styles.container_open]: isMenuOpen })}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};