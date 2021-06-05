import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService, cardRepository }) => {
    // const [cards, setCards] = useState( [{ id:'1', name:'A' }, { id: '2', name: 'B' }] );
    // 위의 문제로 인해 성능 개선을 위해 Array대신 Object 사용, 로직 변경
    // const [cards, setCards] = useState({ '1': {id:'1', name: 'A'}, '2': {id: '2', name: 'B'} });
    const historyState = useHistory().state;    // check login status
    const [cards, setCards] = useState({});
    const [userId, setUserId] = useState(historyState && historyState.id);

    const history = useHistory();

    const onLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        authService.onAuthChange(user => {
            if (user) {
                setUserId(user.uid);
            } else {
                history.push('/');
            }
        });
    });

    const createOrUpdateCard = card => {
        // const updated = {...cards};
        // updated[card.id] = card;
        // setCards(updated); 
        // state를 update하는 함수를 쓸 때 (위)컴포넌트 안에 있는 state를 이용해서 업데이트하면, 업데이트하는 시점에 이 state가 오래된 것일 수 있다.
        // * 컴포넌트의 값에 의존해서 값을 update : 동기적으로 할 수 없을 수 있다.
        // => setCards에 인자로 상태값을 바로 주는 대신, 예전의 값을 받아서 새로운 값을 return 하는 콜백함수를 줄 수 있다.
        setCards(cards => {
            const updated = { ...cards };
            updated[card.id] = card;
            return updated;
        });
        cardRepository.saveCard(userId, card);
    };
    const deleteCard = card => {
        setCards(cards => {
            const updated = { ...cards };
            delete updated[card.id];
            return updated;
        });
    };

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor FileInput={FileInput} cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard} />
                <Preview cards={cards} />
            </div>
            <Footer />
        </section>
    )
};

export default Maker;