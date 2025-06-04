import ReactPixel from 'react-facebook-pixel';

const pixelId = '583798697671330';

const options = {
    autoConfig: true,
    debug: false,
};

export const initMetaPixel = () => {
    ReactPixel.init(pixelId, undefined, options);
    ReactPixel.pageView();
};

export const trackEvent = (eventName, data = {}) => {
    ReactPixel.track(eventName, data);
};
