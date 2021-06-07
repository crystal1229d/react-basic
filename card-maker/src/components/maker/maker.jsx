import React, { useCallback, useEffect, useState } from 'react';
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
    const history = useHistory();    // check login status
    const historyState = history?.location?.state;
    const [cards, setCards] = useState({});
    const [userId, setUserId] = useState(historyState && historyState.id);

    const onLogout = useCallback(() => {
        authService.logout();
    }, [authService]);

    useEffect(() => {
        // handling Cards DATA
        if (!userId) {
            return;
        }
        const stopSync = cardRepository.syncCards(userId, cards => {
            setCards(cards);
        });
        // userEffect 에서 어떤 함수를 return 하면 리액트에서 자동으로 컴포넌트가 unmount 됐을 때 return한 함수를 호출
        // 따라서 이 부분에서 리소스와 메모리를 정리하는 일들을 처리하면 된다.
        return () => stopSync();    // 컴포넌트가 언마운트 되었을 때 불필요한 네트워크 사용 최소화 (ref.off())

    }, [userId, cardRepository]); // userId, cardRepository 가 변경될 때마다 위의 코드 호출

    useEffect(() => {
        // handling LOGIN
        authService.onAuthChange(user => {
            if (user) {
                setUserId(user.uid);
            } else {
                history.push('/');
            }
        });
    }, [authService, userId, history]);  // * 되도록이면 안에서 사용하고 있는 데이터가 변경되었을 때 update 될 수 있게끔 한다.

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
        cardRepository.removeCard(userId, card);
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