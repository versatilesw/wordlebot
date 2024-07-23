import { Box } from "@mui/material";
import { WordleRequestItem } from "../api/api";
import ClueBox from "./ClueBox";
import { Clue } from "../utils/types";

const ClueWord = (item: WordleRequestItem) => {
    const { word, clue } = item;

    return (
        <Box display="flex" columnGap={2}>
            {word.split("").map((character, index) => (
                <ClueBox character={character} clue={clue[index] as Clue} key={index} />
            ))}
        </Box>
    );
};

export default ClueWord;
