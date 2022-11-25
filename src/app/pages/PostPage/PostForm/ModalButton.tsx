import { Card, CardActions, CardContent } from '@mui/material';

export function ModalButton() {
  return (
    <Card
      sx={{ maxWidth: 'md', border: '1px solid #e1e1e1' }}
      style={{ marginBottom: '1rem', paddingBottom: '1rem' }}
      variant="outlined"
    >
      <CardContent>Card content</CardContent>

      <CardActions>Card actions</CardActions>
    </Card>
  );
}
