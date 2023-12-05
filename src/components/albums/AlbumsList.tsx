import { User } from '@/types/user';

type AlbumListProps = {
    user: User;
};

function AlbumsList({ user }: AlbumListProps) {
    return <div>Albums for {user.name}</div>;
}

export default AlbumsList;
