export const fetchGetContourEndpoint = (imageBase64: string) => {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: imageBase64.split(',')[1],
    };
    return fetch(`/api/contour`, options).then((res: Response) => res.json());
};
