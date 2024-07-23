import { Box, Divider, Typography } from "@mui/material";
import { WordleRequestItem } from "../api/api";
import ClueWord from "./ClueWord";
import InputClue from "./InputClue";

interface GuessProps {
    guessIndex: number;
    guessItem: WordleRequestItem;
    loading?: boolean;
    handleSubmit?: (clue: string) => Promise<void>;
    hasDivider?: boolean;
}

const Guess = ({ guessIndex, guessItem, loading, handleSubmit, hasDivider }: GuessProps) => {
    const { word, clue } = guessItem;

    return (
        <Box display="flex" flexDirection="column" rowGap={2}>
            <Typography variant="h2">{`Guess #${guessIndex}`}</Typography>
            <Box display="flex" alignItems="center" columnGap={4}>
                <Typography variant="subtitle1">Word to Guess:</Typography>
                <ClueWord word={word} clue={""} />
            </Box>
            <Typography variant="subtitle1">What response did you get back?</Typography>
            {clue ? (
                <Box display="flex" justifyContent="center">
                    {clue && <ClueWord {...guessItem} />}
                </Box>
            ) : handleSubmit ? (
                <InputClue word={word} loading={loading} handleSubmit={handleSubmit} />
            ) : null}
            {hasDivider && <Divider sx={{ mt: 4 }} />}
        </Box>
    );
};

export default Guess;
