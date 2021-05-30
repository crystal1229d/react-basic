import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ authService }) => {
    // 주기적으로 발생하는 이벤트에 대하여 map, for loop 등을 이용할 경우, Object를 처음부터 끝까지 순차적으로 돌며 검사하기 때문에 성능에 좋지 않다. 
    // const updated = cards.map(item => {
    //     if (card.id === item.id) {
    //         return card;
    //     }
    //     return item;
    // });
    
    const [cards, setCards] = useState([
        {
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
        {
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
        {
            id: '3',
            name: 'Hyojung',
            company: 'SNP',
            theme: 'colorful',
            title: 'student',
            email: 'hyojung@gmail.com',
            message: 'love yourself',
            fileName: 'hyojung',
            fileURL: ''
        }
    ]);
    // 위의 문제로 인해 성능 개선을 위해 Array대신 Object 사용, 로직 변경
    // const [cards, setCards] = useState({
    //     '1': {
    //             id: '1',
    //             name: 'Crystal',
    //             company: 'Google',
    //             theme: 'light',
    //             title: 'Software Engineer',
    //             email: 'leecrystal1229d@gmail.com',
    //             message: 'just do it',
    //             fileName: 'crystal',
    //             fileURL: 'crystal.png'
    //         },
    //     '2' : {
    //             id: '2',
    //             name: 'Giho',
    //             company: 'KAI',
    //             theme: 'dark',
    //             title: 'CEO',
    //             email: 'skyrabbit@gmail.com',
    //             message: 'i love camping',
    //             fileName: 'giho',
    //             fileURL: ''
    //         },
    //     '3' : {
    //             id: '3',
    //             name: 'Hyojung',
    //             company: 'SNP',
    //             theme: 'colorful',
    //             title: 'student',
    //             email: 'hyojung@gmail.com',
    //             message: 'love yourself',
    //             fileName: 'hyojung',
    //             fileURL: ''
    //         },
    // });

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

    const addCard = card => {
        const updated = [...cards, card];
        setCards(updated);
    };
    const updateCard = card => {

    };
    const deleteCard = card => {
        console.log(card);
    };

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor cards={cards} addCard={addCard} updateCard={updateCard} deleteCard={deleteCard} />
                <Preview cards={cards} />
            </div>
            <Footer />
        </section>
    )
};

export default Maker;