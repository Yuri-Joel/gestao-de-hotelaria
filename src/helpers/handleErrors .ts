async function handleErrors(response: Response, error: { error: string }) {
    if (response.status === 401 || response.status === 404) {
        console.error('Response error:', response);
        return {
            error: { value: true, msg: error.error },
            status: response.status,
            data: null,
        };
    }

    if (
        response.status === 400 ||
        response.status === 402 ||
        response.status === 403 ||
        response.status === 409 ||
        response.status === 412 ||
        response.status === 422 ||
        response.status === 429 ||
        response.status === 500 ||
        response.status === 501 ||
        response.status === 503
    ) {
        console.error('Response error:', response);
        return {
            error: { value: true, msg: error.error },
            status: null,
            data: null,
        };
    }

    return {
        error: { value: true, msg: 'Error desconhecido. Por favor, tente novamente mais tarde.' },
        status: null,
        data: null,
    };
};

export default handleErrors;