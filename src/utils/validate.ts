export const  ValidationRules = {
    login: /^[a-zA-Z0-9](?!){3,20}$/,
    password: /^(?=[A-Z])(?=[А-Я])(?=\d){8,40}$/
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
            default:
                return 'Некорректное значение';
        }
    }

    return null;
}