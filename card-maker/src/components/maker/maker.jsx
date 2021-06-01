import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService }) => {
    // 주기적으로 발생하는 이벤트에 대하여 map, for loop 등을 이용할 경우, Object를 처음부터 끝까지 순차적으로 돌며 검사하기 때문에 성능에 좋지 않다. 
    // const [cards, setCards] = useState([
    //     {
    //         id: '1',
    //         name: 'Crystal',
    //         company: 'Google',
    //         theme: 'light',
    //         title: 'Software Engineer',
    //         email: 'leecrystal1229d@gmail.com',
    //         message: 'just do it',
    //         fileName: 'crystal',
    //         fileURL: 'crystal.png'
    //     },
    //     {
    //         id: '2',
    //         name: 'Giho',
    //         company: 'KAI',
    //         theme: 'dark',
    //         title: 'CEO',
    //         email: 'skyrabbit@gmail.com',
    //         message: 'i love camping',
    //         fileName: 'giho',
    //         fileURL: ''
    //     },
    //     {
    //         id: '3',
    //         name: 'Hyojung',
    //         company: 'SNP',
    //         theme: 'colorful',
    //         title: 'student',
    //         email: 'hyojung@gmail.com',
    //         message: 'love yourself',
    //         fileName: 'hyojung',
    //         fileURL: ''
    //     }
    // ]);
    // 위의 문제로 인해 성능 개선을 위해 Array대신 Object 사용, 로직 변경
    const [cards, setCards] = useState({
        '1': {
                id: '1',
                name: 'Crystal',
                company: 'Google',
                theme: 'light',
                title: 'Software Engineer',
                email: 'leecrystal1229d@gmail.com',
                message: 'just do it',
                fileName: 'crystal',
                fileURL: 'crystal.png'
            },
        '2' : {
                id: '2',
                name: 'Giho',
                company: 'KAI',
                theme: 'dark',
                title: 'CEO',
                email: 'skyrabbit@gmail.com',
                message: 'i love camping',
                fileName: 'giho',
                fileURL: ''
            },
        '3' : {
                id: '3',
                name: 'Hyojung',
                company: 'SNP',
                theme: 'colorful',
                title: 'student',
                email: 'hyojung@gmail.com',
                message: 'love yourself',
                fileName: 'hyojung',
                fileURL: ''
            },
    });

    const history = useHistory();

    const onLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        authService.onAuthChange(user => {
            if (!user) {
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