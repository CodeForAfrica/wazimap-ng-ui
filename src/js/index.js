import 'babel-polyfill';

import configureApplication from './load';
import { Config as SAConfig } from './configurations/geography_sa';
import Analytics from './analytics';
import { API } from './api';
import { getHostname, loadDevTools } from './utils';

const mainUrl = 'http://127.0.0.1:8000';
const productionUrl = 'https://v2.hurumap.org';
let config = new SAConfig();

let hostname = getHostname();
const defaultProfile = 1;
const defaultUrl = productionUrl;
const defaultConfig = new SAConfig();

const profiles = {
    'wazi.webflow.io': {
        baseUrl: mainUrl,
        config: config
    },
    'localhost': {
        baseUrl: mainUrl,
        config: config
    },
    'localhost-dev': {
        baseUrl: 'http://localhost:8000',
        config: config
    },
    'geo.vulekamali.gov.za': {
        baseUrl: productionUrl,
        config: config
    },
    'gcro.openup.org.za': {
        baseUrl: 'https://api.gcro.openup.org.za',
        config: config
    },
    'beta.youthexplorer.org.za': {
        baseUrl: productionUrl,
        config: config
    },
    'capetownagainstcovid19.openup.org.za': {
        baseUrl: mainUrl,
        config: config
    },
    'covid-wazi.openup.org.za': {
        baseUrl: productionUrl,
        config: config
    },
    'wazimap-ng.africa': {
        baseUrl: mainUrl,
        config: config
    },
    'covid-ibp.openup.org.za': {
        baseUrl: productionUrl,
        config: config
    },
    'sifar-wazi.openup.org.za': {
        baseUrl: productionUrl,
        config: config
    },
    'mapyourcity.org.za': {
        baseUrl: productionUrl,
        config: config
    },
    'giz-projects.openup.org.za': {
        baseUrl: productionUrl,
        config: config
    },
    'covid-ccij.openup.org.za': {
        baseUrl: mainUrl,
        config: config
    },
    'cfafrica.wazimap-ng.africa': {
        baseUrl: 'https://api.cfafrica.wazimap-ng.africa',
        config: config
    },
    'ccij-water.openup.org.za': {
        baseUrl: productionUrl,
        config: config
    },
    'v2.pesayetu.pesacheck.org': {
        baseUrl: productionUrl,
        config: config
    },
    'v2.pesayetu.hurumap.org': {
        baseUrl: productionUrl,
        config: config
    }
}

async function init() {
    let pc = profiles[hostname]
    if (pc == undefined) {
        pc = {
            profile: defaultProfile,
            baseUrl: defaultUrl,
            config: defaultConfig
        }
    }
    const api = new API(pc.baseUrl);
    const data = await api.getProfileConfiguration(hostname);

    pc.config.setConfig(data.configuration || {})
    pc.config.api = api;
    pc.profile = data.id;
    pc.config.baseUrl = pc.baseUrl;
    // TODO add this to config - check the <script> tag in the HTML which hardcodes this value
    pc.config.analytics = new Analytics('UA-93649482-25', pc.profile);
    pc.config.profile = data.id;

    configureApplication(data.id, pc.config);
}

window.init = init;
loadDevTools(() => {
    init();
})