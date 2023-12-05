import type { ReactNode } from 'react';

import { User } from '@/types/user';
import { useFetchAlbumsQuery, useAddAlbumMutation } from '@/store';

import Skeleton from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';
import AlbumsListItem from '@/components/albums/AlbumsListItem';

type AlbumListProps = {
    user: User;
};

function AlbumsList({ user }: AlbumListProps) {
    const { data, error, isFetching } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();

    function handleAddAlbum() {
        addAlbum(user);
    }

    let content: ReactNode;
    if (isFetching) {
        content = <Skeleton className='h-10 w-full' times={3} />;
    } else if (error) {
        content = <div>Error loading albums.</div>;
    } else if (data) {
        content = data.map((album) => (
            <AlbumsListItem key={album.id} album={album} />
        ));
    }

    return (
        <div className='space-y-4'>
            <div className='m-2 flex flex-row items-center justify-between'>
                <h3 className='text-lg font-bold'>Albums for {user.name}</h3>
                <Button onClick={handleAddAlbum} loading={results.isLoading}>
                    + Add Album
                </Button>
            </div>
            <div>{content}</div>
        </div>
    );
}

export default AlbumsList;
