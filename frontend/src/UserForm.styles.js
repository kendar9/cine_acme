
import React from 'react';
import styled from 'styled-components';

export const Form = styled.form``;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #0f3460;
  background-color: #16213e;
  color: white;
`;

export const Select = styled.select`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #0f3460;
    background-color: #16213e;
    color: white;
`;

export const Button = styled.button`
  background-color: #0f3460;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1a4a8a;
  }
`;
