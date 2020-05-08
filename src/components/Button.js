import React from 'react';
import styled from 'styled-components';

const PrimaryBtn = styled.a`
  background-color: #2980b9;
  color: #fff;
  padding: 10px 55px;
  border: 2px solid #2980b9;
  border-radius: 3px;
  font-size: 1.5rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;

const TransparentBtn = styled(PrimaryBtn)`
  background-color: transparent;
  color: #2980b9;
  &:hover {
    opacity: 0.8;
  }
`;

const Button = ({ type, children, href }) => {
  return type === 'transparent' ? (
    <TransparentBtn href={href} target='_blank'>
      {children}
    </TransparentBtn>
  ) : (
    <PrimaryBtn href={href} target='_blank'>
      {children}
    </PrimaryBtn>
  );
};

export default Button;
