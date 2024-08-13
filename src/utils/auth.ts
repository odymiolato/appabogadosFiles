export async function isAuthenticated(): Promise<boolean> {
    const token = localStorage.getItem('access_token');
    /* @ts-ignore */
    const URL: string = import.meta.env.VITE_PATH_API;

    if (!token) {
        return false;
    }

    try {
        const response = await fetch(`${URL}auth`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Token no válido');
        }

        const data = await response.json();

        return data.status;
    } catch (error) {
        console.error('Error al validar el token:', error);
        return false;
    }
}
