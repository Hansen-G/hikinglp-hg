// Code from previous group project

export const cut = (str) => {
    if (str.length <= 100) {
        return str
    }
    return str.substring(0, 100) + "...";
};

export const pastDate = (date) => {
    const now = new Date();
    const past = new Date(date);
    const different = now - past;
    const differentDays = Math.floor(different / (1000 * 60 * 60 * 24));
    if (differentDays === 0) {
        const diferentHours = Math.floor(different / (1000 * 60 * 60));
        if (diferentHours === 0) {
            const diferentMinutes = Math.floor(different / (1000 * 60));
            if (diferentMinutes === 0) {
                const diffSeconds = Math.floor(different / 1000);
                return `${diffSeconds} seconds ago`;
            }
            return `${diferentMinutes} minutes ago`;
        }
        return `${diferentHours} hours ago`;
    } else if (differentDays === 1) {
        return "1 day ago";
    } else {
        return differentDays + " days ago";
    }
};

// Validate if url is an image function
export const isValidUrl = async (urlString, setErrors, error) => {
    const isItUrl = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(urlString);
    if (!isItUrl) return false;
    if (urlString.indexOf("File:") !== -1) return false;

    try {
        let fetchImage = await fetch(urlString);
    } catch (e) {
        setErrors(error => error.push(['Cannot get url']))
        return false;
    }


    let imageTest = new Image();

    imageTest.src = urlString;
    imageTest.onerror = function () {
        return false;
    };
    imageTest.onload = function () {
        if (this.width > 0) {
        } else {
            return false;
        }
    };

    let checkImageRequest = new XMLHttpRequest();
    try {
        checkImageRequest.open("GET", urlString, true);
        checkImageRequest.send();
        checkImageRequest.onerror = function () {
            return false;
        };
        checkImageRequest.onload = function () {
            if (checkImageRequest.status !== 200) {
                return false;
            }
        };
    } catch (e) {
        return false;
    }
    return true;
};


export const getRandomFromArray = (arr, num) => {
    let temp = [...arr];
    let shuffled = temp.sort(() => 0.5 - Math.random());
    let result = shuffled.slice(0, num);
    return result;
}