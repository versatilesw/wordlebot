import { Box, Typography } from "@mui/material";
import { Clue } from "../utils/types";

interface ClueBoxProps {
    character?: string;
    clue?: Clue;
    handleClick?: () => void;
}

const ClueBox = ({ character = "", clue = "x", handleClick }: ClueBoxProps) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={64}
            height={64}
            sx={{
                border: "1px solid grey",
                backgroundColor: clue === "x" ? "transparent" : clue === "y" ? "yellow" : "#49c649",
                cursor: handleClick ? "pointer" : "initial",
            }}
            onClick={handleClick}
        >
            <Typography variant="body1">{character.toUpperCase()}</Typography>
        </Box>
    );
};

export default ClueBox;
