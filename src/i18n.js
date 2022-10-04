import { createI18n } from 'vue-i18n'
import uz from '@/locales/uz.json';
import ru from '@/locales/ru.json';


function loadLocaleMessages() {
    const messages = {
        uz: uz,
        ru: ru,

    };
    return messages;
}

const i18n = createI18n({
    locale: localStorage.getItem('locale') || 'ru',// set locale
    fallbackLocale: 'ru', // set fallback locale
    messages: loadLocaleMessages() // set locale messages
    // If you need to specify other options, you can set other options
    // ...
});
export default i18n;
