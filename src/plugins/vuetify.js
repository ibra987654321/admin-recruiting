import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                    white: '#FFFFFF',
                    primary: '#696cff',
                    'primary-darken-1': '#3700B3',
                    secondary: '#03DAC6',
                    'secondary-darken-1': '#018786',
                    error: '#B00020',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FB8C00',
            }
        },
    },
});
