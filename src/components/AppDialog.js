import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export function AppDialog({ open, title, onClose, children, maxWidth }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth={maxWidth || 'xs'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
