import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#fcfdf6',
                secondary: '#dee8cf',
                accent: '#dd636e',
            },
            dark: {
                primary: '#1b1c19',
                secondary: '#a5b198',
                accent: '#dd636e',
            },
        },
        dark: true, 
    },
});
