function get(key) {
    let reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
    let arr = document.cookie.match(reg);
    if (arr) {
        return decodeURIComponent(arr[2]);
    } else {
        return '';
    }
}

function set(key, val, options = {}) {
    let expires = options.expires;

    if (typeof expires === 'number') {
        expires = new Date();
        expires.setTime(expires.getTime() + options.expires);
    }

    document.cookie = `${key}=${encodeURIComponent(val)}${expires ? `;expires=${expires.toGMTString()}` : ''}${options.path ? `;path=${options.path}` : ''}${options.domain ? `;domain=${options.domain}` : ''}`;
}

function del(key) {
    set(key, '', { expires: -1 });
}

function update(key, value, options) {
	if (typeof value === 'object') {
		options = value;
		value = get(key);
	}

	set(key, value, options);
}

export default {
    get,
    set,
    del,
    add: set,
    update: set
};