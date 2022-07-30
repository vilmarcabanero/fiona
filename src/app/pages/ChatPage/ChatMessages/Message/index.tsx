import React from 'react';
import * as Styled from './styles';

export const Message = (props: any) => {
  return (
    <Styled.Container
      sx={
        props.message._id % 2 !== 0
          ? {
              alignSelf: 'flex-start',
            }
          : {}
      }
    >
      <Styled.Wrapper
        className={props.message._id % 2 !== 0 ? 'left' : 'right'}
      >
        {props.message.content}
      </Styled.Wrapper>
    </Styled.Container>
  );
};
