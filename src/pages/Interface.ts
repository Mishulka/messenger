import Block from '../core/block';

export default interface IPageProps {
    [key: string]: Block | string;
}
