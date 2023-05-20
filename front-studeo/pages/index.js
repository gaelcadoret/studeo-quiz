import {useEffect, useState} from "react";
import Head from 'next/head';
import axios from 'axios';

import styles from '../styles/Home.module.css';
import {Questions} from "../src/components/Questions";
import {Gauge} from "../src/components/Gauge";

export default function Home() {
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [scores, setScores] = useState([]);

    const buildUserScore = ({_id}) => ({
        _id,
        isValidResponse: false,
    })

    const initUserScores = (data) => data.map(buildUserScore);

    const getNbValidResponse = () => scores.reduce(
        (acc, el) => el.isValidResponse
            ? acc + 1
            : acc
        , 0);
    const calculateScore = (questionId, isValidResponse) => scores.map(
        (score) => score._id === questionId
            ? {
                ...score,
                isValidResponse,
            }
            : score
    );

    const updateScore = (questionId, isValidResponse) => {
        setScores(calculateScore(questionId, isValidResponse));
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await axios.get('http://localhost:8080/questions');

            setQuestions(response.data.data);
            setScores(initUserScores(response.data.data));
        }

        fetchQuestions();

    }, []);


    useEffect(() => {
        setScore(getNbValidResponse() * 100 / scores.length)
    }, [scores])

    return (
        <div className={styles.container}>
            <Head>
                <title>Node JS Quizz</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <div className={`${styles.grid} ${styles.fixed}`}>
                    <h1 className={`${styles.title} ${styles.card}`}>
                        Welcome to our Node JS quizz!
                    </h1>
                    <div className={`${styles.card} ${styles.result}`}>
                        <Gauge
                            style={{margin: '0 auto 20px auto'}}
                            radius={75}
                            value={score}
                        />
                    </div>
                </div>


                <div className={styles.form}>
                    <Questions
                        data={questions}
                        updateScore={updateScore}
                    />
                </div>
            </main>

            <footer>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel" className={styles.logo}/>
                </a>
            </footer>

            <style jsx>{`
              main {
                padding: 5rem 0;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }

              footer {
                width: 100%;
                height: 100px;
                border-top: 1px solid #eaeaea;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              footer img {
                margin-left: 0.5rem;
              }

              footer a {
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                color: inherit;
              }

              code {
                background: #fafafa;
                border-radius: 5px;
                padding: 0.75rem;
                font-size: 1.1rem;
                font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
              }
            `}</style>

            <style jsx global>{`
              html,
              body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
              }

              * {
                box-sizing: border-box;
              }
            `}</style>
        </div>
    )
}
