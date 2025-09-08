import styled from 'styled-components';

export const LoginContainer = styled.div`
    background-color: rgba(240, 240, 240, 0.95);
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 380px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #333;
`;

export const Icon = styled.span`
    font-size: 28px;
`;

export const HeaderTitle = styled.h1`
    font-size: 24px;
    margin: 0;
`;

export const Title = styled.h2`
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin: 0;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const InputGroup = styled.div`
    position: relative;
`;

export const Input = styled.input`
    width: 100%;
    padding: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #8a2be2;
        box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.2);
    }
`;

export const PasswordToggle = styled.span`
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #888;
`;

export const Button = styled.button`
    padding: 14px;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    background: linear-gradient(90deg, #3b82f6, #8a2be2);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const ErrorMessage = styled.div`
    color: #e53e3e;
    font-size: 14px;
    margin-top: -10px;
    min-height: 20px; /* Para que no salte el layout */
`;

export const Footer = styled.div`
    width: 50px;
    height: 4px;
    background-color: #e53e3e;
    border-radius: 2px;
    margin: 0 auto;
`;
