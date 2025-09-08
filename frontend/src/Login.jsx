
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from './services.js';
import {
    LoginContainer,
    Header,
    Icon,
    HeaderTitle,
    Title,
    Form,
    InputGroup,
    Input,
    PasswordToggle,
    Button,
    ErrorMessage,
    Footer
} from './Login.styles.js';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Por favor, ingresa tu email y contraseña.');
            setLoading(false);
            return;
        }

        try {
            await handleLogin(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'No se pudo conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginContainer>
            <Header>
                <Icon>🎬</Icon>
                <HeaderTitle>Cine Acme</HeaderTitle>
            </Header>
            <Title>Iniciar Sesión</Title>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                    <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </PasswordToggle>
                </InputGroup>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button type="submit" disabled={loading}>
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </Button>
            </Form>
            <Footer />
        </LoginContainer>
    );
}

export default Login;
