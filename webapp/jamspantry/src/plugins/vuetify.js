import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#fcfdf6',
                secondary: '#dee8cf',
                accent: '#E00736',
            },
            dark: {
                primary: '#1b1c19',
                secondary: '#94a385',
                accent: '#941B35',
            },
        },
        dark: true, 
    },
});
