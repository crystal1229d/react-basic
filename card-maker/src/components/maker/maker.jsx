import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ authService }) => {
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
            fileURL: 'null'
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
            fileURL: 'null'
        }
    ]);
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

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor cards={cards} />
                <Preview cards={cards} />
            </div>
            <Footer />
        </section>
    )
};

export default Maker;