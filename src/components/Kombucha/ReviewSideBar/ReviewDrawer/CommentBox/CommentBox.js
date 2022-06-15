import { TextField, Box } from "@mui/material";

const CommentBox = ({ comment, handleChange }) => {
  return (
    <Box>
      <TextField
        id="review-comments"
        placeholder="Must be at least 10 characters in length."
        required
        multiline
        fullWidth
        rows={8}
        variant="outlined"
        value={comment}
        onChange={handleChange}
        type="text"
        inputProps={{
          minLength: 10,
        }}
      />
    </Box>
  );
};

export default CommentBox;
