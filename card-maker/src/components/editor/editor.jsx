import React from 'react';
import CardAddForm from '../card_add_fom/card_add_form';
import CardEditForm from '../card_edit_form/card_edit_form';
import styles from './editor.module.css';

const Editor = ({ cards, addCard }) => (
    <section className={styles.editor}>
        <h1 className={styles.title}>Editor</h1>
        {
            cards.map(card => (
                <CardEditForm key={card.id} card={card} />
            ))
        }
        <CardAddForm onAdd={addCard} />
    </section>
);

export default Editor;