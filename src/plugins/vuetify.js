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
                    secondary: '#8592a3',
                    dark: '#233446',
                    error: '#ff3e1d',
                    info: '#03c3ec',
                    success: '#71dd37',
                    warning: '#ffab00',
            }
        },
    },
});
