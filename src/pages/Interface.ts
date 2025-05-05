import Block from './../block';

export default interface IPageProps {
    [key: string]: Block | string;
}