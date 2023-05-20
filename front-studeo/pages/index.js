import Head from 'next/head';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from "react";
import { Questions } from "../src/components/Questions";
import { Gauge } from "../src/components/Gauge";

export default function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('http://localhost:8080/questions');
      console.log("response", response.data.data);
      setQuestions(response.data.data);
    }

    fetchQuestions();

  }, []);

  // const onSubmitResponse = (questionId, choice) => {
  //     console.log("[index] onSubmitResponse")
  //     // console.log("questionId", questionId);
  //     // console.log("choice", choice);
  //     const sendResponse = async (questionId, choice) => {
  //         const res = await axios.post(`http://localhost:8080/user-answers/${questionId}`, {
  //             userId: "6462ad7d9d00319a3e060a0b",
  //             answerId: choice,
  //         });
  //         console.log("res", res.data.data.isValidResponse);
  //     };
  //
  //     sendResponse(questionId, choice);
  // }

  return (
    <div className={styles.container}>
      <Head>
        <title>Node JS Quizz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.grid}>
            <h1 className={`${styles.title} ${styles.card}`}>
                Welcome to our Node JS quizz!
            </h1>
            <div className={`${styles.card} ${styles.result}`}>
                <Gauge
                    style={{ margin: '0 auto 20px auto' }}
                    radius={75}
                    value={50}
                    onClick={() => {
                        // this.setState({ value1: Math.random() * 100 });
                    }}
                />
            </div>
        </div>


        <div>
            <Questions
                data={questions}
                // onSubmitResponse={onSubmitResponse}
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
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
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
