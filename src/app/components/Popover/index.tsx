/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Popover from '@mui/material/Popover';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost } from '../../pages/PostPage/slice/selectors';
import { usePostSlice } from 'app/pages/PostPage/slice';

interface Props {
  button: any;
  body: any;
}

export default function PopOver(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const { popoverOpen } = useSelector(selectPost);

  const { actions } = usePostSlice();
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (popoverOpen) {
      handleClose();
      dispatch(actions.setPopoverOpen(false));
    }
  }, [anchorEl, popoverOpen]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        {props.button}
      </IconButton>

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
