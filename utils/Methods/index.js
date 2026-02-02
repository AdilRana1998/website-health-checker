const fetch = require('node-fetch');

const postMethod = (url, obj, headers) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'post',
            body: JSON.stringify(obj),
            headers: headers,
        })
            .then(res => res.json())
            .then(json => {
                // console.log(url, obj.botId, JSON.stringify(Object.keys(obj)));
                // console.log(json);
                resolve(json)
            }).catch(e => {
            console.log(e);
            resolve(e);
        })
    });
};

const getMethod = (url, headers) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'get',
            headers: headers,
        })
            .then(res => res.json())
            .then(json => {
                resolve(json)
            }).catch(e => console.log(e))
    });
};

const postFormDataMethod = (url, headers, formData) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'post',
            body: formData,
            headers: headers,
        })
            .then(res => res.json())
            .then(json => {
                // console.log(url, data, JSON.stringify(Object.keys(data)));
                // console.log("postFormDataMethod SUccess", json);
                resolve(json)
            }).catch(e => {
            resolve(e);
        })
    });
};

const postMethodChatGPT = (url, obj, headers) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'post',
            body: obj,
            headers: headers,
        })
            .then(res => res.json())
            .then(json => {
                // console.log(url, obj.botId, JSON.stringify(Object.keys(obj)));
                // console.log(json.message);
                resolve(json)
            }).catch(e => {
            console.log(e);
            resolve(e);
        })
    });
};

const deleteMethod = (url, headers) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'DELETE',
            headers: headers,
        })
            .then(res => res.json())
            .then(json => {
                // console.log(url, json);
                // console.log(json.message);
                resolve(json)
            }).catch(e => {
            console.log(e);
            resolve(e);
        })
    });
};

module.exports = {
    postMethod, getMethod, postFormDataMethod, postMethodChatGPT, deleteMethod
}
