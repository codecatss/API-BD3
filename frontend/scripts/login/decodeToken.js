const  decodeJWT = (token) => {
    try {
        const tokenParts = token.split('.');
        const base64Payload = tokenParts[1];
        const payload = JSON.parse(atob(base64Payload));
        return payload;
    } catch (error) {
        console.error('Erro na decodificação do token JWT:', error);
    }
}

export default decodeJWT;