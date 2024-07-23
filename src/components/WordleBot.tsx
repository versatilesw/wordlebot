import { useState, useEffect } from "react";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import Guess from "./Guess";
import { WordleRequest, fetchWordleResult } from "../api/api";
import { GuessLimitCount } from "../utils/constants";

const WordleBot = () => {
    const [word, setWord] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [guesses, setGuesses] = useState<WordleRequest>([]);
    const [isGuessed, setGuessed] = useState(false);

    const fetchGuessWord = async (req: WordleRequest = []) => {
        let fetchSucceed = false;
        setLoading(true);
        setErrorMessage(null);
        try {
            const resp = await fetchWordleResult(req);
            setWord(resp.guess);
            fetchSucceed = true;
        } catch (err) {
            setErrorMessage(err as string);
        } finally {
            setLoading(false);
        }
        return fetchSucceed;
    };

    useEffect(() => {
        fetchGuessWord();
    }, []);

    const handleSubmit = async (clue: string) => {
        const newGuesses = [...guesses];
        newGuesses.push({ word, clue });
        if (clue === "ggggg") {
            setGuesses(newGuesses);
            setErrorMessage(null);
            setGuessed(true);
        } else {
            const fetchSucceed = await fetchGuessWord(newGuesses);
            if (fetchSucceed) {
                setGuesses(newGuesses);
            }
        }
    };

    const _guesses = [...guesses];
    if (guesses.length < GuessLimitCount && !isGuessed && word) {
        _guesses.push({ word, clue: "" });
    }

    return isLoading && !word ? (
        <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
            <CircularProgress />
        </Box>
    ) : (
        <Box display="flex" flexDirection="column" rowGap={4} my={4}>
            {_guesses.map((guess, index) => (
                <Guess
                    key={guess.word}
                    guessIndex={index + 1}
                    guessItem={guess}
                    loading={isLoading}
                    handleSubmit={handleSubmit}
                    hasDivider={index !== _guesses.length - 1}
                />
            ))}
            {isGuessed ? (
                <>
                    <Divider sx={{ mt: 4 }} />
                    <Typography variant="h2">Yay! All Done</Typography>
                </>
            ) : (
                errorMessage && (
                    <Typography variant="body1" sx={{ color: "red" }}>
                        {`${errorMessage}`}
                    </Typography>
                )
            )}
        </Box>
    );
};

export default WordleBot;
