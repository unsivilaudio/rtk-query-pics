import type { ReactNode } from 'react';

import { Album } from '@/types/album';
import { useFetchPhotosQuery, useAddPhotoMutation } from '@/store';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import PhotosListItem from '@/components/photos/PhotosListItem';

type PhotosListProps = {
    album: Album;
};

export default function PhotosList({ album }: PhotosListProps) {
    const { data, isFetching, error } = useFetchPhotosQuery(album);
    const [addPhoto, addPhotoResults] = useAddPhotoMutation();

    function handleAddPhoto() {
        addPhoto(album);
    }

    let content: ReactNode;
    if (isFetching) {
        content = <Skeleton className='h-8 w-8' times={4} />;
    } else if (error) {
        content = <div>Error fetching photos...</div>;
    } else if (data) {
        content = data.map((photo) => (
            <PhotosListItem key={photo.id} photo={photo} />
        ));
    }

    return (
        <div>
            <div className='m-2 flex flex-row items-center justify-between'>
                <h3 className='text-lg font-bold'>Photos In {album.title}</h3>
                <Button
                    onClick={handleAddPhoto}
                    loading={addPhotoResults.isLoading}
                >
                    + Add Photo
                </Button>
            </div>
            <div className='mx-8 flex flex-row flex-wrap justify-center'>
                {content}
            </div>
        </div>
    );
}
