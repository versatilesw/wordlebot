import { useState } from "react";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import ClueWord from "./ClueWord";
import ClueBox from "./ClueBox";
import { Clue } from "../utils/types";
import { clues } from "../utils/constants";

interface InputClueInput {
    word: string;
    handleSubmit: (clue: string) => Promise<void>;
    loading?: boolean;
}

const InputClue = ({ word, handleSubmit, loading = false }: InputClueInput) => {
    const [clue, setClue] = useState("xxxxx");

    const onSubmit = async () => {
        await handleSubmit(clue);
        setClue("xxxxx");
    };

    const onClueBoxClicked = (oneClue: Clue, index: number) => {
        setClue(clue.slice(0, index) + oneClue + clue.slice(index + 1));
    };

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" alignItems="center" rowGap={1}>
                <ClueWord word={word} clue={clue} />
                {clues.map((_clue) => (
                    <Box display="flex" columnGap={2} key={_clue}>
                        {word.split("").map((_, index) => (
                            <ClueBox
                                clue={_clue}
                                key={index}
                                handleClick={() => onClueBoxClicked(_clue, index)}
                            />
                        ))}
                    </Box>
                ))}
            </Box>
            <LoadingButton
                disabled={loading}
                loading={loading}
                variant="contained"
                sx={{ width: "fit-content", ml: "auto", mt: 2 }}
                onClick={onSubmit}
            >
                Submit
            </LoadingButton>
        </Box>
    );
};

export default InputClue;
