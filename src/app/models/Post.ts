export interface Post {
    id: number,
    body: string,
    imgUrl: string,
    reactions: number,
    tags: string[],
    title: string,
    userId: number,
}