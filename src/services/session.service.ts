import { v4 as uuidv4 } from 'uuid'; // Para gerar um token simples

export function generateToken(email: string): string {
    // Neste exemplo, esta  mos usando um UUID como token
    // Em uma aplicação real, você deve usar JWT ou outra forma de token seguro
    return uuidv4();
}
