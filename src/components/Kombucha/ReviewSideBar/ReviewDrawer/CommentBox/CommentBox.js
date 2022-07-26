import { TextField, Box, FormHelperText } from "@mui/material";

const CommentBox = ({ comment, handleChange }) => {
  return (
    <Box>
      <TextField
        id="review-comments"
        placeholder="Share your experience with this kombucha."
        required
        multiline
        fullWidth
        rows={8}
        variant="outlined"
        value={comment}
        onChange={handleChange}
        type="text"
      />
      <FormHelperText error>
        {comment.length <= 10 && "Must be at least 10 char in length"}
      </FormHelperText>
    </Box>
  );
};

export default CommentBox;
