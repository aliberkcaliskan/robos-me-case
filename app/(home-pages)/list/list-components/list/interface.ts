export interface List {
    id: number;
    title: string;
    body: string;
}

export interface ListProps {
    data: List[];
    onItemClick: (id: number) => void;
}