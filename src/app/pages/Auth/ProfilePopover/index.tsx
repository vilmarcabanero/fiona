import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectPost } from 'app/pages/PostPage/slice/selectors';

interface Props {
  button: any;
  body: any;
}

export default function ProfilePopover(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const { isEdit } = useSelector(selectPost);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (isEdit) {
      handleClose();
    }
  }, [anchorEl, isEdit]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        style={{ textTransform: 'none' }}
        onClick={handleClick}
      >
        {props.button}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {props.body}
      </Popover>
    </div>
  );
}
