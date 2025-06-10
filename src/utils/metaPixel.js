import ReactPixel from 'react-facebook-pixel';

const pixelId = '1020546873392429';

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
