import Block from '../core/Block/block';

export default interface IPageProps {
    [key: string]: Block | string;
}
