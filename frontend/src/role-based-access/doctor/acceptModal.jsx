import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const CustomDialog = ({ open, handleClose, handleAnotherClose,title,body,buttonName }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <p>{body}</p>
                {/* <p>You can add any custom content here.</p> */}
            </DialogContent>
          
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleAnotherClose} color="secondary">
                    {buttonName}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomDialog;
