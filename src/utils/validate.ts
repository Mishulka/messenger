export const  ValidationRules = {
    login: /^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/,
    password: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
    first_name: /^[A-ZА-ЯЁ][a-zа-яё-]+$/u,
    second_name: /^[A-ZА-ЯЁ][a-zа-яё-]+$/u,
    email: /^[A-Za-z0-9_-]+@[A-Za-z0-9_-]+\.[A_Za-z]$/,
    phone: /^\+?\d{10,15}$/,
    message: /^.+$/,
}

type ValidationType = keyof typeof  ValidationRules;

export default function Validate(value: string, rule: string): string | null {
    const regex = ValidationRules[rule as ValidationType];

    if(!regex) {
        throw new Error(`Validation rule "${rule}" is not defined`);
    }
    if(!value) {
        return 'Поле не может быть пустым';
    }

    if(!regex.test(value)) {
        switch(rule) {
            case 'login':
                return 'Логин должен содержать от 3 до 20 символов и не может содержать пробелы';
            case 'password':
                return 'Пароль должен содержать от 8 до 40 символов, хотя бы одну заглавную букву и одну цифру';
            case 'email':
                return 'Некорректный email';
            case 'first_name':
                return ' латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр';
            case 'second_name':
                return ' латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр';
            case 'phone':
                return 'от 10 до 15 символов, состоит из цифр, может начинается с плюса.';
            case 'message':
                return 'Сообщение не может быть пустым';
            default:
                return '';
        }
    }
    return null;
}
