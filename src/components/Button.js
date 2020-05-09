import React from 'react';
import styled from 'styled-components';

const PrimaryLinkBtn = styled.a`
  background-color: #e74c3c;
  color: #fff;
  padding: 10px 55px;
  border: 2px solid #e74c3c;
  border-radius: 3px;
  font-size: 1.5rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  text-decoration: none;

  transition: all 0.1s ease-out;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.8;
    }
  }
`;

const TransparentLinkBtn = styled(PrimaryLinkBtn)`
  background-color: transparent;
  color: #e74c3c;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: #e74c3c;
      color: #fff;
    }
  }
`;

const PrimaryRegularBtn = styled.button`
  background-color: #e74c3c;
  color: #fff;
  padding: 10px 55px;
  border: 2px solid #e74c3c;
  border-radius: 3px;
  font-size: 1.5rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  text-decoration: none;

  transition: all 0.1s ease-out;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.8;
    }
  }
`;

const TransparentRegularBtn = styled(PrimaryRegularBtn)`
  background-color: transparent;
  color: #e74c3c;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: #e74c3c;
      color: #fff;
    }
  }
`;

export const LinkButton = ({ color, children, href }) => {
  return color === 'transparent' ? (
    <TransparentLinkBtn href={href} target='_blank'>
      {children}
    </TransparentLinkBtn>
  ) : (
    <PrimaryLinkBtn href={href} target='_blank'>
      {children}
    </PrimaryLinkBtn>
  );
};

export const RegularButton = ({ color, type, children, onClick }) => {
  return color === 'transparent' ? (
    <TransparentRegularBtn
      type={type || 'button'}
      onClick={onClick}
      target='_blank'
    >
      {children}
    </TransparentRegularBtn>
  ) : (
    <PrimaryRegularBtn type={type || 'button'} onClick={onClick}>
      {children}
    </PrimaryRegularBtn>
  );
};
